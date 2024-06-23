"use client";
import FormInput from "@/components/common-ui/form/FormInput";
import { Button } from "@/components/common-ui/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common-ui/shadcn-ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common-ui/shadcn-ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common-ui/shadcn-ui/tabs";
import {profileFields } from "@/constants/formFields";
import { onboard, onboardSchema } from "@/lib/schemas/onboardSchema";
import { fieldState } from "@/types/formFieldsState";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Settings } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import cloudinaryUpload from "@/lib/cloudinary/CloudinaryUpload";
import { onboardPush } from "@/lib/users/OnboardPush";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";
import ProfilePicture from "./ProfilePicture";
import { User } from "@prisma/client";
import ResetPassword from "./ResetPassword";

const fields = profileFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const SettingsButton = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(
    user?.imageUrl || "/profile/avatar.svg",
  );

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<onboard>({
    defaultValues: {
      firstName: user?.name?.split(" ")[0],
      lastName: user?.name?.split(" ")[1],
      image: undefined,
      bio: user?.bio as string,
    },
    resolver: zodResolver(onboardSchema),
  });

  const onSubmit: SubmitHandler<onboard> = async (data) => {
    setIsLoading(true);

    try {
      console.log(user?.email);
      console.log(data);
      //Tidy code
      const obj = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        email: user?.email,
        isOnboard: true,
      };

      await Promise.all([
        cloudinaryUpload(data.image, {
          email: user?.email as string,
          public_id: user?.id,
        }),
        onboardPush(obj),
      ]);

      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "An error occured while updating your profile.",
        variant: "destructive",
      });
    } finally {
      reset();
      setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Tabs defaultValue="account">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex w-fit flex-row items-center justify-center gap-1 bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-600">
              Settings
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-h-[90vh] w-[300px] overflow-y-auto sm:w-[800px] sm:max-w-[425px] "
            onInteractOutside={(e) => {
              if (isLoading) e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit your profile</DialogTitle>
              <DialogDescription>
                Set your new details and click change once you are done.
              </DialogDescription>
            </DialogHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click change when you are
                    done.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="">
                    <ProfilePicture
                      imageUrl={imageUrl}
                      setValue={setValue}
                      setImageUrl={setImageUrl}
                    />
                    {fields.map((field) => (
                      <FormInput
                        key={field.id}
                        labelText={field.labelText}
                        name={field.name as keyof onboard}
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        forRegister={field.forRegister}
                        register={register}
                        error={errors && errors[field.name as keyof onboard]}
                      />
                    ))}
                    <label
                      className="text-md flex flex-row justify-between font-semibold text-black"
                      htmlFor="bio"
                    >
                      Your Bio
                      {errors["bio"]?.message && (
                        <p className="text-sm text-red-400 ">
                          {errors["bio"]?.message}
                        </p>
                      )}
                    </label>
                    <Textarea
                      className="h-[150px] w-full resize-none shadow lg:h-[200px]"
                      placeholder={user?.bio as string}
                      {...register("bio")}
                    />
                  </CardContent>
                  <CardFooter className="flex items-center justify-center">
                    <Button
                      className="rounded-lg bg-pri text-white transition hover:scale-105 hover:bg-slate-400"
                      type="submit"
                    >
                      {isLoading ? (
                        <div className="flex flex-row gap-0.5">
                          Sending <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      ) : (
                        <div className="flex flex-row gap-0.5">
                          Save Changes
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <ResetPassword user={user} />
            </TabsContent>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
};

export default SettingsButton;
