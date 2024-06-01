import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDI292RmKodd0e84ITF1XccKhvALPyXf0E",
    authDomain: "thihive.firebaseapp.com",
    projectId: "thihive",
    storageBucket: "thihive.appspot.com",
    messagingSenderId: "5486000504",
    appId: "1:5486000504:web:2c2ca7e254af6dee03308d"
};

const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app);


// export const auth = app.auth()
export default app