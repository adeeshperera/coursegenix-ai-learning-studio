"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

const SignInButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google");
      }}
      className="flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </Button>
  );
};

export default SignInButton;
