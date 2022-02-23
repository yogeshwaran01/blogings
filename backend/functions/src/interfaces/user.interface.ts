export interface User {
    email: string
    firstName: string
    lastName: string
    userName: string
    password: string
}

export interface SignUpUser extends User {
    confirmPassword: string
}

export interface LoginUser {
    email: string
    password: string
}
