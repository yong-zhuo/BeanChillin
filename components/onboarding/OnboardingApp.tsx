"use client";

import { useMultistepForm } from "../../hooks/UseMultistepForm";
import ProfileForm from "./ProfileForm";
import BioForm from "./BioForm";
import WelcomePage from "./WelcomePage";
import { useRouter } from "next/navigation";
import Button from "../common-ui/button/Button";
import { onboardPush } from "@/lib/users/OnboardPush";
import { onboard, onboardSchema } from "@/lib/schemas/onboardSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stepper from "./Stepper";
import { useEffect, useState } from "react";
import IsOnboard from "@/lib/users/IsOnboard";
import cloudinaryUpload from "@/lib/cloudinary/CloudinaryUpload";
import { useSession } from "next-auth/react";
import getinfo from "@/lib/cloudinary/getinfo";

export default function OnboardingApp() {

  const [isloading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  //check if user onboarded
  const router = useRouter();
  useEffect(() => {
    IsOnboard();
  }, []);

  //zod validation for onboarding
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<onboard>({
    defaultValues: { firstName: "Random", lastName: "User", image: undefined, bio: "Hi" },
    resolver: zodResolver(onboardSchema),
  });

  const [imageUrl, setImageUrl] = useState<string>("/profile/avatar.svg");

  //custom hook to change and track steps in multi-step form
  const { steps, StepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ProfileForm key={0} register={register} errors={errors} setValue={setValue} imageUrl={imageUrl} setImageUrl={setImageUrl} />,
      <BioForm key={1} register={register} errors={errors} />,
      <WelcomePage key={2} state={isloading} />,
    ]);

  //send data to db. TODO: tidy up function.
  const onSubmit: SubmitHandler<onboard> = async (data) => {
    if (!isLastStep) return next;
    setIsLoading(true);
    try {
      const info = await getinfo();

      //Tidy code
      const obj = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        email: info.email,
        isOnboard: true
      }

      await Promise.all([
        cloudinaryUpload(data.image, info),
        onboardPush(obj)
      ]);
      router.replace("/home");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <div className="h-auto w-full sm:w-auto">
        <Stepper step={StepIndex + 1} />
      </div>
      <form
        className="flex flex-grow flex-col  px-40 pb-5 pt-9"
        onSubmit={handleSubmit(onSubmit)}
      >
        {step}
      </form>
      <div className="absolute bottom-0 mt-5 flex w-full">
        {!isFirstStep && (
          <div className="">
            <Button
              handleClick={back}
              text="Back"
              addClass="text-sec bg-pri hover:bg-slate-500 gap-1 shadow"
              src="/misc/arrow-left.svg"
              alt="arrow-left"
              width={20}
              height={20}
              orientation="left"
            />
          </div>
        )}
        {!isLastStep && (
          <div className="ml-auto">
            <Button
              addClass="bg-pri text-sec hover:bg-slate-500 gap-1 shadow"
              handleClick={next}
              text="Next"
              src="/misc/arrow-right.svg"
              alt="arrow-right"
              width={20}
              height={20}
              orientation="right"
            />
          </div>
        )}
      </div>
    </div>
  );
}


