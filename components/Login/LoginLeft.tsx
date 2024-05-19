"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Image {
  src: string;
  text: string;
}

const images: Image[] = [
  { src: "/carousel/community.png", text: "Lorem Ipsum" },
  { src: "/carousel/discussion.png", text: "Lorem" },
];

const LoginLeft = () => {
  return (
    <div className="grid h-screen grid-cols-1 bg-[#4D869C]">
      <Carousel
        autoPlay
        infiniteLoop
        interval={10000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {images.map((image, id) => (
          <div key={id} className="h-100 relative">
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={`Image ${id}`}
                width={400}
                height={400}
              />
              <div className="absolute bottom-0 h-2/5 w-full bg-opacity-50 p-4 text-center text-white">
                {image.text}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LoginLeft;
