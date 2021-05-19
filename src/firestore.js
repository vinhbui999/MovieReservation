import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDOC5PzR3vbmmgNwCjWNrp7pYX2gz0Vdw8",
    authDomain: "signintest-53945.firebaseapp.com",
    projectId: "signintest-53945",
    storageBucket: "signintest-53945.appspot.com",
    messagingSenderId: "836942836631",
    appId: "1:836942836631:web:f7621132943e95f36e4ad2",
    measurementId: "G-JJE6DV0SY1",
    databaseURL: "https://signintest-53945-default-rtdb.firebaseio.com/"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
