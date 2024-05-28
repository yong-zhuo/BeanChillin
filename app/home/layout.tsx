import NavBar from "@/components/home/navbar/NavBar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="h-screen bg-[url('/patterns/pattern-light.png')]">
      {children}
    </main>
  );
};

export default layout;
