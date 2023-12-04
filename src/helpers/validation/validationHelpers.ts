export function ValidateEmail(inputText:string)
{
    let mailFormat = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if(inputText.match(mailFormat))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function ValidateSpecialCharacters(inputText:string){
    let validate = /^[a-zA-Z]*$/;
    if (inputText.match(validate))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function ValidatePassword(inputText:string){
    let passwordFormat = /^(?=.*\d)(?=.*[!@#$%^&;:?*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(inputText.match(passwordFormat)){
        return true;

    }else{
        return false;
    }
}


export function validate_nic(nic:string) {
    let nicFormat = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
    if(nic.match(nicFormat)){
        return true;

    }else{
        return false;
    }
}

export function validatePhoneNumber(phoneNumber :string ) {
    let phoneNumberFormat = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if(phoneNumber.match(phoneNumberFormat)){
        return true;

    }else{
        return false;
    }
}