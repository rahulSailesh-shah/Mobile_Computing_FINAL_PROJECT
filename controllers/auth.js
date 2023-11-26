const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const ErrorResponse = require("../utilities/errorResponse");
const { getSignedJwtToken } = require("../utilities");

exports.register = async (req, res, next) => {
  try {
    const db = admin.firestore();
    const uid = req.body.uid;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(uid, salt);
    const user = {
      name: req.body.displayName,
      email: req.body.email,
      photoURL: req.body.photoURL,
      password,
    };

    await db.collection("users").doc(uid).set(user);

    const userRef = await db.collection("users").doc(uid).get();
    const userData = {
      name: userRef._fieldsProto.name.stringValue,
      email: userRef._fieldsProto.email.stringValue,
      photoURL: userRef._fieldsProto.photoURL.stringValue,
    };

    const token = getSignedJwtToken(uid);
    res.status(200).json({ success: true, token, data: userData });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
};
