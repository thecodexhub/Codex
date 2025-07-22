const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//mock data
const mockUsers = {
  "35rhZjdUCcYN2uEkTtD1OpGWJ432": {
    uid: "35rhZjdUCcYN2uEkTtD1OpGWJ432",
    firstName: "Sobiya",
    lastName: "Shaikh",
    email: "sobiyashaikh22@gmail.com",
    username: "sobiya.tech",
  },
};

// Middlewareto verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Will contain uid, email
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

//Public Route
app.get("/", (req, res) => {
  res.send("Firebase Auth Verification Server is running...");
});

//Protected Route
app.post("/verify", verifyFirebaseToken, (req, res) => {
  const { uid } = req.user;

  // Simulate DB lookup
  const userData = mockUsers[uid];

  if (!userData) {
    return res.status(404).json({ error: "User not found in database" });
  }

  return res.json({ success: true, user: userData });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
