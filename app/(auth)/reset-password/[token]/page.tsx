"use client";

import FormInput from "@/components/common-ui/form/FormInput";
import Header from "@/components/common-ui/form/Header";
import Button from "@/components/common-ui/button/Button";
import { type reset, resetSchema } from "@/lib/schemas/resetSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { resetPassword } from "@/lib/mailing/ResetPassword";



//reset password fields to be mapped
const fields = resetFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const ResetForm = ({ params }: { params: { token: string } }) => {
  //to use shadcn-ui toast
  const { toast } = useToast();

  //zod validation for forget-password
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<reset>({ resolver: zodResolver(resetSchema) });

  //submit handler for forget-password
  const onSubmit: SubmitHandler<reset> = async (data): Promise<void> => {
    //reset password
    try {
      await resetPassword(params.token, data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: `Error sending reset link`,
          description: `${e.message}`,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    }
  };
  return (
    <>
      <Header
        heading="Reset Password"
        paragraph="Enter your new Password"
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
            name={field.name as keyof reset}
            error={errors[field.name as keyof reset]}
          />
        ))}

        <div className="mx-3 px-5">
          <Button
            action="submit"
            text="Reset Password"
            addClass=" text-white bg-pri hover:bg-slate-400"
          />
        </div>
      </form>
    </>
  );
};

export default ResetForm;
