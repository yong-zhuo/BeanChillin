import LoginCarousel from "@/components/login/LoginCarousel";
import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen overflow-hidden bg-primary">
      <div className="w-3/5">
        <LoginCarousel />
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
