import { Address } from './Address.js';

export class Property {
    constructor({
        id,
        name,
        description,
        price,
        image,
        beds,
        area,
        address,
        sellerId,
        buyable,
        rentable
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.beds = beds;
        this.area = area;
        this.address = new Address(address);
        this.sellerId = sellerId;
        this.buyable = buyable;
        this.rentable = rentable;
    }
}
