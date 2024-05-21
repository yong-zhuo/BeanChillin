type OnboardProps = {
  children: React.ReactNode;
};

const OnboardLayout = ({ children }: OnboardProps) => {
  return (
    <main className="grid min-h-screen  grid-cols-6 overflow-hidden bg-[url('/patterns/pattern-light.png')]">
      <div
        className="col-span-4 col-start-2 mb-10 mt-10 justify-center rounded-md border border-secondary bg-primary bg-opacity-20 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter lg:mb-16 lg:mt-16
        "
      >
        {children}
      </div>
    </main>
  );
};

export default OnboardLayout;
