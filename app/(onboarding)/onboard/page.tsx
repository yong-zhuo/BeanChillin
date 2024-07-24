"use server"
import OnboardingApp from "@/components/onboarding/OnboardingApp";
import IsOnboard from "@/lib/users/IsOnboard";
import { redirect } from "next/navigation";

export default async function OnboardRoute() {
  let res = await IsOnboard();
  if (res === 'login') {
    redirect('/login');
  } else if (res === 'home') {
    redirect('/feed');
  } else if (res === 'register') {
    redirect('/register');
  } else if (res !== 'ok') {
    redirect('/notfound');
  }
  return <OnboardingApp />;
}
