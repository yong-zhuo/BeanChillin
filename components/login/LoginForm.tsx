'use client'

import FormInput from "../form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "../form/Header";
import Link from "next/link";
import FormButton from "../form/FormButton";

const fields = loginFields;

const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {};

const LoginForm = () => {
  

  return (
    <div className="h-full min-h-screen w-full bg-[url('/patterns/pattern-light.png')]">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Sign up now"
        linkUrl="/register"
      />

      <form className="mb-4 px-40 pb-8 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            value={""}
            labelText={field.labelText}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}

        <div className="flex justify-end text-sm -mt-5">
          <Link
            href="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>

        <FormButton handleSubmit={handleSubmit} text="Sign In" action="submit"/>
      </form>
    </div>
  );
};

export default LoginForm;
