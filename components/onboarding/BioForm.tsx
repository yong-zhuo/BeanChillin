"use client";

import Header from "@/components/common-ui/form/Header";
import { useState } from "react";
import { Textarea } from "../common-ui/shadcn-ui/textarea";

type bioData = {
  bio: string
}

type bioFormProps = bioData & {
  updateFields: (fields: Partial<bioData>) => void;
};

const BioForm = ({bio, updateFields}:bioFormProps) => {
  return (
    <>
      <Header
        heading="2. Tell us about yourself"
        paragraph="Add a short description of yourself"
      />
      <label className="text-md font-semibold text-black" htmlFor="bio">
        Your Bio
      </label>
      <Textarea
        className="resize-none"
        name="bio"
        placeholder="Add your bio here"
        onChange={e => updateFields({bio:e.target.value})}
        value={bio}
      />
      <p className="text-sm text-muted-foreground">
        Your bio will be added to your profile.
      </p>
    </>
  );
};

export default BioForm;
