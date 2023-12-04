export default class registrationDTO {
    fullName: string;
    userName: string;
    email: string;
    contactNo: string;
    password: string;
    confirmPassword: string;

    constructor(
        fullName: string,
        userName: string,
        email: string,
        contactNo: string,
        password: string,
        confirmPassword: string,
    ) {
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.contactNo = contactNo;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}