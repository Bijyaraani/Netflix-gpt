export const checkValidateData   = (email , password) => {

    const isEmailValid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);

    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    .test(password)

    

    if (!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "password is not valid"
    

    return  null;


};