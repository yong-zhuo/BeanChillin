"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import Link from "next/link";
import FormButton from "@/components/common-ui/form/FormButton";
import { useState } from "react";
import userAuthentication from "../users/UserAuthentication";
import { useRouter } from "next/navigation";
import { fieldState } from "@/types/formFieldsState";
import GoogleButton from "../common-auth-ui/GoogleButton";
import Divider from "@/components/common-ui/misc/Divider";
const fields = loginFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const LoginForm = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useState(fieldsState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("Email") as string;
      const password = formData.get("Password") as string;
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
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Sign up now"
        linkUrl="/register"
      />
      <form onSubmit={handleSubmit} className="mb-5 px-40 pb-2 pt-6">
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
        <div className="-mt-5 flex justify-end text-sm">
          <Link
            href="/forget-password"
            className="font-medium text-primary hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="mx-3 px-5 my-3">
          <FormButton
            text="Sign In"
            action="submit"
            addClass="text-white bg-primary hover:bg-slate-400"
          />
        </div>
        <Divider text="or" color="primary" textColor="primary"/>
      </form>
      <div className="mb-4 px-40 pb-8 -pt-6 -mt-10">
        <div className="mx-3 px-5 -py-2">
          <GoogleButton />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
