import Image from "next/image";
import Logo from "@/components/common-ui/logo/Logo";
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[url('/patterns/pattern-light.png')]">
      <Logo src="/logo/logo.svg" width={200} height={200} />
    </main>
  );
}
