const admin = require("firebase-admin");
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");

const ErrorResponse = require("../utilities/errorResponse");
const basePrompt = require("../utilities/prompt");

exports.getEvents = async (req, res, next) => {
  try {
    res.json({ data: [] });
  } catch (error) {}
};

exports.getEvent = async (req, res, next) => {
  try {
    res.json({ data: [] });
  } catch (error) {}
};

exports.seedEvents = async (req, res, next) => {
  try {
    const db = admin.firestore();
    // const uid = req.uid;
    const uid = "H6KY1R3hJkhfHRiclKnZ4gb7yRs1";
    const eventsArray = [
      "Sports",
      "Concerts",
      "Comedy Shows",
      "Night Clubs",
      "Restaurants",
      "Movies",
    ];

    const eventsPromises = eventsArray.map(async (event) => {
      return getUserPreferenceEvents(event);
    });

    var events = await Promise.all(eventsPromises);
    events = events.flat();

    await Promise.all(
      events.map(async (event) => {
        await db.collection("events").add(event);
      })
    );

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
};

const getUserPreferenceEvents = async (preference) => {
  const MODEL_NAME = process.env.MODEL_NAME;
  const API_KEY = process.env.API_KEY;

  const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
  });

  const result = await client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: basePrompt(preference),
    },
  });
  let output = result[0].candidates[0].output;

  if (/^```json/.test(output)) {
    output = output.replace(/^```json\s*/, "");
  }

  // Check if the string ends with "```"
  if (/```$/.test(output)) {
    output = output.replace(/\s*```$/, "");
  }
  return JSON.parse(output);
};
