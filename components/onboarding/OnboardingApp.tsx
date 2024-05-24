"use client";

import { useMultistepForm } from "../../hooks/UseMultistepForm";
import ProfileForm from "./ProfileForm";
import BioForm from "./BioForm";
import WelcomePage from "./WelcomePage";
import { useRouter } from "next/navigation";
import Button from "../common-ui/button/Button";
import { useState } from "react";
import { FormData } from "@/types/formData";
import { onboardAuth } from "@/lib/users/OnboardAuth";

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  image: "",
  bio: "",
};

export default function OnboardingApp() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
    console.log(data);
  }
  const { steps, StepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ProfileForm key={0} {...data} updateFields={updateFields} />,
      <BioForm key={1} {...data} updateFields={updateFields} />,
      <WelcomePage key={2} />,
    ]);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLastStep) return next;

    onboardAuth(data, 'lol@gmail.com');

    router.push("/home");
  };

  return (
    <div>
      <form className="px-40 pb-5 pt-9" onSubmit={handleSubmit}>
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
