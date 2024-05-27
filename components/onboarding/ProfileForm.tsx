"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { profileFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import Image from "next/image";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { onboard } from "@/lib/schemas/onboardSchema";
import { useState } from "react";
import Button from "../common-ui/button/Button";

//profile fields to be mapped
const fields = profileFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

interface ProfileProps {
  register: UseFormRegister<onboard>;
  errors?: FieldErrors<onboard>;
  setValue: UseFormSetValue<onboard>;
}


const ProfileForm = (props: ProfileProps) => {
  const [imageUrl, setImageUrl] = useState<string>("/profile/default.png");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      props.setValue("image", file);
    }
  }
  return (
    <>
      <Header
        heading="Customise your profile"
        paragraph="Set your name and profile picture to be displayed"
      />
      <div className="flex justify-center ">
        <Image
          src={imageUrl}
          alt="Profile Picture"
          height={200}
          width={250}
          className="aspect-square rounded-full object-cover"
        />
      </div>
      <div className="flex justify-center">
        <input
          type="file"
          accept="image/*"
          id="File"
          onChange={handleChange}
          className="hidden"
        />
        <Button
          addClass="bg-pri text-sec hover:bg-slate-500 h-[40px] w-[101px]"
          handleClick={() => document.getElementById('File')?.click()}
          text="Browse..."
        />
      </div>
      <div className="flex justify-center">
        <div className="w-3/4">
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
