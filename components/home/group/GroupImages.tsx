import React from "react";
import Image from "next/image";
import Button from "@/components/common-ui/button/Button";
import { UseFormSetValue } from "react-hook-form";
import { createGroup } from "@/lib/schemas/createGroupSchema";
import GroupAvatar from "./GroupAvatar";
import { AspectRatio } from "@/components/common-ui/shadcn-ui/aspect-ratio";
import { Separator } from "@/components/common-ui/shadcn-ui/separator";

interface GroupImagesProp {
  picture: string;
  banner: string;
  setPicture: (url: string) => void;
  setBanner: (url: string) => void;
  setValue: UseFormSetValue<createGroup>;
}

const GroupImages = (props: GroupImagesProp) => {
  const handlePicture = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      props.setPicture(URL.createObjectURL(file));
      props.setValue("picture", file);
    }
  };

  const handleBanner = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      props.setBanner(URL.createObjectURL(file));
      props.setValue("banner", file);
    }
  };

  return (
    <div>
      <div className="relative mb-7 flex flex-col justify-center">
        <p className="text-md text-black-700 block font-bold sm:text-base md:text-sm">
          Group Banner
        </p>
        <Separator className="bg-pri mb-2" />
        <div className="w-full">
          <AspectRatio ratio={3 / 1}>
            <Image
              src={props.banner}
              alt="Banner"
              fill
              className="rounded-md border-2 border-pri object-cover"
            />
          </AspectRatio>
          <div className="absolute -bottom-3 -right-3 flex flex-col-reverse 2mxl:-bottom-3 2mxl:-right-3 3mxl:-bottom-3 3mxl:-right-3">
            <input
              type="file"
              accept="image/*"
              id="banner"
              onChange={handleBanner}
              className="hidden"
            />
            <Button
              addClass="bg-sec text-sec hover:bg-white border-2 border-pri items-center justify-center"
              handleClick={() => document.getElementById("banner")?.click()}
              isCircular
              src="/profile/camera.svg"
              alt="Edit Profile Picture"
              width={50}
              height={40}
              orientation="left"
              action="button"
            />
          </div>
        </div>
      </div>
      <div className="relative mb-7 flex flex-col justify-center">
        <p className="text-md text-black-700  block font-bold sm:text-base md:text-sm">
          Group Picture
        </p>
        <Separator className="bg-pri mb-2" />
        <div className=" w-full flex justify-center items-center">
          <GroupAvatar
            group
            img={props.picture}
            className="h-36 w-36 rounded-lg border-2 border-pri xl:h-36 xl:w-36"
          />
          <div className="absolute -bottom-2 right-24 flex flex-col-reverse">
            <input
              type="file"
              accept="image/*"
              id="Picture"
              onChange={handlePicture}
              className="hidden"
            />
            <Button
              addClass="bg-sec text-sec hover:bg-white border-2 border-pri items-center justify-center"
              handleClick={() => document.getElementById("Picture")?.click()}
              isCircular
              src="/profile/camera.svg"
              alt="Edit Group Picture"
              width={50}
              height={40}
              orientation="left"
              action="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupImages;
