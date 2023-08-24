import { appSchema, tableSchema } from "@nozbe/watermelondb";

export enum TableName {
  PROPERTIES = "properties",
  RENTERS = "renters",
  CONTRACTS = "contracts"
}

export const amiraSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TableName.PROPERTIES,
      columns: [
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },

        { name: "name", type: "string", isOptional: true },
        { name: "street_address", type: "string" },
        { name: "city", type: "string" },
        { name: "country", type: "string" },

        { name: "square_meters", type: "number", isOptional: true },
        { name: "room_count", type: "string", isOptional: true },

        { name: "purchase_cost", type: "number" },
        { name: "transfer_tax", type: "number", isOptional: true },
        { name: "price", type: "number", isOptional: true },
        { name: "purchase_date", type: "number", isOptional: true },

        { name: "image_url", type: "string", isOptional: true },
        { name: "image_blur_hash", type: "string", isOptional: true },
        { name: "notes", type: "string", isOptional: true }
      ]
    }),
    tableSchema({
      name: TableName.CONTRACTS,
      columns: [
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },

        { name: "contract_start_date", type: "number" },
        { name: "contract_end_date", type: "number", isOptional: true },
        { name: "rent", type: "number" },
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "phone_number", type: "string", isOptional: true },
        { name: "email", type: "string", isOptional: true },
        // Don't forget to add the foreign key to associate with properties:
        { name: "property_id", type: "string" }
      ]
    })
  ]
});
