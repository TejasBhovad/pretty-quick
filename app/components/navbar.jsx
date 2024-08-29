"use client";
import { useSession } from "next-auth/react";
import React from "react";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import Link from "next/link";
const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="absolute h-12 w-full bg-blue-900 backdrop-blur-sm bg-opacity-50">
      <div className="flex justify-between items-center h-full px-4">
        <Link href="/">
          <span className="text-white text-lg font-medium font-mono">Home</span>
        </Link>
        {status === "loading" && (
          <button
            className="bg-white hover:bg-blue-100 text-blue-500 font-semibold py-1 px-4 rounded text-sm sm:text-[16px] disabled:opacity-50 transition-colors"
            disabled
          >
            loading
          </button>
        )}
        {session && status === "authenticated" && (
          <>
            {/* <span>Welcome, {session.user.name}</span> */}
            <SignOut />
          </>
        )}
        {!session && status !== "loading" && <SignIn />}
      </div>
    </nav>
  );
};

export default Navbar;
