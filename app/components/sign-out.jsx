"use client";
import { signOut } from "next-auth/react";
const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-white hover:bg-blue-100 text-blue-500 font-semibold py-1 px-4 rounded"
    >
      Sign out
    </button>
  );
};

export default SignOut;
