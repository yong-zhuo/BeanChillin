'use client'

import FormInput from "../form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "../form/Header";
import Link from "next/link";
import FormButton from "../form/FormButton";
import { useState } from "react";
import userAuthentication from "../users/UserAuthentication";
import { useRouter } from "next/navigation";
import { FormEvent } from 'react';
const fields = loginFields;

interface LoginFieldsState {
  [key: string]: string;
}
let fieldsState: LoginFieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const LoginForm = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState(fieldsState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('Email') as string;
      const password = formData.get('Password') as string;
      const isAuth = await userAuthentication(email, password);
      if (!isAuth) {
        throw new Error("Authentication failed");
      }
      router.push("/home");
    } catch (e) {
      console.log("unsuccessful login. Please try again!", e);
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-[url('/patterns/pattern-light.png')]">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Sign up now"
        linkUrl="/register"
      />

      <form onSubmit={handleSubmit} className="mb-4 px-40 pb-8 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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

        <FormButton text="Sign In" action="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
