import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBo6CZWAvg8VUm_8bCOekfLWrafNAx16Fw",
  authDomain: "sharks-repertoire.firebaseapp.com",
  databaseURL: "https://sharks-repertoire.firebaseio.com",
  projectId: "sharks-repertoire",
  storageBucket: "sharks-repertoire.appspot.com",
  messagingSenderId: "355114391613"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // AUTH API //

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // DB API //

  doCreateSong = song =>
    this.db.ref().child('songs').push(song);

  doCreateGig = gig =>
    this.db.ref().child('gigs').push(gig);


  // USER API //

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;
