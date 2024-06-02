"use client";


import SearchBar from "./SearchBar";
import { User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import { UserContext } from "../UserContext";

const NavBar = () => {
  //using useEffect to get user data from Prisma base on session email
  //since session only has the correct email
  //TODO: Refactor code to use something other than useEffect

  const {user} = useContext(UserContext);
  

  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-fit border-b-2 border-pri bg-sec py-2">
      <div className="px-8 mx-auto flex h-full items-center justify-between gap-2 sm:max-w-7xl md:max-w-full ">
        <Image src="logo/logo.svg" alt="Logo" height={80} width={85} />

        <SearchBar />
       
        {user ? <UserAccountNav user={user} /> : <Image src="/misc/loading.svg" alt="loading" height={50} width={50} /> }
      </div>
    </div>
  );
};

export default NavBar;
