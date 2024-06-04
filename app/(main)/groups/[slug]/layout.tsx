const layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <div className="mx-auto h-full max-w-4xl pt-2 mt-2 bg-[url('/patterns/pattern-light.png')]">
          <div>{children}</div>
    </div>
  );
};

export default layout;
