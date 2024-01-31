import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  error: any;

  constructor(public auth: AngularFireAuth) { }

  async emailSignIn(email: string, password: string) {
    try {
      const credential = await this.auth.
        signInWithEmailAndPassword(
          email,
          password
        );
      this.user = credential.user;
    } catch (error) {
      this.error = error;
    }
  }

  async googleSingIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
    } catch (error) {
      this.error = error;
    }
  }

  async singOut() {
    await this.auth.signOut();
    this.user = null;
  }
}