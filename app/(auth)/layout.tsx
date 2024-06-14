import AuthCarousel from "@/components/user-auth/common-auth-ui/AuthCarousel";



type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-1 bg-[url('/patterns/pattern-light.png')] ">
      <div className="hidden sm:block md:w-1/2 xl:w-3/5 bg-pri h-[1000px] ">
        <AuthCarousel />
      </div>
      <div className="flex xl:w-2/5  md:w-1/2 w-full items-start sm:items-center justify-center">
        <div className="3xl:mt-12 h-full w-full bg-[url('/patterns/pattern-light.png')]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
