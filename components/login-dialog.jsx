"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import github from "@/app/assets/Icon/github.svg";
import google from "@/app/assets/Icon/google.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";

function LoginDialog({ loginproviders }) {
  console.log(loginproviders);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md">
          Get started for free
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Login</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-6">
              
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
