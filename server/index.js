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
const Submissions = require("./models/Submissions");
const Notifications = require("./models/Notifications");
const RegistrationRequest = require("./models/RegistrationRequest.js");
const multerS3 = require("multer-s3");
const {
  S3Client,
  DeleteObjectCommand,
  ListObjectVersionsCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config({ path: "../client/.env" });

const s3 = new S3Client({
  region: process.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
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

const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.VITE_AWS_S3_BUCKET,
    key: (req, file, cb) => {
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

app.post("/generate-registration-url", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const regRequest = new RegistrationRequest({ email, token, expiresAt });
    await regRequest.save();

    const registrationLink = `http://localhost:3000/register?token=${token}`;
    res.json({ registrationLink });
  } catch (err) {
    console.error("Error generating registration URL: ", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  const {
    token,
    firstName,
    lastName,
    username,
    email,
    password,
    profilePicture,
  } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  if (!token) {
    return res.status(400).json({ message: "No registration token" });
  }

  try {
    const regRequest = await RegistrationRequest.findOne({ token });
    if (!regRequest) {
      return res.status(400).json({ message: "Invalid registration token" });
    }
    if (regRequest.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "Registration token has expired" });
    }
    if (regRequest.email !== email) {
      return res
        .status(400)
        .json({ message: "Email does not match the requested email" });
    }

    const alreadyExists = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
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

    await RegistrationRequest.deleteOne({ token });

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

async function deleteAllVersions(bucket, key) {
  try {
    const listResponse = await s3.send(
      new ListObjectVersionsCommand({
        Bucket: bucket,
        Prefix: key,
      }),
    );

    const versions = (listResponse.Versions || []).filter((v) => v.Key === key);
    const deleteMarkers = (listResponse.DeleteMarkers || []).filter(
      (dm) => dm.Key === key,
    );

    const items = [...versions, ...deleteMarkers];

    for (const item of items) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
          VersionId: item.VersionId,
        }),
      );
      console.log(`Deleted version ${item.VersionId} for key ${key}`);
    }
  } catch (error) {
    console.error("Error deleting all versions:", error);
  }
}

app.post(
  "/upload-pfp",
  authenticate,
  uploadMiddleware.single("pfp"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profilePicture) {
        const oldUrl = user.profilePicture;
        const baseUrl = `https://${process.env.VITE_AWS_S3_BUCKET}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/`;
        const oldKey = oldUrl.replace(baseUrl, "");

        await deleteAllVersions(process.env.VITE_AWS_S3_BUCKET, oldKey);
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
  },
);

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

app.post("/submit", authenticate, async (req, res) => {
  const { makeCodeURL, riddleId } = req.body;

  if (!makeCodeURL) {
    return res.status(400).json({ message: "Submission URL required" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSubmission = await Submissions.findOne({
      userId: user._id,
      riddleId: riddleId,
    });
    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "You have already submitted this riddle" });
    }

    const submission = new Submissions({
      userId: user._id,
      riddleId,
      submissionLink: makeCodeURL,
    });
    await submission.save();

    res.json({
      message:
        "Submission recorded successfully and is awaiting admin approval",
    });
  } catch (error) {
    console.error("Error in submission:", error);
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
      service: "Outlook365",
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS,
      },
    });

    const options = {
      from: "cnaeventsdonotreply@gmail.com",
      to: user.email,
      subject: "Testing email",
      text: "test",
    };

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Sent: ", info.response);
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

app.post("/logout", authenticate, async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/admin/submissions", authenticate, async (req, res) => {
  try {
    const submissions = await Submissions.find()
      .populate("userId", "username")
      .sort({ createdAt: 1 });

    const data = submissions.map((sub) => ({
      id: sub._id,
      username: sub.userId.username,
      submissionLink: sub.submissionLink,
      timeSubmitted: sub.createdAt,
      approved: sub.approved,
    }));
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/admin/submissions/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const submission = await Submissions.findById(id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const user = await User.findById(submission.userId);

    if (decision === "approve") {
      submission.approved = true;
      if (user) {
        user.points += 100;
        await user.save();
      }
      await submission.save();
      const notification = new Notifications({
        userId: user._id,
        type: "submissionUpdate",
        payload: {
          decision,
          submissionId: submission._id,
        },
      });
      await notification.save();
    } else if (decision === "disapprove") {
      const notification = new Notifications({
        userId: user._id,
        type: "submissionUpdate",
        payload: {
          decision,
          submissionId: submission._id,
        },
      });
      await notification.save();
      await Submissions.findByIdAndDelete(id);
    }

    res.json({ message: `Submission ${decision}d successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/notifications", authenticate, async (req, res) => {
  try {
    const notifications = await Notifications.find({ userId: req.userId }).sort(
      { createdAt: -1 },
    );
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
