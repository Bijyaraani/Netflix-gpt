import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import {Logo, SUPPORTED_LANGUAGES} from "../Utils/constants"
import { toggleGptSearchView } from "../Utils/gptSlice";
import lang from "../Utils/langaugeConstants";
import { changeLanguage } from "../Utils/configSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleGPTsearchClick = () => {
  dispatch(toggleGptSearchView());
    
  }

  const handleLanguageChange = (e) => {
   dispatch(changeLanguage(e.target.value));
 
  }
  
  return (
    <div className=" absolute w-screen px-8 py-2 bg-gradient-to-b  from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={Logo}
        alt="logo"
      />

      {user && (
        <div className="flex p-2">
          {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}> 
            
              {SUPPORTED_LANGUAGES.map((lang)=> (<option key ={lang.identifier} value ={lang.identifier} > {lang.name}
                </option>
))}
          </select>)}
          <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGPTsearchClick}> 
          
          {showGptSearch ? "GPT Search" : "Home"}
           </button>
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
