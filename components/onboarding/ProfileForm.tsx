"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { profileFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { onboard } from "@/lib/schemas/onboardSchema";

const fields = profileFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

interface ProfileProps {
  register: UseFormRegister<onboard>;
  errors?: FieldErrors<onboard>;
}

const ProfileForm = (props: ProfileProps) => {
  const handleClick = () => document.getElementById("upload")?.click();

  return (
    <>
      <Header
        heading="Customise your profile"
        paragraph="Enter your registered email address to reset your password"
      />
      <div className="flex justify-center ">
        <input
          id="upload"
          type="file"
          accept="image/*"
          className="hidden"
        ></input>
        <button onClick={handleClick}>
          <Image
            src="/hi.png"
            alt="Profile Picture"
            height={200}
            width={250}
            className="aspect-square rounded-full object-cover"
          />
        </button>
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
