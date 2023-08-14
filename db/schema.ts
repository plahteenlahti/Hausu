import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const amiraSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "properties",
      columns: [
        { name: "name", type: "string" },
        { name: "street_address", type: "string" },
        { name: "city", type: "string" },
        { name: "country", type: "string" },
        { name: "purchase_cost", type: "number" },
        { name: "image_url", type: "string", isOptional: true },
        { name: "notes", type: "string", isOptional: true }
      ]
    })
  ]
});
