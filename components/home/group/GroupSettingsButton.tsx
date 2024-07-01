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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common-ui/shadcn-ui/select";
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
import { createGroupFields, profileFields } from "@/constants/formFields";
import { onboard, onboardSchema } from "@/lib/schemas/onboardSchema";
import { fieldState } from "@/types/formFieldsState";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader2, Settings, Trash } from "lucide-react";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import cloudinaryUpload, {
  cloudUpdate,
  groupCloudUpload,
} from "@/lib/cloudinary/CloudinaryUpload";
import { onboardPush } from "@/lib/users/OnboardPush";
import { useToast } from "@/components/common-ui/shadcn-ui/toast/use-toast";
import { Textarea } from "@/components/common-ui/shadcn-ui/textarea";
import { Group, User } from "@prisma/client";
import GroupImages from "./GroupImages";
import {
  createGroup,
  createGroupSchema,
} from "@/lib/schemas/createGroupSchema";
import { UserContext } from "../UserContext";
import { ToastAction } from "@/components/common-ui/shadcn-ui/toast/toast";
import { Input } from "@/components/common-ui/shadcn-ui/input";
type Props = {
  group: Group;
};
const fields = createGroupFields;
let fieldsState: fieldState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
const GroupSettingsButton = ({ group }: Props) => {
  const { toast } = useToast();
  //state for dialog box open/close
  const [open, setOpen] = useState(false);

  //state for loading spinner for button
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [groupNameInput, setGroupNameInput] = useState("");
  const [isDeleteButtonActive, setIsDeleteButtonActive] = useState(false);

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
      id: group.id,
      name: data.name.replaceAll(" ", "-"),
      description: data.description,
      picture: data.picture,
      banner: data.banner,
      type: data.type,
    };

    setIsLoading(true);

    try {
      // console.log("Payload to send:", JSON.stringify(payload));
      const response = await fetch("/api/group/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Group does not exists",
            description: "Please create your Group first.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
            variant: "destructive",
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
            description: "Please login to update your Group.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to update Group",
            description: "Please refresh the page and try again.",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });
        }
      } else {
        //might change this logic, get name and reroute them to their new group page
        const name = await response.json();
        await Promise.all([
          groupCloudUpload(data.picture, name, "groupPicture"),
          groupCloudUpload(data.banner, name, "banner"),
        ]);
        toast({
          variant: "success",
          title: "Group Successfully created",
          description: "Please wait while we change your Group details.",
        });
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

  //handle click for deleting group
  const deleteGroup = async () => {
    setIsLoading(true);
    const response = await fetch("/api/group/delete", {
      method: "POST",
      body: JSON.stringify({ groupId: group.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setIsLoading(false);
      if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "Please login to delete a Group.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Failed to delete Group",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else if (response.status === 409) {
        toast({
          variant: "destructive",
          title: "Group does not exists",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please refresh the page and try again.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        });
      }
    } else {
      toast({
        variant: "success",
        title: "Group deleted",
        description: "Group has been deleted successfully",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      });
      router.replace("/groups");
      router.refresh();
    }
  };

  const handleGroupNameInputChange = (event: any) => {
    const input = event.target.value;
    setGroupNameInput(input);
    setIsDeleteButtonActive(input === group.name);
  };

  return (
    <div className="">
      <Tabs defaultValue="account">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex w-fit flex-row items-center justify-center gap-1 bg-gray-400 text-white transition hover:scale-105 hover:bg-gray-600">
              Group Settings
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-h-[90vh] w-[40vh] overflow-y-auto sm:w-[800px] sm:max-w-[51vh] "
            onInteractOutside={(e) => {
              if (isLoading) e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>Group Settings</DialogTitle>
              <DialogDescription>
                Click on the tabs to toggle between different settings.
              </DialogDescription>
            </DialogHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Edit details</TabsTrigger>
              <TabsTrigger value="Delete Group">Delete Group</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card >
                <CardHeader>
                  <CardTitle>Group Details</CardTitle>
                  <CardDescription>
                    Edit your Group details here. Click change when you are
                    done.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="">
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
                      <SelectContent className="z-50 bg-white ">
                        <SelectGroup className="border-1">
                          <SelectItem value="Academics" className="hover:bg-sec">Academics</SelectItem>
                          <SelectItem value="Interests" className="hover:bg-sec">Interests</SelectItem>
                          <SelectItem value="CCA" className="hover:bg-sec">CCA</SelectItem>
                          <SelectItem value="Events" className="hover:bg-sec">Events</SelectItem>
                          <SelectItem value="Social" className="hover:bg-sec">Social</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/*Using hidden input to detect Select values, might need to change*/}
                    <input type="hidden" name="type" />
                    <div className="mt-7">
                      <GroupImages
                        setBanner={setBanner}
                        setPicture={setPicture}
                        picture={picture}
                        banner={banner}
                        setValue={setValue}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-center">
                  <Button
                      className="rounded-lg bg-pri text-white transition hover:scale-105 hover:bg-slate-400"
                      type="submit"
                      disabled={isLoading}
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
            <TabsContent value="Delete Group">
              <Card>
                <CardHeader>
                  <CardTitle>Delete Group</CardTitle>
                  <CardDescription>
                    This action is irreversible. Please type the name of your
                    group to confirm.
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <label className="text-md pb-1 font-semibold">
                    Name of Group
                  </label>
                  <Input className="border-gray-500 focus-visible:border-red-400 focus-visible:ring-transparent " type='text' value={groupNameInput} onChange={handleGroupNameInputChange} placeholder={group.name}/>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button
                    className="flex w-fit flex-row items-center justify-center gap-1 bg-red-400 text-white transition hover:scale-105 hover:bg-gray-400"
                    disabled={!isDeleteButtonActive}
                    onClick={deleteGroup}
                  >
                    {isLoading ? (
                      <div className="flex flex-row gap-0.5">
                        Deleting <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      <div className="flex flex-row gap-0.5">
                        Delete Group <Trash className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
};

export default GroupSettingsButton;
