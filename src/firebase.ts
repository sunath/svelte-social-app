import {initializeApp} from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyB_6HkhF1tMwQ_x8BDCbjDa3n6wr2Phv0w",
    authDomain: "social-app-svelte.firebaseapp.com",
    projectId: "social-app-svelte",
    storageBucket: "social-app-svelte.appspot.com",
    messagingSenderId: "292981107422",
    appId: "1:292981107422:web:068e976defda1edf92f04f",
    measurementId: "G-LCCVS8TXYR"
  };
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth  = getAuth(firebaseApp)
export const firebaseDatabase = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)


export const loginWithGoogle = () => {
  return signInWithPopup(firebaseAuth,new GoogleAuthProvider())
}

export const logout = () => {
  return firebaseAuth.signOut()
}
