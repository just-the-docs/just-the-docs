import firebase from "firebase/app";
import "firebase/firestore";

class _Database {
  initialize(uid) {
    this.db = firebase.firestore().collection("users").doc(uid);
    // console.log("db initialized");
  }

  uninitialize() {
    this.db = null;
    // console.log("db uninitialized");
  }

  get isReady() {
    return this.db != null;
  }

  async get() {
    return (await this.db.get()).data();
  }

  updateDOM() {
    // console.log("DOM updated");
    this.db
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          let progress = docSnapshot.data();
          Object.keys(progress).forEach((key) => {
            document.querySelector(`input[name='${key}']`).checked =
              progress[key];
          });
        } else {
          document
            .querySelectorAll("input[type=checkbox]")
            .forEach((checkbox) => (checkbox.checked = false));
        }
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  }

  updateProgress(progress) {
    this.db.set(progress, { merge: true });
  }

  delete() {
    this.db.delete();
  }
}

export const db = new _Database();
