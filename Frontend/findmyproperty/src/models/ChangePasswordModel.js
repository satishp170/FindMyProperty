export class ChangePasswordModel {
  constructor({
    oldPassword,
    newPassword
  }) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}