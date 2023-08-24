import { Model } from "@nozbe/watermelondb";
import {
  children,
  date,
  field,
  readonly,
  relation,
  text,
  writer
} from "@nozbe/watermelondb/decorators";

import { TableName } from "../schema";

import { Contract } from "./contract";

export class Property extends Model {
  static table = TableName.PROPERTIES;
  // static associations = {
  //   [TableName.CONTRACTS]: { type: "has_many", foreignKey: "property_id" }
  // };
  @readonly @date("created_at") createdAt: Date;
  @readonly @date("updated_at") updatedAt: Date;

  @text("name") name: string;

  @field("street_address") streetAddress: string;
  @field("city") city: string;
  @field("country") country: string;
  @field("square_meters") squareMeters: number;

  // purchase information
  @field("purchase_cost") purchaseCost: number;
  @field("transfer_tax") transferTax?: number;
  @date("purchase_date") purchaseDate: Date;

  // current price determinants
  @field("price") price: number;

  @field("image_url") imageUrl?: string;
  @field("image_blur_hash") imageBlurHash?: string;
  @text("notes") notes?: string;

  // @writer async addContract(contract: Contract) {
  //   const newComment = await this.collections
  //     .get(TableName.CONTRACTS)
  //     .create((c: Contract) => {
  //       c.property = this;
  //       c.contractStartDate = contract.contractStartDate;
  //     });
  //   return newComment;
  // }
}

export type PropertyObject = Omit<Property, "createdAt" | "updateAt">;
