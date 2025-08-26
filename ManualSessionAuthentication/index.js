import express from "express";
import mongoose from "mongoose";
import path from "path";
import Session from "./models/Session.js";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import UserModel from "./models/Users.js";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";

const app = express();

// Required fix for __dirname in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongoURI =
  "mongodb+srv://dabhanushali:824Deep%401@cluster0.nd8bh9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Auth middleware
const isAuth = async (req, res, next) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    return res.redirect("/login");
  }
  const session = await Session.findOne({ sessionId: sessionId }).populate(
    "userId",
    "-password"
  );

  if (!session) {
    return res.redirect("/login");
  }
  req.user = session.userId;
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
  });
  next();
};

// Routes
app.get("/", (req, res) => res.render("landing"));

app.get("/login", (req, res) => res.render("login"));

app.get("/register", (req, res) => res.render("register"));

app.get("/dashboard", isAuth, (req, res) =>
  res.render("dashboard", { user: req.user })
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("Invalid email or password");
  }

  const sessionId = uuidv4();
  const session = new Session({
    sessionId,
    userId: user._id,
  });
  await session.save();

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 1000,
  });

  // res.status(200).json({message: 'Login successful'})
  res.redirect("/dashboard");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let user = await UserModel.findOne({ email });
  if (user) return res.redirect("/register");

  user = new UserModel({
    username,
    email,
    password: bcrypt.hashSync(password, 12),
  });

  await user.save();
  res.redirect("/login");
});

app.post("/logout", async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    await Session.deleteOne({ sessionId });
  }
  res.clearCookie("sessionId");
  res.redirect("/login");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
