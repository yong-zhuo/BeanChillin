"use client";

import { signupFields } from "@/constants/formFields";
import Header from "@/components/common-ui/form/Header";
import Button from "@/components/common-ui/button/Button";
import FormInput from "@/components/common-ui/form/FormInput";
import { fieldState } from "@/types/formFieldsState";
import CreateAccount from "../../../lib/users/CreateAccount";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type signup } from "@/lib/schemas/signupSchema";
import { signIn } from "next-auth/react";

//signup fields to be mapped
const fields = signupFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const SignUpForm = () => {
  //zod validation for signup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signup>({ resolver: zodResolver(signupSchema) });

  //reroute user to onboarding page upon successful signup
  const router = useRouter();
  const onSubmit: SubmitHandler<signup> = async (data) => {
    try {
      const res = (await CreateAccount(data)) as string;
      if (res !== "ok") {
        throw new Error(res);
      }
      console.log(res);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/onboard",
      });
    } catch (e) {
      alert(e);
    }
    //TODO: #23 Email exist error handling
  };

  return (
    <>
      <Header
        heading="Create an account"
        paragraph="Already have an account? "
        linkName="Login Now"
        linkUrl="/login"
        logo
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 px-40 pb-8 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            labelText={field.labelText}
            name={field.name as keyof signup}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            forRegister={field.forRegister}
            register={register}
            error={errors[field.name as keyof signup]}
          />
        ))}
        <div className="mx-3 px-5 py-1">
          <Button
            text="Create Account"
            action="submit"
            addClass=" text-white bg-pri hover:bg-slate-400"
          />
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
