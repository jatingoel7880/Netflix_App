import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toogleGptsearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import DropDown from "./DropDown";
import { clearGptMovieResult } from "../utils/gptSlice";

const Header = ({ isProfile, isCategory }) => {
  const dispatch = useDispatch(); //using dispatch to dispatch an action
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    // Toggle dropdown visibility
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleGptSearchClick = () => {
    //Toggle GPT Search Page
    dispatch(toogleGptsearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };


  const handleHomePageClick = () => {
    dispatch(clearGptMovieResult()); // Dispatch the action to clear movie results
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown when clicked outside

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    //calling onAuthStateChange part b/c want to call this only once when user signin/signout.
    //in the login we created createUserWithEmailAndPassword, signInWithEmailAndPassword for signup and signin
    //but for that also need to dispatch the action so to write in both parts declaring only once at the root level
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8eIW8UaYc7fD5QyVa_Z39U07KJzGel20cRbqsURLvQ&s",
          })
        );
        // navigate("/browse");
        // Check if the component is being used in the Profile page
        // Navigate only if it's not being used in the Profile page
        if (window.location.pathname === "/profile") {
          navigate("/profile");
        } else if (window.location.pathname.startsWith("/category/")) {
          navigate(window.location.pathname);
        } else {
          navigate("/browse");
         }
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe called when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    // bg-gradient-to-b from-black
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <Link to="/">
      <img className="w-32" src={LOGO} alt="logo"/>
      </Link>
      {user && (
        <div className="flex p-1">
          {!isProfile && showGptSearch && (
            <select
              className="w-24 h-10 m-2 p-2 bg-gray-700 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
              {/* <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="sanskrit">Sanskrit</option> */}
            </select>
          )}

          {!isProfile && !isCategory && (
            <button
              // onClick={handleGptSearchClick}
              onClick={() => {
                handleGptSearchClick();
                handleHomePageClick();
              }}
              className=" p-1 text-white bg-purple-700 mx-3 my-3 rounded-lg"
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
          )}
          <div className="relative" ref={dropdownRef}>
            <img
              className="m-2 w-10 h-10 rounded-lg"
              src={user?.photoURL}
              alt="usericon"
              onClick={handleDropdownClick}
            />
            {isDropdownVisible && (
              <div className="absolute top-10 right-0">
                <DropDown />
              </div>
            )}
            {/* Render Dropdown component if isDropdownVisible is true */}
          </div>
        </div>
        /* <button onClick={handleSignOut} className="font-bold text-white">
            (Sign Out)
          </button> */
      )}
    </div>
  );
};

export default Header;
