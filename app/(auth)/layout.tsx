import AuthCarousel from "@/components/user-auth/common-auth-ui/AuthCarousel";



type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-1 overflow-hidden bg-[url('/patterns/pattern-light.png')]">
      <div className="hidden sm:block w-1/2 lg:w-3/5 bg-pri ">
        <AuthCarousel />
      </div>
      <div className="flex lg:w-2/5 w-full items-start sm:items-center justify-center">
        <div className="h-full w-full bg-[url('/patterns/pattern-light.png')]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
