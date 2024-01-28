import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDtuNnGbu5DVO5quwtQaVv9KMa8q53vcJA",
    authDomain: "tamux-pimco-challenge.firebaseapp.com",
    projectId: "tamux-pimco-challenge",
    storageBucket: "tamux-pimco-challenge.appspot.com",
    messagingSenderId: "1016769469994",
    appId: "1:1016769469994:web:e36ca4678cbb66109a2d53"
  };

  const app = initializeApp(firebaseConfig)

  export const db = getFirestore(app)