"use client";

import Header from "@/components/common-ui/form/Header";
import { Textarea } from "../common-ui/shadcn-ui/textarea";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { type onboard } from "@/lib/schemas/onboardSchema";
import { ListPlus } from "lucide-react";

interface BioProps {
  register: UseFormRegister<onboard>;
  errors?: FieldErrors<onboard>;
}

const BioForm = (props: BioProps) => {
  const errorMessage = props.errors && props.errors["bio"]?.message;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex aspect-square h-12 w-12 items-center justify-center rounded-full bg-pri md:hidden">
        <ListPlus className="text-sec" />
      </div>
      <Header
        heading="Tell us about yourself"
        paragraph="Add a short description of yourself"
      />
      <div className="w-4/5 min-w-[400px] flex flex-col justify-center items-center sm:block ">
        <label
          className="text-md flex flex-row justify-between font-semibold text-black "
          htmlFor="bio"
        >
          Your Bio
          {errorMessage && (
            <p className="text-sm text-red-400 ">{errorMessage}</p>
          )}
        </label>
        <div className="flex justify-start items-start">
          <Textarea
            className="resize-none shadow h-[150px] lg:h-[180px] w-[250px]  sm:w-[75vh]"
            placeholder="Add your bio here"
            {...(props.register && props.register("bio"))}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Your bio will be added to your profile.
        </p>
      </div>
    </div>
  );
};

export default BioForm;
