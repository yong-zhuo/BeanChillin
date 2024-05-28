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

export default function OnboardingApp() {
  //zod validation for onboarding
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<onboard>({
    defaultValues: { firstName: "", lastName: "", image: undefined, bio: "" },
    resolver: zodResolver(onboardSchema),
  });

  //custom hook to change and track steps in multi-step form
  const { steps, StepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ProfileForm key={0} register={register} errors={errors} setValue={setValue} />,
      <BioForm key={1} register={register} errors={errors} />,
      <WelcomePage key={2} />,
    ]);

  const router = useRouter();

  //send data to db. TODO: tidy up function.
  const onSubmit: SubmitHandler<onboard> = async (data) => {

    const formData = new FormData();
    formData.append('file', data.image);
    formData.append('upload_preset', 'profile_picture');
    try {
      const imgData = await fetch('https://api.cloudinary.com/v1_1/drkrdyfdj/image/upload', { //TODO: Ensure this request is only sent once. User can press button multiple time to glitch it.
        method: 'POST',
        body: formData
      }).then(res => res.json());

      //Tidy code
      const obj = {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        imageUrl: imgData.secure_url,
        imgPublicId: imgData.publicId,
        isOnboard: true
      }
      if (!isLastStep) return next;
      //in case email fails idk y
      onboardPush(obj);
      router.replace("/home");
    } catch (e) {
      console.log(e);
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
              addClass="text-sec bg-pri hover:bg-slate-500 gap-1"
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
              addClass="bg-pri text-sec hover:bg-slate-500 gap-1"
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
