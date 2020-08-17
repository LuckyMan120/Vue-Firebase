import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
var firebaseConfig = {
  apiKey: "AIzaSyB7MCL8BGa09jSXf4UQNG8fhAmHkBOOkq8",
  authDomain: "vue-firebase-23188.firebaseapp.com",
  databaseURL: "https://vue-firebase-23188.firebaseio.com",
  projectId: "vue-firebase-23188",
  storageBucket: "vue-firebase-23188.appspot.com",
  messagingSenderId: "1017708428733",
  appId: "1:1017708428733:web:9767e4e63986e3e8de26d4",
  measurementId: "G-W9YCZKXTKB"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}