import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,// authentication 설정
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword, //email 회원가입
} from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHby9QmH8UyR2PEWZq2D1urdHEA6puYm4",
    authDomain: "disneyplus-26824.firebaseapp.com",
    projectId: "disneyplus-26824",
    storageBucket: "disneyplus-26824.appspot.com",
    messagingSenderId: "512034678486",
    appId: "1:512034678486:web:3bc06de2d3c0ff4ecc0b77",
    measurementId: "G-Y4LBB3ZER3"
};

const auth = getAuth();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const signupEmail = (email, password) => {
    //Email 회원가입
    return createUserWithEmailAndPassword(auth, email, password);
};


//Email 로그인
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
