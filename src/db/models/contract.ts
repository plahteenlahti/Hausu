import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation
} from "@nozbe/watermelondb/decorators";

import { TableName } from "../schema";

import { Property } from "./property";

export class Contract extends Model {
  static table = TableName.CONTRACTS;

  @readonly @date("created_at") createdAt: Date;
  @readonly @date("updated_at") updatedAt: Date;

  // information
  @date("contract_start_date") contractStartDate: Date;
  @date("contract_end_date") contractEndDate?: Date;

  @field("rent") rent: number;
  @field("first_name") firstName: string;
  @field("last_name") lastName: string;
  @field("phone_number") phoneNumber?: string;
  @field("email") email?: string;

  @relation("properties", "property_id") property: Property;
}
