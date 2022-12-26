import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// replace this firebase conFigvariable with your own
const firebaseConfig = {
  apiKey: 'AIzaSyBGR7wOPzgJvy8xTfKGbeeLajtyfRFHojM',
  authDomain: 'reviewer-75704.firebaseapp.com',
  projectId: 'reviewer-75704',
  storageBucket: 'reviewer-75704.appspot.com',
  messagingSenderId: '225603679538',
  appId: '1:225603679538:web:fecf86831cfa97504ad32b',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
