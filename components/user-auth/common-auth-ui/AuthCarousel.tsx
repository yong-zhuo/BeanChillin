"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "@/constants/carouselContent"

const AuthCarousel = () => {
  return (
    <div className="grid h-screen grid-cols-1 bg-primary">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {images.map((image, id) => (
          <div key={id} className="relative flex h-screen flex-col">
            <div className="flex-grow flex items-center justify-center m-auto h-2/3 pt-10">
              <Image
                src={image.src}
                alt={`Image ${id}`}
                width={500}
                height={500}
              />
            </div>
            <div className="flex h-1/3 justify-center py-10">
              <div className="md:xl max-w-sm py-10 text-center text-lg font-semibold text-[#EEF7FF] md:max-w-md lg:max-w-lg lg:text-3xl ">
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
