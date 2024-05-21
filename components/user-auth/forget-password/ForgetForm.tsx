"use client";

import { useState } from "react";
import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import FormButton from "@/components/common-ui/form/FormButton";

const ForgetForm = () => {
  const [formState, setFormState] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    //TODO: add forget password logic here
  }
  return (
    <>
      <Header
        heading="Forgot Password?"
        paragraph="Enter your registered email address to reset your password"
      />
      <form onSubmit={handleSubmit} className="mb-4 px-40 pb-8 pt-6">
        <FormInput
          name="forget-password"
          id="forget-password"
          type="email"
          key="forget-password"
          labelText="Email"
          handleChange={handleChange}
          isRequired={true}
          value={formState}
          placeholder="e.g. bean@chillin.com"
        />
        <div className="px-5 mx-3">
            <FormButton action="submit" text="Email me the link"/>
        </div>
      </form>
    </>
  );
};

export default ForgetForm;
