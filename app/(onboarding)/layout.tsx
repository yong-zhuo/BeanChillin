type OnboardProps = {
  children: React.ReactNode;
};

const OnboardLayout = ({ children }: OnboardProps) => {
  return (
    <main className="grid h-screen  grid-cols-4 sm:grid-cols-6 overflow-auto bg-[url('/patterns/pattern-light.png')] p-4 sm:p-0">
      <div className="flex flex-col  backdrop-blur-4xl col-start-1 col-span-4 sm:col-span-4 sm:col-start-2 mb-10 mt-10 justify-between rounded-lg bg-white/50  p-4  shadow-xl lg:mb-16 lg:mt-16">
        {children}
      </div>
    </main>
  );
};

export default OnboardLayout;
