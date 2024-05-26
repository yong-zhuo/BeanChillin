"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import Button from "@/components/common-ui/button/Button";
import { type forget, forgetSchema } from "@/lib/schemas/forgetSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";

//forget-password fields to be mapped
const fields = forgetFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const ForgetForm = () => {
  //zod validation for forget-password
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forget>({ resolver: zodResolver(forgetSchema) });

  const onSubmit: SubmitHandler<forget> = (data): void => {
    //TODO: add forget password logic here
  };
  return (
    <>
      <Header
        heading="Forgot Password?"
        paragraph="Enter your registered email address to reset your password"
        logo
      />
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 px-40 pb-8 pt-6">
        {fields.map((field) => (
          <FormInput
            key={field.id}
            labelText={field.labelText}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            forRegister
            name={field.name as keyof forget}
            error={errors[field.name as keyof forget]}
          />
        ))}

        <div className="mx-3 px-5">
          <Button
            action="submit"
            text="Email me the link"
            addClass=" text-white bg-pri hover:bg-slate-400"
          />
        </div>
      </form>
    </>
  );
};

export default ForgetForm;
