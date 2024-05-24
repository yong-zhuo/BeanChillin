"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import Link from "next/link";
import Button from "@/components/common-ui/button/Button";
import { useState } from "react";
import { LoginUser } from "../../../lib/users/LoginUser";
import { useRouter } from "next/navigation";
import { fieldState } from "@/types/formFieldsState";
import GoogleButton from "../common-auth-ui/GoogleButton";
import Divider from "@/components/common-ui/misc/Divider";
import { useSession, signIn } from "next-auth/react";
import Button from "@/components/common-ui/button/Button";
const fields = loginFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const LoginForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/home");
  }
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
      const isAuth = await LoginUser(formData);
      const email = formData.get("email");
      if (!isAuth) {
        throw new Error("Invalid login! Please check your email or password!");
      }
      router.push("/home");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Sign up now"
        linkUrl="/register"
        logo
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

        <div className="-mt-5 flex justify-end text-sm sm:text-xs">
          <Link
            href="/forget-password"
            className="font-medium text-pri hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="mx-3 my-3 px-5">
          <Button
            text="Sign In"
            action="submit"
            addClass="text-white bg-pri hover:bg-slate-400"
          />
        </div>
        <Divider text="or" borderColor="border-pri" textColor="pri" />
      </form>
      <div className="-pt-6 -mt-10 mb-4 px-40 pb-8">
        <div className="-py-2 mx-3 px-5">
          <GoogleButton />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
