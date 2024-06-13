"use client";

import Button from "@/components/common-ui/button/Button";
import FormInput from "@/components/common-ui/form/FormInput";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/common-ui/shadcn-ui/dialog";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common-ui/shadcn-ui/select";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { createGroupFields } from "@/constants/formFields";
import {
  createGroup,
  createGroupSchema,
} from "@/lib/schemas/createGroupSchema";
import { fieldState } from "@/types/formFieldsState";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent } from "@radix-ui/react-select";
import { CircleAlert } from "lucide-react";
import { use, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import GroupImages from "./GroupImages";
import { ScrollArea } from "@/components/common-ui/shadcn-ui/scroll-area";

const fields = createGroupFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const CreateGroupModal = () => {
  const { toast } = useToast();
  //state for dialog box open/close
  const [open, setOpen] = useState(false);

  //state for loading spinner for button
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const router = useRouter();

  //group picture state
  const [picture, setPicture] = useState<string>("/placeholder/pl3.png");

  //group banner state
  const [banner, setBanner] = useState<string>("/placeholder/pl2.jpg");

  //zod validation for create group
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<createGroup>({ resolver: zodResolver(createGroupSchema) });

  const onSubmit = async (data: createGroup) => {
    //TODO: #39 Add create group logic and send data to backend

    const payload = {
      name: data.name,
      description: data.description,
      picture: data.picture,
      banner: data.banner,
      type: data.type,
      creatorId: user?.id,
    };

    setIsLoading(true);

    try {
     // console.log("Payload to send:", JSON.stringify(payload));
      const response = await fetch("/api/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        
        

        if (response.status === 409) {
          toast({
            variant: "destructive",
            title: "Group already exists",
            description: "Please choose another name for your Group.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        } else if (response.status === 400) {
          toast({
            variant: "destructive",
            title: "Creator ID is undefined",
            description: "Please refresh the page and try again.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        } else if (response.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "Please login to create a Group.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to create Group",
            description: "Please refresh the page and try again.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } else {
        toast({
          variant: "success",
          title: "Group Successfully created",
          description: "Start posting in your Group!",
        });
        //might change this logic, get name and reroute them to their new group page
        const name = await response.json();
        router.push(`/groups/${name}`);
      }
      
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please refresh the page and try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
      reset();
    }
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            text="New Group"
            action="button"
            addClass="shadow bg-pri text-sec mt-2 mb-2 hover:bg-slate-500 hover:shadow-lg hover:scale-105 transition"
            handleClick={() => setOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] w-[300px] overflow-y-auto sm:w-[800px] sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Create your Group</DialogTitle>
            <DialogDescription>
              Please fill in all fields. Click create to create your new Group.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
              <FormInput
                key={field.id}
                labelText={field.labelText}
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                register={register}
                name={field.name as keyof createGroup}
                error={errors[field.name as keyof createGroup]}
                forRegister={field.forRegister}
              />
            ))}
            <GroupImages
              setBanner={setBanner}
              setPicture={setPicture}
              picture={picture}
              banner={banner}
              setValue={setValue}
            />
            <Select
              onValueChange={(value) => setValue("type", value)}
              value={watch("type")}
            >
              <div className="flex justify-between">
                <label
                  htmlFor="groupType"
                  className="text-md text-black-700 mb-2 block font-bold sm:text-base md:text-sm"
                >
                  Group Category <span className="text-pri">*</span>
                </label>
                {errors["type"] && (
                  <p className="flex justify-between text-xs font-semibold text-red-400 ">
                    <CircleAlert height={15} />
                    {errors["type"].message}
                  </p>
                )}
              </div>
              <SelectTrigger className="text-gray-500 shadow ">
                <SelectValue placeholder="Select a category that best suits your Group" />
              </SelectTrigger>
              <SelectContent className="z-20 bg-white ">
                <SelectGroup className="border-2">
                  <SelectItem value="Academics">Academics</SelectItem>
                  <SelectItem value="Interests">Interests</SelectItem>
                  <SelectItem value="CCA">CCA</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/*Using hidden input to detect Select values, might need to change*/}
            <input type="hidden" name="type" />
            <Button
              text="Create"
              addClass="bg-pri text-sec transform hover:-translate-y-1 transition duration-400 hover:animate-pulse shadow"
              action="submit"
              state={isLoading}
              height={20}
              width={20}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
