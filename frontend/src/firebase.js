import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApgM1lk5rJJb6bWfzglwmMu4oT9GLbWyY",
    authDomain: "hackaton2024romania.firebaseapp.com",
    projectId: "hackaton2024romania",
    storageBucket: "hackaton2024romania.appspot.com",
    messagingSenderId: "886388558656",
    appId: "1:886388558656:web:dd5c51420f55eb2b1b48a5"
};

const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app);


export default app