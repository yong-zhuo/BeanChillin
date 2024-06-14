"use client";

import { Tabs, TabsList } from "@/components/common-ui/shadcn-ui/tabs";
import {
  TabsContent,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import GroupsJoinedTab from "./GroupsJoinedTab";
import YourGroupsTab from "./YourGroupsTab";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import prisma from "@/lib/prisma";
import { Group } from "@prisma/client";

const ViewGroupTabs = () => {
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  const [yourGroups, setYourGroups] = useState<Group[]>([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchGroups = async () => {
      if (user) {
        const response = await fetch("/api/group/find-preview");
        const data = await response.json();
        setJoinedGroups(data[0]);
        setYourGroups(data[1]);
      }
    };

    fetchGroups();
  }, [user]);

  return (
    <Tabs defaultValue="Groups Joined">
      <TabsList className="grid w-full grid-cols-2 bg-white text-black shadow">
        <TabsTrigger value="Groups Joined">Groups Joined</TabsTrigger>
        <TabsTrigger value="Your Groups">Your Groups</TabsTrigger>
      </TabsList>
      <TabsContent value="Groups Joined">
        <GroupsJoinedTab groups={joinedGroups} />
      </TabsContent>
      <TabsContent value="Your Groups">
        <YourGroupsTab groups={yourGroups} />
      </TabsContent>
    </Tabs>
  );
};

export default ViewGroupTabs;
