import { NextFunction, Request, Response} from 'express'
import admin from './admin';

interface UserCred {
    user: object
    userName: string
}

declare module 'express-serve-static-core' {
    interface Request {
      cred: UserCred
    }
    interface Response {
      cred: UserCred
    }
  }

const auth = async (request: Request, response: Response, next: NextFunction) => {
    let idToken

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1]
    } else {
        console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
    }

    try {
        let decodedToken = await admin.admin.auth().verifyIdToken(idToken)
        let data = await admin.db.collection('users').where('userId', '==', decodedToken.uid).limit(1).get()
        request.cred = {
          'user': decodedToken,
          'userName': data.docs[0].data().userName
        }
        return next()
    } catch (err) {
        console.error('Error while verifying token', err);
		return response.status(403).json(err);
    }
} 

export default auth
