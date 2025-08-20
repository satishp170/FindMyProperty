import { Address } from './Address.js';

export class Property {
    constructor({
        id,
        name,
        category,
        description,
        price,
        discount,
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
        this.category = category;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.image = image;
        this.beds = beds;
        this.area = area;
        this.address = new Address(address);
        this.sellerId = sellerId;
        this.buyable = buyable;
        this.rentable = rentable;
    }

    toFormData() {
        return {
            name: this.name,
            category: this.category?.toLowerCase() || '',
            beds: this.beds?.toString() || '',
            area: this.area?.toString() || '',
            price: this.price?.toString() || '',
            discount: this.discount?.toString() || '',
            buyable: this.buyable || false,
            rentable: this.rentable || false,
            description: this.description || '',
            address: {
                lineOne: this.address?.lineOne || '',
                lineTwo: this.address?.lineTwo || '',
                city: this.address?.city || '',
                state: this.address?.state || '',
                zipCode: this.address?.zipCode || ''
            }
        };
    }

    toPayload() {
        return {
            name: this.name,
            category: this.category?.toUpperCase(),
            beds: this.beds,
            area: this.area,
            price: this.price,
            discount: this.discount,
            buyable: this.buyable,
            rentable: this.rentable,
            description: this.description,
            sellerId: this.sellerId,
            address: {
                lineOne: this.address.lineOne,
                lineTwo: this.address.lineTwo,
                city: this.address.city,
                state: this.address.state,
                zipCode: this.address.zipCode
            }
        };
    }
}