"use client";

import { useState } from "react";
import { signupFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import FormButton from "@/components/common-ui/form/FormButton";
import FormInput from "@/components/common-ui/form/FormInput";
import { fieldState } from "@/types/formFieldsState";

const fields = signupFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const SignUpForm = () => {
  const [signUpState, setSignUpState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpState({ ...signUpState, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: Add createAccount upon submit

    //TODO: Add logic to check if password and confirm password is the same
  };
  return (
    <>
      <Header
        heading="Create an account"
        paragraph="Already have an account? "
        linkName="Login Now"
        linkUrl="/login"
      />
      <form onSubmit={handleSubmit} className="mb-4 px-40 pb-8 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            handleChange={handleChange}
            value={signUpState[field.id]}
            labelText={field.labelText}
            name={field.name}
            id={field.id}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          ></FormInput>
        ))}
        <div className="mx-3 px-5 py-1">
          <FormButton
            text="Create Account"
            action="submit"
            addClass=" text-white bg-primary hover:bg-slate-400"
          />
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
