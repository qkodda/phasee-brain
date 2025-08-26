import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./auth.js";
import { campaignsRouter } from "./campaigns.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", authRouter);
app.use("/campaigns", campaignsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Phasee brain running on :${PORT}`));
