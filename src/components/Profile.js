import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="h-screen text-[white] bg-black">
      <Header isProfile={true} />
      <div className="flex flex-col w-1/2 ml-auto mr-auto pt-[8%] max-w-[800px]">
        {/* "flex flex-col ml-auto w-[50%] max-w-[800px] pt-8" */}
        {/* "text-5xl font-normal border-b border-gray-700 mb-5" */}
        <h1 className="text-[60px] font-normal border-b-[1px_solid_#282c2d] mb-[20px]">
          My Profile
        </h1>
        <div className="flex">
          {user && (
            <>
              <img src={user.photoURL} alt="usericon" className="h-[100px] " />
              <div className="text-[white] ml-[25px] flex-[1]">
                <h2 className="bg-gray-500 p-1 text-md pl-5" >{user.email}</h2>
                <div className="mt-[20px]">
                  <h3 className="pb-2.5 border-b-[#282c2d] border-b border-solid">Plans</h3>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                    onClick={() => auth.signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
