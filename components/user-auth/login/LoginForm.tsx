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
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useState } from "react";


//login fields to be mapped
const fields = loginFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  //zod validation for login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({ resolver: zodResolver(loginSchema) });

  //to use shadcn-ui toast
  const { toast } = useToast();

  //reroute user to home if session detected
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/home");
  }

  //if login credentials match, send users to home
  //else throw an error and display toast
  const onSubmit: SubmitHandler<login> = async (data) => {
    setIsLoading(true);
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
      toast({
        variant: "destructive",
        title: "Invalid email and password",
        description:
          "Please try again or register a new account if you have not done so.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 lg:mb-5 lg:px-32 lg:pb-2 lg:pt-6 "
      >
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
            className="font-medium text-pri hover:underline sm:text-base md:text-sm lg:text-sm "
          >
            Forgot your Password?
          </Link>
        </div>
        <div className="mx-3 my-3 px-5 min-w-1/2">
          <Button
            text="Sign In"
            action="submit"
            addClass="text-white bg-pri shadow-md hover:bg-slate-400 transition ease-in-out duration-300 delay-50 hover:-translate-y-1 hover:scale-110"
            state={isLoading}
            height={20}
            width={20}
          />
        </div>

        <Divider text="or" borderColor="border-pri" textColor="pri" />
      </form>
      <div className="lg:-pt-6 m-5 lg:-mt-10 lg:mb-4 lg:px-32 lg:pb-8">
        <div className="-py-2 mx-3 px-5">
          <GoogleButton />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
