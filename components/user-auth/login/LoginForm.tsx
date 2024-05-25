"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import { loginFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import Link from "next/link";
import Button from "@/components/common-ui/button/Button";
import { useRouter } from "next/navigation";
import { fieldState } from "@/types/formFieldsState";
import GoogleButton from "../common-auth-ui/GoogleButton";
import Divider from "@/components/common-ui/misc/Divider";
import { useSession, signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type login } from "@/lib/schemas/loginSchema";

const fields = loginFields;

let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/home");
  }

  //changed return type to fit react-hook-form
  const onSubmit: SubmitHandler<login> = async (data) => {
    
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/home",
      });
      if (!result?.ok) {
        throw new Error(result?.error?.toString());
      }
    } catch (e) {
      console.log(e);
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

      <form onSubmit={handleSubmit(onSubmit)} className="mb-5 px-40 pb-2 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            labelText={field.labelText}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            name={field.name as keyof login}
            error={errors[field.name as keyof login]}
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
