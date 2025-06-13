import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DropDown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            // navigate("/");
            dispatch(removeUser());
             navigate("/");
          })
          .catch((error) => {
            // An error happened.
            navigate("/error");
          });
      };

  return (
    <div className="relative inline-block">
      <ul
        role="menu"
        data-popover="profile-menu"
        data-popover-placement="bottom"
        className="absolute right-0 mt-1 w-28 rounded-md border border-blue-gray-50 bg-black p-1 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
      >
        {/* Dropdown items */}
        <button
          role="menuitem"
          className="block w-full text-white cursor-pointer select-none items-center gap-2 px-3 py-2 text-left leading-tight outline-none transition-all  hover:bg-red-50 hover:bg-opacity-80 hover:text-red-900 focus:bg-red-50 focus:bg-opacity-80 focus:text-red-900 active:bg-red-50 active:bg-opacity-80 active:text-blue-gray-900"
          onClick={()=>navigate("/profile")}
       >
          My Profile
        </button>
        {/* <button
          role="menuitem"
          className="block w-full text-white cursor-pointer select-none items-center gap-2 px-3 py-2 text-left leading-tight outline-none transition-all  hover:bg-red-50 hover:bg-opacity-80 hover:text-red-900 focus:bg-red-50 focus:bg-opacity-80 focus:text-red-900 active:bg-red-50 active:bg-opacity-80 active:text-blue-gray-900"
        >
          Edit Profile
        </button> */}
    
        <hr className="my-2 border-blue-gray-50" role="separator" />
        <button
          role="menuitem"
          className="block w-full text-white cursor-pointer select-none items-center gap-2 px-3 py-2 text-left leading-tight outline-none transition-all hover:bg-red-50 hover:bg-opacity-80 hover:text-red-700 focus:bg-red-50 focus:bg-opacity-80 focus:text-red-900 active:bg-red-50 active:bg-opacity-80 active:text-blue-gray-900"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </ul>
    </div>
  );
};

export default DropDown;
