import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Contract } from "./models/contract";
import { Property } from "./models/property";
import { amiraSchema } from "./schema";

const adapter = new SQLiteAdapter({
  dbName: "AmiraDB",
  schema: amiraSchema
});

export const database = new Database({
  adapter,
  modelClasses: [Property, Contract]
});
