import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { Photo_Avatar,Netflix_page } from "../Utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null); // this will help us to get the reference of input box
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value,
      password.current.value
    );

    seterrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: Photo_Avatar,
          })
            .then(() => {
              // Profile updated!
              
              const { uid, email, displayName, photoURL } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              // ...
            })
            .catch((error) => {
              seterrorMessage(error.message);
              // An error occurred
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          seterrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          seterrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />

      <div className="absolute">
        <img
          src={Netflix_page}
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {" "}
          {isSignInForm ? "SignIn" : "Signup"}{" "}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="email address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        />

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="p-6 my-4 bg-red-700 w-full"
          onClick={handleButtonClick}
        >
          
          {isSignInForm ? "SignIn" : "Signup"}{" "}
        </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix ? Signup now"
            : "Already regisetered ,sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
