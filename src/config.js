import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAmKZGa4wN8qkepM1wNpp6m0Nv4u52SYpg",
  authDomain: "vacation-working-log.firebaseapp.com",
  databaseURL: "https://vacation-working-log.firebaseio.com",
  projectId: "vacation-working-log",
  storageBucket: "vacation-working-log.appspot.com",
  messagingSenderId: "146999700415"
};
let fire = firebase.initializeApp(config);

export default fire;