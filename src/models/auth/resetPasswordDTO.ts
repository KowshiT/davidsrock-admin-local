export default class resetPasswordDTO {
  username: string;
  tempPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(
    username: string,
    tempPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    this.username = username;
    this.tempPassword = tempPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;

  }
}