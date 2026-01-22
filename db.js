import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);
const defaultData = { routes: [] };

export const db = new Low(adapter, defaultData);

export async function initDb() {
  await db.read();
  // data initialized with defaultData if file empty or missing
  await db.write();
}
