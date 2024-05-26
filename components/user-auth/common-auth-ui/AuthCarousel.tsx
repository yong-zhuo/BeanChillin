"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "@/constants/carouselContent";

const AuthCarousel = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-pri">
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
          <div key={id} className="flex h-screen flex-col items-center">
            <div className="flex h-3/5 flex-grow items-center justify-center">
              <Image
                src={image.src}
                alt={`Image ${id}`}
                width={400}
                height={400}
                className="sm:w-full sm:h-auto md:w-full md:h-auto lg:w-full lg:h-auto xl:w-full xl:h-auto"
              />
            </div>
            <div className="flex h-1/3 max-w-sm justify-center pt-10 text-center text-xl font-semibold text-[#EEF7FF] sm:pt-5 sm:text-xl md:max-w-md lg:max-w-lg lg:text-3xl ">
              {image.text}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
