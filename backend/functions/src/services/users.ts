import { Request, Response } from "express";
import { LoginUser, SignUpUser } from "../interfaces/user.interface";
import { firebaseConfig } from "../util/config"
import { initializeApp } from 'firebase/app'
import * as authenticator from 'firebase/auth'
import * as validators from '../helper/validators'
import admin from "../util/admin";


const app = initializeApp(firebaseConfig)

let auth = authenticator.getAuth(app)

export const loginUser = async (request: Request, response: Response) => {
    const user: LoginUser = {
        email: request.body.email,
        password: request.body.password
    }
    if (validators.isValidloginData(user)) {
        try {
            let data = await authenticator.signInWithEmailAndPassword(auth, user.email, user.password)
            let token = await data.user.getIdToken(true)
            return response.json({ token })
        }
        catch (error) {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again' });
        }

    }

    return response.status(403).json({ 'messgage': 'invalid credtials' })
}

export const registerUser = async (request: Request, response: Response) => {
    const newUser: SignUpUser = {
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        userName: request.body.userName,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword
    }

    if (!validators.isValidSignupData(newUser)) {
        return response.status(400).json({ 'message': 'invalid data' })
    }

    let token, userId: string
    let doc = await admin.db.doc(`/users/${newUser.userName}`).get()
    if (doc.exists) {
        return response.status(400).json({ error: 'username is already taken' })
    } else {

        try {
            let data = await authenticator.createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            userId = data.user.uid
            token = await data.user.getIdToken(true)

            const userCredentials: any = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId: userId
            }

            await admin.db.doc(`/users/${newUser.userName}`).set(userCredentials)

            return response.json({ token })

        } catch (err) {
            console.error(err);
            return response.status(400).json({ email: 'error in given' });
        }

    }
}

export const getUserDetails = async (request: Request, response: Response) => {
    let userId = request.params.user
    let doc = await admin.db.doc(`/users/${userId}`).get()
    if (!doc.exists) {
        return response.status(404).json({ error: 'user not found' })
    } else {
        let userData = doc.data()
        return response.json(userData)
    }
}

export const getCurrenUserDetails = async (request: Request, response: Response) => {
    let userName = request.cred.userName
    let doc = await admin.db.doc(`/users/${userName}`).get()
    if (!doc.exists) {
        return response.status(404).json({ error: 'user not found' })
    } else {
        let userData = doc.data()
        return response.json(userData)
    }
}
