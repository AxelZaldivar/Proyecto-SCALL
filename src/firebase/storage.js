//importar para utilizar storage
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC7ZVTYA9Z3WC8kmWHIkEkv48LuDXA4LFU",
    authDomain: "scall-a4924.firebaseapp.com",
    projectId: "scall-a4924",
    storageBucket: "scall-a4924.appspot.com",
    messagingSenderId: "639961564249",
    appId: "1:639961564249:web:a12be1ad34dbdf4ddd5d48",
    measurementId: "G-3K7HM2M3D0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.storage();