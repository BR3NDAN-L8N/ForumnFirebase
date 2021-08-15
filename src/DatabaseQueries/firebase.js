import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyBChW-mrmkN58_k6z5vGtaM7l551--bvqc",
    authDomain: "forumn-b6428.firebaseapp.com",
    projectId: "forumn-b6428",
    storageBucket: "forumn-b6428.appspot.com",
    messagingSenderId: "187255748042",
    appId: "1:187255748042:web:a58facca4e849267010b33",
    measurementId: "G-LG6Z98P0VP"
})

firebase.analytics();

export default firebase.firestore()