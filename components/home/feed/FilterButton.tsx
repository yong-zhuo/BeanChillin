import { Button } from "@/components/common-ui/shadcn-ui/button";
import { Dialog, DialogTrigger } from "@/components/common-ui/shadcn-ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common-ui/shadcn-ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/common-ui/shadcn-ui/tabs";
import React from "react";

type Props = {};

const FilterButton = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter By:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuContent>
          <Tabs orientation="horizontal">
            <TabsList>
            <TabsTrigger value="Joined Groups">Joined Groups</TabsTrigger>
            <TabsTrigger value="All Groups">All Groups</TabsTrigger>
            </TabsList>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
