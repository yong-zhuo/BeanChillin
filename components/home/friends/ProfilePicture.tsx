'use client'
import Button from "@/components/common-ui/button/Button";
import UserAvatar from "@/components/common-ui/misc/UserAvatar";
import { onboard } from "@/lib/schemas/onboardSchema";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

type Props = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  setValue: UseFormSetValue<onboard>;
};

const ProfilePicture = (props: Props) => {
  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      props.setImageUrl(URL.createObjectURL(file));
      props.setValue("image", file);
    }
  };
  return (
    <div className=" flex w-full items-center justify-center relative">
      <UserAvatar
        user = {{name: "Random User", imageUrl: props.imageUrl}}
        className="h-36 w-36 rounded-full aspect-square border-2 border-pri xl:h-36 xl:w-36"
      />
      <div className="absolute -bottom-1 right-8 sm:right-24 flex flex-col-reverse">
        <input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleImage}
          className="hidden"
        />
        <Button
          addClass="bg-sec text-sec hover:bg-white border-2 border-pri items-center justify-center"
          handleClick={() => document.getElementById("image")?.click()}
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
  );
};

export default ProfilePicture;
