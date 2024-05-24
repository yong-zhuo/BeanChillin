"use client";

import { useState } from "react";
import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import Button from "@/components/common-ui/button/Button";

const ForgetForm = () => {
  const [formState, setFormState] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    //TODO: add forget password logic here
  };
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
        <div className="mx-3 px-5">
          <Button action="submit" text="Email me the link" addClass=" text-white bg-primary hover:bg-slate-400" />
        </div>
      </form>
    </>
  );
};

export default ForgetForm;
