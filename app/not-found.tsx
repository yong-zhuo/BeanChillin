import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[url('/patterns/pattern-light.png')]">
      <h1 className="text-center text-primary">Error 404: Page Not Found</h1>
      <div className="my-20 flex justify-center">
        <Image
          src="/not-found/notfound404.png"
          alt="Picture of Kafka"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
