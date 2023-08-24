import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text
} from "@nozbe/watermelondb/decorators";

import { TableName } from "../schema";

export class Renter extends Model {
  static table = TableName.RENTERS;

  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  // basic information
  @text("first_name") firstName!: string;
  @field("last_name") lastName!: string;
  @field("phone_number") phoneNumber?: string;
  @field("email") email?: string;

  // property
}
