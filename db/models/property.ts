import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export enum TableName {
  PROPERTIES = "properties"
}

export class Property extends Model {
  static table = TableName.PROPERTIES;
  // @ts-ignore
  @text("name") name!: string;
  // @ts-ignore
  @field("street_address") street_address!: string;
  // @ts-ignore
  @field("city") city!: string;
  // @ts-ignore
  @field("country") country!: string;
  // @ts-ignore
  @field("purchase_cost") purchase_cost: number;
  // @ts-ignore
  @field("image_url") image_url?: string;
  // @ts-ignore
  @field("notes") notes?: string;
}
