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
    formState: { errors },
  } = useForm<onboard>({
    defaultValues: { firstName: "", lastName: "", image: "", bio: "" },
    resolver: zodResolver(onboardSchema),
  });

  //custom hook to change and track steps in multi-step form
  const { steps, StepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ProfileForm key={0} register={register} errors={errors} />,
      <BioForm key={1} register={register} errors={errors} />,
      <WelcomePage key={2} />,
    ]);

  const router = useRouter();

  //send data to db
  const onSubmit: SubmitHandler<onboard> = (data) => {
    if (!isLastStep) return next;
    //in case email fails idk y
    try {
      onboardPush(data);
      router.push("/home");
    } catch (e) {
      console.log(e)
    }
  };

  return (
    
    <div>
      <Stepper step={StepIndex + 1} />
      <form className="px-40 pb-5 pt-9" onSubmit={handleSubmit(onSubmit)}>
        {step}

        <div className="flex">
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
      </form>
    </div>
  );
}
