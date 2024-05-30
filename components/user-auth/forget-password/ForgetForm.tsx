"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import Button from "@/components/common-ui/button/Button";
import { type forget, forgetSchema } from "@/lib/schemas/forgetSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { sendReq } from "@/lib/mailing/SendRequest";
import { useState } from "react";
import mailAuth from "@/lib/mailing/mailAuth";

//forget-password fields to be mapped
const fields = forgetFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const ForgetForm = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //to use shadcn-ui toast
  const { toast } = useToast();

  //zod validation for forget-password
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forget>({ resolver: zodResolver(forgetSchema) });

  //submit handler for forget-password
  const onSubmit: SubmitHandler<forget> = async (data): Promise<void> => {
    setIsLoading(true);
    //send request for resetting password
    try {
      await mailAuth(data);
      sendReq(data);
    } catch (e: any) {
      console.log(e);
      toast({
        variant: "destructive",
        title: `Error sending reset link`,
        description: `${e.message}`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      setIsLoading(false);
    }
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
            state={isLoading}
            height={20}
            width={20}
          />
        </div>
      </form>
    </>
  );
};

export default ForgetForm;
