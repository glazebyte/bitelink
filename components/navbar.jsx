"use client";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./theme-toogle";
import Logo from "@/app/assets/Logo.svg";
import { Poppins } from "next/font/google";
import LoginDialog from "./login-dialog";
import { Button } from "./ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const Navbar = () => {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo  */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <span>
              <Image
                src={Logo}
                width="32"
                alt="N"
                height="32"
                className="w-8"
              />
            </span>
            <span className={poppins.className}>BiteLink</span>
          </span>
        </Link>

        {/* get started  */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <div className="hidden mr-3 lg:flex nav__item">
            <LoginDialog>
              <Button className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
                Get Started
              </Button>
            </LoginDialog>
          </div>
          <ModeToggle />
        </div>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
