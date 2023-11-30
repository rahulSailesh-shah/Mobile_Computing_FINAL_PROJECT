const express = require("express");
const firebase = require("firebase/app");
require("firebase/firestore");

const app = express();

// Initialize Firebase with your project config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  // ... other config options
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const firestore = firebase.firestore();

// Define a route to get a specific document by ID
app.get("/getDocument/:collectionName/:documentId", (req, res) => {
  const { collectionName, documentId } = req.params;

  // Reference to the specified document
  const documentRef = firestore.collection(collectionName).doc(documentId);

  // Retrieve the document
  documentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // Send the document data in the response
        res.json({ id: doc.id, data: doc.data() });
      } else {
        res.status(404).json({ error: "Document not found" });
      }
    })
    .catch((error) => {
      console.error(
        `Error getting document ${documentId} in ${collectionName}: `,
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
