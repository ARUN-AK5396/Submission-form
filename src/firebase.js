import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCL5kDRIICG90jUdT6c8hJ_vqMiqfUt9Bs',
  authDomain: 'form-data-9802e.firebaseapp.com',
  projectId: 'form-data-9802e',
  storageBucket: 'form-data-9802e.appspot.com',
  messagingSenderId: '1073774218896',
  appId: '1:1073774218896:web:75e73b2630393c71459215',
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default getFirestore(app);
