import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("db.json");
export const db = new Low(adapter);

export async function initDb() {
  await db.read();
  if (!db.data) {
    db.data = { routes: [] };
    await db.write();
  }
}
