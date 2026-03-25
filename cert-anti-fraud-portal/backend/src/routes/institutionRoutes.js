import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { updateInstitutionWallet, findInstitutionByEmail } from "../models/institutionModel.js";

export const institutionRouter = express.Router();

// GET /api/institutions/me
institutionRouter.get("/me", authRequired, async (req, res) => {
  try {
    const inst = await findInstitutionByEmail(req.user.email);
    if (!inst) return res.status(404).json({ message: "Institution not found" });
    const { passwordHash, ...safe } = inst;
    return res.json({ institution: safe });
  } catch (err) {
    console.error("Get me error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/institutions/wallet
institutionRouter.post("/wallet", authRequired, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ message: "walletAddress is required" });
    }
    const inst = await findInstitutionByEmail(req.user.email);
    if (!inst) {
      return res.status(404).json({ message: "Institution not found" });
    }
    const updated = await updateInstitutionWallet(inst.id, walletAddress);
    return res.json({ institution: updated });
  } catch (err) {
    console.error("Update wallet error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
