import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import {Logo} from "../Utils/constants"

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {    //it will keep the status of user auth , if user is logged in or logged out , it is a kind of event listenener
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        navigate("/browse");

        // ...
      } else {
        dispatch(removeUser());

        navigate("/");

        // User is signed out
        // ...
      }
    });

    return () => unsubscribed();//it unsubscribed it when componenets unmounts

  }, []);


  
  return (
    <div className=" absolute w-screen px-8 py-2 bg-gradient-to-b  from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={Logo}
        alt="logo"
      />

      {user && (
        <div className="flex p-2">
          <img className=" w-12 h-12" alt="usericon" src={user?.photoURL} />

          <button onClick={handleSignout} className="font-bold text-white ">
            ( Signout)
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
