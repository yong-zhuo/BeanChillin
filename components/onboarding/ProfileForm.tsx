"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { profileFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { useEffect, useState } from "react";
import Image from "next/image";

const fields = profileFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

type profileData = {
  firstName: string;
  lastName: string;
  image: string;
};

type profileFormProps = profileData & {
  updateFields: (fields: Partial<profileData>) => void;
};

const ProfileForm = ({
  firstName,
  lastName,
  image,
  updateFields,
}: profileFormProps) => {
  const [profileState, setProfileState] = useState({
    firstName,
    lastName,
    image,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileState((prevState) => ({...prevState, [e.target.name]: e.target.value }));
    updateFields({[e.target.name]: e.target.value});
    console.log(e.target.value)
  };
  
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
              name={field.name}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              forRegister={field.forRegister}
              
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
