import * as firebaseAdmin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { serviceAccount } from './serviceAccount';

// Reasoning for implementing this as this: https://stackoverflow.com/questions/50272165/firebase-import-service-throws-error
const firebaseServiceAccount = serviceAccount as firebaseAdmin.ServiceAccount;

// Initialize Firebase
export const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const firestoreDatabase = firebaseAdmin.firestore();

export { firebaseAdmin };
