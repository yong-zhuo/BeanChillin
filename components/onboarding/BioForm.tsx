"use client";

import Header from "@/components/common-ui/form/Header";
import { Textarea } from "../common-ui/shadcn-ui/textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { type onboard } from "@/lib/schemas/onboardSchema";

interface BioProps {
  register: UseFormRegister<onboard>;
  errors?: FieldErrors<onboard>;
}

const BioForm = (props: BioProps) => {
  const errorMessage = props.errors && props.errors["bio"]?.message;

  return (
    <>
      <Header
        heading="Tell us about yourself"
        paragraph="Add a short description of yourself"
      />
      <div className="flex justify-between">
        <label className="text-md font-semibold text-black" htmlFor="bio">
          Your Bio
        </label>
        {errorMessage && (
          <p className="text-sm text-red-400 ">{errorMessage}</p>
        )}
      </div>
      <Textarea
        className="resize-none"
        placeholder="Add your bio here"
        {...(props.register && props.register("bio"))}
      />
      <p className="text-sm text-muted-foreground">
        Your bio will be added to your profile.
      </p>
    </>
  );
};

export default BioForm;
