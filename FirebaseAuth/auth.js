import { getApp } from 'firebase/app';
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from 'firebase/auth';
import { app } from '../FirebaseAuth/firebase.config';

class AuthService {
  constructor() {
    this.auth = getAuth(app);
  }
  waitForUser(callback) {
    return onAuthStateChanged(this.auth, (userCred) => {
      callback(userCred);
    });
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }
  loginWithGithub() {
    return signInWithPopup(this.auth, new GithubAuthProvider())
      .then((userCred) => {
        return {
          user: userCred.user,
        };
      })
      .catch((error) => {
        return {
          error: error.message,
        };
      });
  }
  async logout() {
    await signOut(this.auth);
  }
}

export default new AuthService();
