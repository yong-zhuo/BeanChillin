"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Oauth } from "@/lib/users/OAuth";



interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
