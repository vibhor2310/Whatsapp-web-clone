// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKlecUXXgAmFXeiZlR7y2vPs7qOvx5xj8",
    authDomain: "whatsapp-clone-29922.firebaseapp.com",
    projectId: "whatsapp-clone-29922",
    storageBucket: "whatsapp-clone-29922.appspot.com",
    messagingSenderId: "445273055121",
    appId: "1:445273055121:web:344814a2580bf59714c430",
    measurementId: "G-W7YYKW1KS0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
 const provider = new firebase.auth.GoogleAuthProvider();

 export{auth,provider};

 export default db;