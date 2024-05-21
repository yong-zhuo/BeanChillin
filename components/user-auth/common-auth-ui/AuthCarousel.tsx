"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "@/constants/carouselContent";

const AuthCarousel = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        className="h-full w-full"
      >
        {images.map((image, id) => (
          <div
            key={id}
            className="flex h-screen flex-col items-center justify-between p-4 sm:flex xl:flex"
          >
            <div className="m-auto flex h-2/3 flex-grow items-center justify-center pt-10">
              <Image
                src={image.src}
                alt={`Image ${id}`}
                width={400}
                height={400}
              />
            </div>
            <div className="flex h-1/3 justify-center py-10">
              <div className="max-w-sm py-10 text-center sm:text-xl text-xl font-semibold text-[#EEF7FF] md:max-w-md lg:max-w-lg lg:text-3xl ">
                {image.text}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
