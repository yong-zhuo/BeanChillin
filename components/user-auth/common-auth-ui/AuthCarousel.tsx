"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "@/constants/carouselContent";
import { Card } from "@/components/common-ui/shadcn-ui/card";

const AuthCarousel = () => {
  return (
    <div className="flex h-screen items-start justify-center bg-transparent border-none mt-10">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        className="h-4/5 w-4/5 flex items-center justify-center mt-10 pt-10"
      >
        {images.map((image, id) => (
          <div key={id} className="flex flex-col justify-center items-center mb-12 pb-12">
            <Image
              src={image.src}
              alt={`Image ${id}`}
              width={500}
              height={500}
              className="h-[600px] w-[600px]"
            />
            <p className="pb-10 mb-10 flex max-w-md justify-center pt-10 text-center text-xl font-semibold text-[#EEF7FF] md:text-2xl">
              {image.text}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
