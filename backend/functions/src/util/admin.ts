import * as admin from 'firebase-admin'

import * as dotenv from 'dotenv'

dotenv.config()

admin.initializeApp({
    'credential': admin.credential.cert({
        clientEmail: process.env.client_email,
        privateKey: process.env.project_key ? JSON.parse(process.env.project_key) : undefined,
        projectId: process.env.project_id
    }),
    'databaseURL': 'market-9c3c5.firebaseio.com'
});

const db = admin.firestore()

export default { admin, db }
