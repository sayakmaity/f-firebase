import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/* The configuration for the firebase app. */
const firebaseConfig = {
    apiKey: 'AIzaSyA53LkL3bmpJvTkF120f_ij9YrDQNd7rVU',
    authDomain: 'svelte-todo-b5cf4.firebaseapp.com',
    projectId: 'svelte-todo-b5cf4',
    storageBucket: 'svelte-todo-b5cf4.appspot.com',
    messagingSenderId: '1065709554609',
    appId: '1:1065709554609:web:437116465e13d73b16cb90',
    measurementId: 'G-36KCEXY066'
};

/* Initializing the firebase app with the configuration that was provided. */
firebase.initializeApp(firebaseConfig);

/* This is exporting the authentication and database services from the firebase library. */
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();

/* This is a listener that is called whenever the authentication state changes. */
firebase.auth().onAuthStateChanged(function(user) {
    console.log('auth state changed');
    /* This is checking if the user is logged in. If they are, it is checking if the user has a
    document in the database. If they don't, it is creating one. */
    if (user) {
        db.collection('users').doc(user.uid).get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                console.log(user.uid);
                db.collection('users').doc(user.uid).set({ });
            }
        });
    }
});