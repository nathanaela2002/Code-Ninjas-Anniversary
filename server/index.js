// to anyone else working on this file, start the backend using "npm run dev"
// you will not be able to access MongoDB without whitelisting your ip
// as a side note, prefix any environment variable with VITE or else it will not work. e.g. VITE_MONGO_URI

// todos:
// TODO: Add a logoout endpoint
// TODO: Add a get profile endpoint for users to see their profile settings
// TODO: Create a token verifier function to verify jwtcookie and use in the get profile endpoint
// TODO: Add a submit endpoint for users to get points from submitting flags
// TODO: Use cookies

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config({ path: "../client/.env" });

const uploadMiddleware = multer({
  dest: "./uploads/ ",
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.VITE_MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("connection error", err));

app.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, profilePicture } =
    req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture: profilePicture || null,
    });
    const savedUser = await user.save();
    console.log("User saved:", savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.VITE_JWT_SECRET,
      { expiresIn: "1h" }, // maybe change to something a bit longer later
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/upload-pfp", uploadMiddleware.single("pfp"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePicture = req.file.path;
    await user.save();

    res.json({
      message: "Profile picture uploaded successfully",
      filePath: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
