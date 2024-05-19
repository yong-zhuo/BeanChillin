import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

export default function Login() {
  return (
    <main className="flex min-h-screen overflow-hidden bg-[#4D869C]">
      <div className="w-3/5">
        <LoginLeft />
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <LoginRight />
      </div>
    </main>
  );
}
