"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/common-ui/shadcn-ui/commandbox/command";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Group, Prisma, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import GroupAvatar from "../group/GroupAvatar";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import Link from "next/link";
import debounce from "lodash.debounce";

// SearchBar Component
const SearchBar = () => {
  type UserResult = User & { _count: Prisma.UserCountOutputType };
  type GroupResult = Group & { _count: Prisma.GroupCountOutputType };

  const [input, setInput] = useState("");

  const request = debounce(async () => {
    await fetchResults();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [groupResults, setGroupResults] = useState<GroupResult[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const { toast } = useToast();

  //when user clicks outside the searchbar, searchbar input will be cleared
  useClickOutside(commandRef, () => {
    setInput("");
  });

  const fetchResults = async () => {
    if (!input) {
      setUserResults([]);
      setGroupResults([]);
      return;
    }

    setIsFetching(true);

    

    try {
      const response = await fetch(`/api/search?p=${input}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      
      });
      console.log(response.status);
      
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      } else {
        const data = await response.json();
        
        
        setGroupResults(data[0] as GroupResult[]);
        setUserResults(data[1] as UserResult[]);
        console.log(groupResults);
        setIsFetching(false);
        setIsFetched(true);
      }
    } catch (error) {
      setUserResults([]);
      setGroupResults([]);
      toast({
        title: "Error",
        description: "Failed to fetch search results",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setInput("");
  }, [pathname]);

  useEffect(() => {
    if (input) {
      debounceRequest();
    }
  }, [input, debounceRequest]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        value={input}
        onValueChange={(value) => {
          setInput(value);
          debounceRequest();
        }}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search for groups or users"
      />

      
        {input.length > 0 && (
          <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
            {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
            {(groupResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Groups">
                
                  {groupResults?.map((group) => (
                    <CommandItem
                    onSelect={(e) => {
                      router.push(`/groups/${group.name}`);
                      router.refresh();
                    }}
                      key={group.id}
                      value={group.name as string}
                      className="cursor-pointer"
                    >
                      <GroupAvatar
                        className="mr-2 h-12 w-12 aspect-square border-2 border-pri rounded-lg"
                        group={true}
                        img={group.picture as string}
                      />
                      <Link href={`/groups/${group.name}`}>{group.name}</Link>
                    </CommandItem>
                  ))}
                
              </CommandGroup>
            ) : null}
            <CommandSeparator />
            {(userResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Users">
                
                  {userResults?.map((user) => (
                    <CommandItem
                      onSelect={(e) => {
                        router.push(`/profile/${user.id}`);
                        router.refresh();
                      }}
                      key={user.id}
                      value={user.name as string}
                      className="cursor-pointer "
                    >
                      <UserAvatar
                        className="mr-2 h-12 w-12 border-2 border-pri"
                        user={{
                          name: user.name || null,
                          imageUrl: user.imageUrl || null,
                        }}
                      />
                      <Link href={`/profile/${user.id}`}>{user.name}</Link>
                    </CommandItem>
                  ))}
                
              </CommandGroup>
            ) : null}
          </CommandList>
        )}
      
    </Command>
  );
};

export default SearchBar;
