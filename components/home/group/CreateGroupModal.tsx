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
import { useState } from "react";
import { useForm } from "react-hook-form";

const fields = createGroupFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const CreateGroupModal = () => {
  const {toast} = useToast();
  //state for dialog box open/close
  const [open, setOpen] = useState(false);

  //state for loading spinner for button
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      //TODO: show success toast/alert dialog
      toast({
        variant: "success",
        title: "Group Successfully created",
        description: "Start posting in your Group!",
      })
    } catch (e) {
      //TODO: Add error handling when fail to create group, display toast/alert dialog
      console.error(e);
      toast({
        variant: "destructive",
        title: "Failed to create Group",
        description:
          "Please refresh the page and try again.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
      reset();
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            text="New Group"
            action="button"
            addClass="shadow bg-pri text-sec mt-2 mb-2 hover:bg-slate-500"
            handleClick={() => setOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className="w-[400px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create your Group</DialogTitle>
            <DialogDescription>
              Please fill in all fields. Click create to create your new Group.
            </DialogDescription>
          </DialogHeader>
          <div>
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
              <Select onValueChange={value => setValue('groupType', value)} value={watch('groupType')}>
                <div className="flex justify-between">
                  <label
                    htmlFor="groupType"
                    className="text-md text-black-700 mb-2 block font-bold sm:text-base md:text-sm"
                  >
                    Group Category <span className="text-pri">*</span>
                  </label>
                  {errors["groupType"] && (
                    <p className="flex justify-between text-xs font-semibold text-red-400 ">
                      <CircleAlert height={15} />
                      {errors["groupType"].message}
                    </p>
                  )}
                </div>
                <SelectTrigger className="text-gray-500 shadow">
                  <SelectValue placeholder="Select a category that best suits your Group"  />
                </SelectTrigger>
                <SelectContent className="bg-white z-20">
                  <SelectGroup className="border-2">
                    <SelectItem value="Academics" className="">Academics</SelectItem>
                    <SelectItem value="Interests">Interests</SelectItem>
                    <SelectItem value="CCA">CCA</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/*Using hidden input to detect Select values, might need to change*/} 
              <input type="hidden" name="groupType"/>
              <Button
                text="Create Group"
                addClass="bg-pri text-sec"
                action="submit"
                state={isLoading}
                height={20}
                width={20}
              />
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
