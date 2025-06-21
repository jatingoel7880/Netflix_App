import { useRef, useState } from "react";
import Header from "./Header";
import CheckValidData from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"; //getAuth in this i removed b/c i defined in the firebase file to not call and write const auth=getAuth() everytime.
//so used at one place and exported from there and import in the file where ever it is requiured.
import { auth } from "../utils/firebase"; //imported from firebase file
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACK_LOGO, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null); //it will a reference
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data

    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = CheckValidData(email.current.value, password.current.value);
    // console.log(message);
    setErrorMessage(message);

    if (message) return;

    //create a new user
    //Signin/ SignUp Logic
    if (!isSignInForm) {
      //SignUp Logic
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
            photoURL: USER_AVATAR,
          })
            .then(() => {
              //dispatching an action to setup the store b/c usernname and photo is not getting update
              //so updating the store by dispatching the action
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // Profile updated!
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          // console.log(user);
          //if the singup is success dispatch an action from here. and append this user object/info to my redux store
          //but not write that part here b/c have to write the dispatch part for signIn also. Instead of using dispatching action again and again we will
          //use a utility function provided by the firebase to use onAuthStateChange which used in the Body component.
          //onAuthStateChange will be called on signIn, signOut, signUp and on authentication state change.
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
         // console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // console.log(errorCode)
          // console.log(errorMessage)
          // setErrorMessage(errorCode + "-" + errorMessage);
          setErrorMessage("Invalid email or password");
          // console.log(errorMessage)
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      {/* Background image with blur and overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={BACK_LOGO}
          alt="logo"
          className="w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70" />
      </div>
      {/* Centered Form */}
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative z-10 w-full max-w-sm mx-auto p-6 bg-black bg-opacity-85 rounded-xl shadow-2xl flex flex-col gap-4 animate-fade-in"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
        >
          <h1 
            className="font-extrabold text-4xl text-center py-2 tracking-tight text-red-600">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              className="p-4 my-1 w-full bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-sm text-white"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
            />
          )}

          <input
            ref={email}
            className="p-4 my-1 w-full bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-sm text-white"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
          />
          <input
            ref={password}
            className="p-4 my-1 w-full bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-sm text-white"
            type="password"
            placeholder="Password"
            autoComplete={isSignInForm ? "current-password" : "new-password"}
          />
          <div className="flex justify-between items-center text-sm">
            <p className="text-red-500 font-semibold py-1 min-h-[24px]">{errorMessage}</p>
            <button type="button" className="text-gray-300 hover:text-white transition-colors duration-200 underline underline-offset-2" disabled>
              Forgot password?
            </button>
          </div>
          <button
            className="p-4 my-2 bg-red-600 hover:bg-red-700 w-full rounded-lg font-bold text-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="mx-2 text-gray-400 text-xs">or</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>
          {/* Placeholder for social login */}
          <button
            type="button"
            className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 font-medium hover:bg-gray-600 transition-all text-sm cursor-not-allowed opacity-60"
            disabled
          >
            Social login coming soon
          </button>
          <p className="py-2 text-center text-gray-300">
            {isSignInForm ? (
              <>
                New to Netflix?{' '}
                <span
                  className="text-red-400 hover:underline cursor-pointer"
                  onClick={toggleSignInForm}
                >
                  Sign Up Now
                </span>
              </>
            ) : (
              <>
                Already Registered?{' '}
                <span
                  className="text-red-400 hover:underline cursor-pointer"
                  onClick={toggleSignInForm}
                >
                  Sign In Now
                </span>
              </>
            )}
          </p>
        </form>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default Login;
