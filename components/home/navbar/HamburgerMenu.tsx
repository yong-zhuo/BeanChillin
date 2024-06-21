"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common-ui/shadcn-ui/dropdown-menu";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { Card, CardContent } from "@/components/common-ui/shadcn-ui/card";
import Button from "@/components/common-ui/button/Button";
import { tabsButton } from "@/constants/tabsContent";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";

const HamburgerMenu = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="relative block md:hidden">
      <div className="absolute -bottom-6 -left-3 ">
        <Hamburger
          toggle={setOpen}
          toggled={isOpen}
          color="#4D869C"
          size={27}
        />

        {isOpen && (
          <Card className="fixed right-2 top-14 ">
            <CardContent className="mb-0 mt-2 p-0">
              {tabsButton.map((tab) => (
                <>
                  <Button
                    key={tab.alt}
                    action="button"
                    addClass="bg-transparent hover:bg-sec gap-4 justify-start m-0 font-semibold text-md"
                    text={tab.text}
                    height={20}
                    width={20}
                    orientation="left"
                    src={tab.src}
                    alt={tab.alt}
                    handleClick={() => router.push(tab.url)}
                  />
                  <Separator />
                </>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
