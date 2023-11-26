const express = require("express");
const admin = require("firebase-admin");
const credential = require("./servicekey.json");
const dotenv = require("dotenv");
// const getSignedJwtToken = require("./utilities/getSignedJwtToken");

const { getSignedJwtToken } = require("./utilities");
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

const app = express();

const auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

app.use("/api/auth", auth);
app.use(errorHandler);

// const db = admin.firestore();

// app.post("/register", async (req, res) => {
//   const uid = req.body.uid;
//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(uid, salt);
//   const user = {
//     name: req.body.displayName,
//     email: req.body.email,
//     photoURL: req.body.photoURL,
//     password,
//   };

//   await db.collection("users").doc(uid).set(user);

//   const userRef = await db.collection("users").doc(uid).get();
//   const userData = {
//     name: userRef._fieldsProto.name.stringValue,
//     email: userRef._fieldsProto.email.stringValue,
//     photoURL: userRef._fieldsProto.photoURL.stringValue,
//   };

//   const token = getSignedJwtToken(uid);

//   res.json({ message: "success", token, data: userData });
// });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
