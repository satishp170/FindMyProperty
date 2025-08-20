import { Address } from './Address.js';
import { Property } from './Property.js';

export class User {
  constructor({
    id,
    createdOn,
    lastUpdatedOn,
    name,
    username,
    email,
    contactNo,
    dob,
    imageUrl,
    address,
    role,
    avlProps = []
  }) {
    this.id = id;
    this.createdOn = createdOn;
    this.lastUpdatedOn = lastUpdatedOn;
    this.name = name;
    this.username = username;
    this.email = email;
    this.contactNo = contactNo;
    this.dob = dob;
    this.imageUrl = imageUrl;
    this.address = new Address(address);
    this.role = role;
    this.avlProps = avlProps.map(prop => new Property(prop));
  }
}