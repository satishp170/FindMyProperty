import { Address } from './Address.js';

export class PostPropertyModel {
  constructor({
    name,
    sellerId,
    category,
    address,
    beds,
    area,
    price,
    discount,
    buyable,
    rentable,
    description
  }) {
    this.name = name;
    this.sellerId = sellerId;
    this.category = category;
    this.address = new Address(address);
    this.beds = beds;
    this.area = area;
    this.price = price;
    this.discount = discount;
    this.buyable = buyable;
    this.rentable = rentable;
    this.description = description;
  }
}