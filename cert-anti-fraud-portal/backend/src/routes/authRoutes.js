import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config.js";
import { createInstitution, findInstitutionByEmail } from "../models/institutionModel.js";

export const authRouter = express.Router();

function makeToken(inst) {
  return jwt.sign(
    { id: inst.id, email: inst.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// POST /api/auth/signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existing = await findInstitutionByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Institution with this email already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const inst = await createInstitution({ email, passwordHash: hash, displayName });
    const token = makeToken(inst);
    return res.status(201).json({ token, institution: inst });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }
    const inst = await findInstitutionByEmail(email);
    if (!inst) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, inst.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = makeToken(inst);
    return res.json({ token, institution: inst });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
