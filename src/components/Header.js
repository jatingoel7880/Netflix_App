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

const Header = ({ isProfile, isCategory,isPlayComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleGptSearchClick = () => {
    dispatch(toogleGptsearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleHomePageClick = () => {
    dispatch(clearGptMovieResult());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
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
        if (window.location.pathname === "/profile") {
          navigate("/profile");
        } else if (window.location.pathname.startsWith("/category/")) {
          navigate(window.location.pathname);
        } else if (window.location.pathname.startsWith("/play/")) {
          navigate(window.location.pathname);
        } else {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed w-screen px-8 py-2 bg-gradient-to-b from-black/90 to-transparent z-50 flex justify-between items-center">
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <img className="w-32" src={LOGO} alt="Netflix Logo" />
      </Link>
      
      {user && (
        <div className="flex items-center gap-4">
          {!isProfile && showGptSearch && (
            <select
              className="h-10 px-4 bg-gray-800/90 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 transition-all"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {!isProfile && !isCategory && (
            <button
              onClick={() => {
                handleGptSearchClick();
                handleHomePageClick();
              }}
              className="px-6 py-2 text-white bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors duration-200 shadow-lg"
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
          )}
          
          <div className="relative" ref={dropdownRef}>
            <img
              className="w-10 h-10 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/50 transition-all"
              src={user?.photoURL}
              alt="User Profile"
              onClick={handleDropdownClick}
            />
            {isDropdownVisible && (
              <div className="absolute top-12 right-0 z-50">
                <DropDown />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
