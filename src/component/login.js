import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Login extends Component {
  constructor() {
    super();
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    user: null
  };

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      console.log("entre aqui");
      if (user) {
        // User is signed in.
        this.setState({ user });
        console.log("el usuario es", user);
      } else {
        // No user is signed in.
        this.setState({ user: null });
        console.log("No existe usuario", user);
      }
    });
  }

  handleLogout(e) {
    e.preventDefault();
    firebaseApp
      .auth()
      .signOut()
      .then(function() {
        console.log("Logout OK");
      })
      .catch(function(error) {
        console.log("Logout Error");
        // An error happened.
      });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log("USUARIO LOGUEADO", result.user))
      .catch(error => console.log("ERROR", error.message));
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user ? (
          <p>Hello, {user.displayName}</p>
        ) : (
          <p>Please, sign in Google</p>
        )}
        {user ? (
          <button onClick={this.handleLogout}>Sign out</button>
        ) : (
          <button onClick={this.handleAuth}> Sign in with Google</button>
        )}
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);
