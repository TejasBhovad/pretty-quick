"use client";
import { signIn } from "next-auth/react";
const SignIn = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white hover:bg-blue-100 text-blue-500 font-semibold py-1 px-4 rounded"
    >
      Sign in
    </button>
  );
};

export default SignIn;
