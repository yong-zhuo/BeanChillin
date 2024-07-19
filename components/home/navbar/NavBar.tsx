"use client";

import SearchBar from "./SearchBar";
import { useContext, useEffect, useState } from "react";
import UserAccountNav from "./UserAccountNav";
import Image from "next/image";
import { UserContext } from "../UserContext";
import Messaging from "./Messaging";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { User } from "@prisma/client";
import Notifications from "./Notifications";

const NavBar = ({ user, notifCount }: { user: User | null; notifCount: number }) => {




  return (
    <div className="fixed inset-x-0 top-0 z-[15] h-[80px] border-b-2 border-pri bg-sec py-2">
      <div className="mx-auto flex h-full items-center justify-between gap-2 px-8 sm:max-w-7xl md:max-w-full ">
        <Link href="/feed" className="h-[80px] w-fit flex items-center">
          <Image
            src="/logo/logo.svg"
            alt="Logo"
            height={80}
            width={85}
            className="transition translate-y-0 hover:-translate-y-1 "
          />
        </Link>

        <div className="w-full justify-center items-center flex">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-2 md:space-x-5 ">
          <div className="hidden sm:block">
            <Messaging />
          </div>
          <div className="hidden sm:block">
            <Notifications notifCount={notifCount} />
          </div>
          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Image
              src="/misc/loading.svg"
              alt="loading"
              height={49}
              width={49}
            />
          )}
        </div>
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default NavBar;
