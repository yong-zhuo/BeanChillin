"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { profileFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import Image from "next/image";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { onboard } from "@/lib/schemas/onboardSchema";
import Button from "../common-ui/button/Button";
import { User } from "lucide-react";

//profile fields to be mapped
const fields = profileFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

interface ProfileProps {
  register: UseFormRegister<onboard>;
  errors?: FieldErrors<onboard>;
  setValue: UseFormSetValue<onboard>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const ProfileForm = (props: ProfileProps) => {

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      props.setImageUrl(URL.createObjectURL(file));
      props.setValue("image", file);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="md:hidden h-12 w-12 aspect-square rounded-full mb-4 bg-pri flex items-center justify-center"><User className="text-sec"/></div>
        <Header
          heading="Customise your profile"
          paragraph="Set your name and profile picture to be displayed"
        />
      </div>
      <div className="relative flex justify-center">
        <div className="relative">
          <Image
            src={props.imageUrl}
            alt="Profile Picture"
            height={200}
            width={200}
            className="aspect-square rounded-full object-cover border-pri border-4 min-w-[150px] min-h-[150px] md:h-[160px] md:w-[160px]  2mxl:h-[220px] 2mxl:w-[220px] 3mxl:h-[300px] 3mxl:w-[300px]"
          />
          <div className="absolute bottom-1 right-1 2mxl:bottom-5 2mxl:right-3 3mxl:bottom-6 3mxl:right-5 flex flex-col-reverse">
            <input
              type="file"
              accept="image/*"
              id="File"
              onChange={handleChange}
              className="hidden"
            />
            <Button
              addClass="bg-sec text-sec hover:bg-white border-2 border-pri items-center justify-center"
              handleClick={() => document.getElementById("File")?.click()}
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

      <div className="mt-5 flex flex-col items-center justify-center">
        <div className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px] flex flex-col justify-center">
          {fields.map((field) => (
            <FormInput
              key={field.id}
              labelText={field.labelText}
              name={field.name as keyof onboard}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              forRegister={field.forRegister}
              register={props.register}
              error={props.errors && props.errors[field.name as keyof onboard]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
