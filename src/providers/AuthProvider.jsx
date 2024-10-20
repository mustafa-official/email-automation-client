import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  //create user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout user
  const logOutUser = async () => {
    setLoading(true);
    return signOut(auth);
  };
  //update profile
  const updateProfileInfo = (userName, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photo,
    });
  };
  //login with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      setLoading(false);
      setUser(CurrentUser);
      // if (CurrentUser) {
      //   getToken(CurrentUser?.email);
      // }
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    registerUser,
    loginUser,
    user,
    logOutUser,
    updateProfileInfo,
    googleLogin,
    loading,
    setLoading,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
AuthProvider.propTypes = {
  children: PropTypes.node,
};
