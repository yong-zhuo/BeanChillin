"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import { profileFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { useState } from "react";
import Image from "next/image";

const fields = profileFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const ProfileForm = () => {
  const [profileState, setProfileState] = useState(fieldsState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfileState({ ...setProfileState, [e.target.name]: e.target.value });

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
              handleChange={handleChange}
              value={profileState[field.id]}
              labelText={field.labelText}
              name={field.name}
              id={field.id}
              type={field.type}
              isRequired={field.isRequired}
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
