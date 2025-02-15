// to anyone else working on this file, start the backend using "npm run dev"
// you will not be able to access MongoDB without whitelisting your ip
// as a side note, prefix any environment variable with VITE or else it will not work. e.g. VITE_MONGO_URI

// todos:
// TODO: setup s3 bucket to store user pfps
// TODO: CORS

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const User = require("./models/User");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: "../client/.env" });

AWS.config.update({
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_AWS_REGION,
});

const s3 = new AWS.S3();

const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.VITE_AWS_S3_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `pfps/${Date.now().toString()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});
//TODO: change origin to production url
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
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

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  try {
    const alreadyExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Username or email already in use " });
    }

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture: profilePicture || null,
      points: 0,
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
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, {
      expiresIn: "1h",
    });

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

    user.profilePicture = req.file.location;
    await user.save();

    res.json({
      message: "Profile picture uploaded successfully",
      filePath: req.file.location,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized 1" });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized 2" });
  }
};

app.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        points: user.points,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error getting profile", error);
    res.status(500).json({ message: "Server error" });
  }
});

// TODO: change the flag and points awarded to an actual value
const flags = {
  riddle1: { flag: "some type of submission", points: 100 },
  riddle2: { flag: "asdf", points: 200 },
  riddle3: { flag: "asdf", points: 300 },
  riddle4: { flag: "asdf", points: 400 },
  riddle5: { flag: "asdf", points: 500 },
  riddle6: { flag: "asdf", points: 600 },
  riddle7: { flag: "asdf", points: 700 },
};
let submissionOrder = {};

app.post("/submit", authenticate, async (req, res) => {
  const { userId, riddleId, userAnswer } = req.body;

  if (!riddleId || !userAnswer) {
    return res.status(400).json({ message: "Riddle and Answer are required" });
  }

  const riddle = flags[riddleId];

  if (!riddle) {
    return res.status(404).json({ message: "Challenge not found" });
  }

  if (riddle.flag !== userAnswer) {
    return res.status(400).json({ message: "Incorrect answer" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!submissionOrder[riddleId]) {
      submissionOrder[riddleId] = [];
    }

    const alrSubmit = submissionOrder[riddleId].includes(user._id);
    if (alrSubmit) {
      return res
        .status(400)
        .json({ message: "You have already completed this riddle" });
    }

    submissionOrder[riddleId].push(user._id);

    // TODO: find a reasonable way to award points using the players position in the submission ranking
    const position = submissionOrder[riddleId].length;
    const rewardedPoints = 1000000;

    user.points += rewardedPoints;
    await user.save();

    res.json({
      message: "Answer submitted successfully",
      rewardedPoints,
      total: user.points,
    });
  } catch (error) {
    console.error("Error in submission", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.VITE_FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS,
      },
    });
    // TODO: change the from field to actual email once confirmed
    await transporter.sendMail({
      from: "compliancecna@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    });

    res.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters in length" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/leaderboard", authenticate, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .select("username points profilePicture")
      .limit(10);

    res.json(
      users.map((user, index) => ({
        id: index + 1,
        name: user.username,
        points: user.points,
        avatarUrl: user.profilePicture || null,
      })),
    );
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/rank", authenticate, async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1, createdAt: 1 });

    const rank = users.findIndex((u) => u._id.toString() === req.userId) + 1;

    res.json({ rank });
  } catch (error) {
    console.error("Rank error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
