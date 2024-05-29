import NavBar from "@/components/home/navbar/NavBar";

export const metadata = {
  title: "Home | BeanChillin",
  description: "Welcome to BeanChillin!",
};

interface HomeLayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: HomeLayoutProps) => {
  return (
    <main className="min-h-screen bg-[url('/patterns/pattern-light.png pt-16')]">
      <NavBar />
      {children}
    </main>
  );
};

export default layout;
