import * as admin from 'firebase-admin'

import * as dotenv from 'dotenv'

dotenv.config()

admin.initializeApp({
    'credential': admin.credential.applicationDefault(),
    'databaseURL': 'market-9c3c5.firebaseio.com'
});

const db = admin.firestore()

export default { admin, db }
