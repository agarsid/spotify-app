import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyC47WSDW5pv1ZeNkNv3wMbLQusbf1MCCFY",
    authDomain: "backend-spotify.firebaseapp.com",
    databaseURL: "https://backend-spotify.firebaseio.com",
    projectId: "backend-spotify",
    storageBucket: "backend-spotify.appspot.com",
    messagingSenderId: "358025374996",
    // appId: "1:358025374996:web:a386dcaacac6cc5590a601",
    // measurementId: "G-TGF0FH74EH"
};
let app = Firebase.initializeApp(config);
export const db = app.database();