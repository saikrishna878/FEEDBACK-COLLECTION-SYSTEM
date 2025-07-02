
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
}));

const Feedback = mongoose.model("Feedback", new mongoose.Schema({
  name: String,
  message: String,
}));

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Email already registered." });
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });
  res.json({ message: "Registration successful!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
});

app.post("/submit", async (req, res) => {
  await Feedback.create(req.body);
  res.json({ message: "Feedback submitted!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
