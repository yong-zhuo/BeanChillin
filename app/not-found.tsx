import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
      <Image
        src="/not-found/notfound404.png"
        alt="Picture of Kafka"
        width={300}
        height={300}
      />
    </div>
  );
}
