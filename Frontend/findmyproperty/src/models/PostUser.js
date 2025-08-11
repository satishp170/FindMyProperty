import { Address } from './Address.js';

export class PostUser {
  constructor({
    name,
    username,
    email,
    contactNo,
    dob,
    address,
    role,
  }) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.contactNo = contactNo;
    this.dob = dob;
    this.address = new Address(address);
    this.role = role;
  }
}