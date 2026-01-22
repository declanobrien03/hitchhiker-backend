import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);
export const db = new Low(adapter);

export async function initDb() {
  try {
    await db.read();
    if (!db.data) {
      db.data = { routes: [] };
      await db.write();
    }
  } catch (err) {
    console.error("DB init error:", err);
    throw err;  // Crash startup so error is visible
  }
}
