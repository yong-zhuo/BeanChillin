"use client";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import { resetFields } from "@/constants/formFields";
import { fieldState } from "@/types/formFieldsState";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { reset, resetSchema } from "@/lib/schemas/resetSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/common-ui/form/FormInput";
import { User } from "@prisma/client";

interface ResetPasswordProps {
  user: User | null;
}

function ResetPassword({ user }: ResetPasswordProps) {
  const fields = resetFields;
  let fieldsState: fieldState = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<reset>({ resolver: zodResolver(resetSchema) });

  const handleReset = async (data: reset) => {
    setIsLoading(true);
    const payload = {
      userId: user?.id,
      password: data.password,
    };

    try {
      //reset password
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error resetting password");
      } else {
        toast({
          variant: "success",
          title: `Password reset successful`,
          description: `Your password has been reset successfully.`,
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: `Error resetting password`,
        description: `Please try again later.`,
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. Click save password when you are done.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleReset)}>
        <CardContent className="">
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
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button className="rounded-lg bg-pri text-white transition hover:scale-105 hover:bg-slate-400">
            {isLoading ? (
              <div className="flex flex-row gap-0.5">
                Sending <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-row gap-0.5">Save Password</div>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ResetPassword;
