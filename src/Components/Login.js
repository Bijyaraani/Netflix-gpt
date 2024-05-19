import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../Utils/Validate';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';




const Login = () => {

const[isSignInForm , setisSignInForm] = useState(true);
const[errorMessage , seterrorMessage] = useState(null);
const navigate = useNavigate();
const dispatch =useDispatch();

const name = useRef(null);
const email = useRef(null); // this will help us to get the reference of input box
const password = useRef(null);



const handleButtonClick = () => {

  const message = checkValidateData(email.current.value,password.current.value ,password.current.value)

  seterrorMessage(message);

  if(message) return;

  if(!isSignInForm){
    createUserWithEmailAndPassword(auth , email.current.value , password.current.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name.current.value , photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        const {uid , email , displayName , photoURL} = auth.currentUser;

        dispatch(addUser({uid: uid , email: email , displayName:displayName , photoURL:photoURL}));

        // ...
      }).catch((error) => {

        seterrorMessage(error.message);
        // An error occurred
        // ...
      });
      navigate("/browse");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      seterrorMessage(errorCode+ " - " +  errorMessage);
      // ..
    });
  } else {
    
    signInWithEmailAndPassword(auth, email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    seterrorMessage(errorCode+ " - " +  errorMessage);
  });
    }

  }

  

const toggleSignInForm = () => {

setisSignInForm(!isSignInForm);
}

return (
    <div>
<Header/>

    <div className="absolute">  
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9f46b569-aff7-4975-9b8e-3212e4637f16/453ba2a1-6138-4e3c-9a06-b66f9a2832e4/IN-en-20240415-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='logo'/>

      </div>

      <form onSubmit={(e) => e.preventDefault()}
      
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">

        <h1 className="font-bold text-3xl py-4"  > {isSignInForm ? "SignIn" : "Signup"} </h1>

        {!isSignInForm && (
        <input 
        ref = {name}
        type = "text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700" />
        )}

        <input 
        ref={email} 
        type = "text" placeholder="email address" className="p-4 my-2 w-full bg-gray-700" />
        <input 
        ref={password}
        type = "password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700"/>

        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

      
        <button className="p-6 my-4 bg-red-700 w-full" onClick = {handleButtonClick}> {isSignInForm ? "SignIn" : "Signup"} </button>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Signup now" :"Already regisetered ,sign in now"}</p>
      </form>
    </div>
  )
}

export default Login
