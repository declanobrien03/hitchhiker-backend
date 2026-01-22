import express from "express";
import { db } from "./db.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.get("/routes", (req, res) => {
  res.json(db.data.routes || []);
});

router.post("/routes", async (req, res) => {
  const route = {
    id: nanoid(),
    ...req.body,
  };

  db.data.routes.push(route);
  await db.write();

  console.log("Saved route:", route.id);
  res.json(route);
});

router.delete("/routes/:id", async (req, res) => {
  db.data.routes = db.data.routes.filter((r) => r.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

router.get("/_db", (req, res) => {
  res.json(db.data);
});

export default router;
