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
    <div>
      <Header />
      <div className="absolute">
        <img src={BACK_LOGO} alt="logo" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            className="p-4 my-2 w-full bg-gray-800 rounded-lg "
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          ref={email} //this email is reference to the input box
          className="p-4 my-2 w-full bg-gray-800 rounded-lg"
          type="text"
          placeholder="Email Address"
        />
        <input
          ref={password} //this passsword is reference to the input box
          className="p-4 my-2 w-full bg-gray-800 rounded-lg "
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

        <button
          className="p-4 my-4 bg-red-600 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {" "}
          {isSignInForm
            ? "New to Netflix! Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
        {/* <p className="py-4 curs or-pointer"  onClick={toggleSignInForm}>New to Netflix! Sign Up Now</p> */}
      </form>
    </div>
  );
};

export default Login;
