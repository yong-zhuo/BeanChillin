type OnboardProps = {
  children: React.ReactNode;
};

const OnboardLayout = ({ children }: OnboardProps) => {
  return (
    <main className="grid h-screen  grid-cols-6 overflow-hidden bg-[url('/patterns/pattern-light.png')] ">
      <div
        className="backdrop-blur-4xl col-span-4 col-start-2 mb-10 mt-10 justify-center rounded-lg bg-white/50  p-4  shadow-xl lg:mb-16 lg:mt-16"
      >
        {children}
      </div>
    </main>
  );
};

export default OnboardLayout;
