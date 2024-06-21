import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-[url('/patterns/pattern-light.png')]">
      <Image src="/misc/ring.svg" alt="loading" height={300} width={300} />
      <h2 className="font-extrabold text-3xl text-pri">Loading...</h2>
    </div>
  );
};

export default Loading;
