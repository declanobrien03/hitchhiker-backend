import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("db.json");
export const db = new Low(adapter);

// Initialize DB if empty
await db.read();
db.data ||= { routes: [] };
await db.write();
