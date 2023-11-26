const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");
const basePrompt = require("./prompt");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyC43be-sFpM65Aj3mtpMuWlcVGMsVnLI8c";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const prompt = "Repeat after me: one, two,";

client
  .generateText({
    model: MODEL_NAME,
    prompt: {
      text: basePrompt(),
    },
  })
  .then((result) => {
    console.log(result[0].candidates[0].output);
  });
