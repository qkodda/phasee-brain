import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authRequired } from "./middleware.js";
import { z } from "zod";

const prisma = new PrismaClient();
export const campaignsRouter = Router();

const campaignSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["draft","scheduled","live","done"]).optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional()
});

campaignsRouter.use(authRequired);

campaignsRouter.get("/", async (req, res) => {
  const userId = (req as any).userId as string;
  const items = await prisma.campaign.findMany({ where: { ownerId: userId } });
  res.json(items);
});

campaignsRouter.post("/", async (req, res) => {
  const parsed = campaignSchema.parse(req.body);
  const userId = (req as any).userId as string;
  const created = await prisma.campaign.create({ data: { ...parsed, ownerId: userId } });
  res.status(201).json(created);
});
