import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

const db = new Low(new JSONFile("db.json"), { items: [] });

await db.read();

app.get("/", (req, res) => {
  res.json({ status: "backend running" });
});

app.get("/items", (req, res) => {
  res.json(db.data.items);
});

app.post("/items", async (req, res) => {
  db.data.items.push(req.body);
  await db.write();
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
