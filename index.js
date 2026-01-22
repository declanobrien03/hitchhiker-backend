import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors"; // ✅ add this
import { nanoid } from "nanoid";


const app = express();
app.use(express.json());
app.use(cors()); // ✅ allow all origins

const db = new Low(new JSONFile("db.json"), { items: [] });
await db.read();

// routes
app.get("/", (req, res) => res.json({ status: "backend running" }));
app.get("/items", (req, res) => res.json(db.data.items));
app.post("/items", async (req, res) => {
  db.data.items.push(req.body);
  await db.write();
  res.json({ success: true });
});

app.post("/routes", async (req, res) => {
  db.data.routes ||= [];

  const route = {
    id: nanoid(),
    ...req.body
  };

  db.data.routes.push(route);
  await db.write();

  res.json(route);
});


app.delete("/routes/:id", async (req, res) => {
  db.data.routes = (db.data.routes || []).filter(
    r => r.id !== req.params.id
  );
  await db.write();
  res.json({ success: true });
});


app.get("/routes", (req, res) => {
  res.json(db.data.routes || []);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
