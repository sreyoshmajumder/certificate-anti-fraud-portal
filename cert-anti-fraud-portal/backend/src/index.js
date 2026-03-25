import express from "express";
import cors from "cors";
import { PORT, CLIENT_ORIGIN } from "./config.js";
import { initDb } from "./db.js";
import { authRouter } from "./routes/authRoutes.js";
import { institutionRouter } from "./routes/institutionRoutes.js";

async function main() {
  await initDb();

  const app = express();

  app.use(
    cors({
      origin: CLIENT_ORIGIN,      // must be http://localhost:3000
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/institutions", institutionRouter);

  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
    console.log("CORS origin:", CLIENT_ORIGIN);
  });
}

main().catch((err) => {
  console.error("Fatal error", err);
  process.exit(1);
});
