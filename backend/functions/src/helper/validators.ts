import { LoginUser, SignUpUser } from "../interfaces/user.interface"

const isValid = (str: string): boolean => {
    return !(str.trim() === "") 
}

const isValidEmail = (email: string): boolean => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return email.match(emailRegEx) ? true : false
}

export const isValidloginData = (data: LoginUser) => {
    return (isValid(data.email) && isValid(data.password))
}

export const isValidSignupData = (data: SignUpUser) => {
    return (isValidEmail(data.email) && data.password === data.confirmPassword && isValid(data.firstName) && isValid(data.lastName) && isValid(data.userName) && isValid(data.password))
}
