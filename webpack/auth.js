import firebase from "firebase/app";
import "firebase/auth";
import { db } from "./database";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB75zRrXt9rHoi9mObhTnRfenK6g5bnHTk",
  authDomain: "incendium-academy.firebaseapp.com",
  databaseURL: "https://incendium-academy.firebaseio.com",
  projectId: "incendium-academy",
  storageBucket: "incendium-academy.appspot.com",
  messagingSenderId: "941896137375",
  appId: "1:941896137375:web:75ea163837beb0a42800aa",
};

class _Auth {
  constructor() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  validateEmail(email) {
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;
    return EMAIL_REGEX.test(email);
  }

  validatePassword(password) {
    // min 8 characters, 1 upper, 1 lower, 1 number, 1 symbol
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/g;
    return PASSWORD_REGEX.test(password);
  }

  createUserWithEmailAndPassword(email, password, name) {
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log(user);
    //     user.user.updateProfile({ displayName: name });
    //     user.user.sendEmailVerification();
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //     console.log(error);
    //   });

    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then((user) => {
        user.user.updateProfile({ displayName: name }).then(() => {
          window.location.reload();
        });
        user.user.sendEmailVerification();
      })
      .catch((error) => {
        // alert(error.message);
        console.error(error.code, error.message);
      });
  }

  signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);

    // let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // firebase
    //   .auth()
    //   .currentUser.linkWithCredential(credential)
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .currentUser.linkWithRedirect(provider)
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  signInAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        console.error(error.code, error.message);
      });
  }

  signOut() {
    return firebase.auth().signOut();
  }

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  }

  getRedirectResult() {
    firebase
      .auth()
      .getRedirectResult()
      // .then((result) => {
      //   console.log("Success:", result);
      // })
      .catch(async (error) => {
        // Manually merge data if already linked
        if (error.code == "auth/credential-already-in-use") {
          let anonUser = firebase.auth().currentUser;
          let anonData = await db.get();
          db.delete();

          firebase
            .auth()
            .signInWithCredential(error.credential)
            .then((res) => {
              Object.keys(anonData).forEach((key) => {
                if (!anonData[key]) delete anonData[key];
              });

              db.initialize(res.user.uid);
              db.updateProgress(anonData);

              anonUser.delete().catch((error) => {
                console.error(error);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
  }
}

export const auth = new _Auth();

window.currentUser = function () {
  return firebase.auth().currentUser;
};
