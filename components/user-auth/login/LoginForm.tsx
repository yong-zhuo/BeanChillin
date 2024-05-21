'use client'

import FormInput from "@/components/common-ui/form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import Link from "next/link";
import FormButton from "@/components/common-ui/form/FormButton";
import { useState } from "react";
import { LoginUser } from "../users/LoginUser";
import { useRouter } from "next/navigation";
import { fieldState } from "@/types/formFieldsState";
const fields = loginFields;

let fieldsState: fieldState = {};
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
      const isAuth = await LoginUser(formData);
      if (!isAuth) {
        throw new Error("Invalid login! Please check your email or password!");
      }
      router.push('/home');
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
            href="/forget-password"
            className="font-medium text-primary hover:underline"
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="py-3 px-5 mx-3">
          <FormButton text="Sign In" action="submit" />
        </div>
      </form>
    </>

  );
};

export default LoginForm;
