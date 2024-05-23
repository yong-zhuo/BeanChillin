"use client";

import { useMultistepForm } from "./UseMultistepForm";
import ProfileForm from "./ProfileForm";
import BioForm from "./BioForm";
import WelcomePage from "./WelcomePage";
import { useRouter } from "next/navigation";

export default function OnboardingApp() {
  const { steps, StepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ProfileForm key={0} />,
      <BioForm key={1} />,
      <WelcomePage key={2} />,
    ]);
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/home");
  };

  return (
    <div>
      <form className="mb-4 px-40 pb-8 pt-6" onSubmit={handleSubmit}>
        {step}
        {!isFirstStep && <button onClick={back}>Back</button>}
        {!isLastStep && <button onClick={next}>Next</button>}
      </form>
    </div>
  );
}
