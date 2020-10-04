import { Injectable, NgZone } from '@angular/core';
import { User } from "../../models/user/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //Save user data

  constructor(
    public afs: AngularFirestore,     //inject Firestore service
    public afAuth: AngularFireAuth,   //inject Firebase auth service
    public router: Router, 
    public ngZone: NgZone,            //NgZone service that eliminates external scope warning 
    public toastr: ToastrService      //Alertas Toastr
  ) { 
     //Saves user data in local storage when signing in and null when logout
     this.afAuth.authState.subscribe(user => {
       if(user){
         this.userData = user;
         localStorage.setItem('user', JSON.stringify(this.userData));
         JSON.parse(localStorage.getItem('user'));
       }
       else{
         localStorage.setItem('user', null);
         JSON.parse(localStorage.getItem('user'));
       }
     })
   }

  //  sign-in with email-password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
       // window.alert("Por favor revisar credenciales")
         this.toastr.error(error.message);
      })
  }

  //Sign-up with email-password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* call function SendVerificaitonMail() when a new user signs and returns to the function*/
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        this.toastr.error(error.message);
      })
  }

  SendVerificationMail() {
    // return this.afAuth.auth.currentUser.then(u => u.sendEmailVerification())
    // .then(() => {
    // this.router.navigate(['verify-email-address']);
    // })

    return this.afAuth.auth.currentUser.sendEmailVerification().then(function() {

    })
  }

  // Restart forgotten password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  //returns true when the user is connected and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : true;
  }

  // Sign-in using Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Sign-in using Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
  registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
  proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
 
   //Authentication logic for executing any auth provider 
   AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // desconectar
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}
