"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "@/constants/carouselContent";
import { Card } from "@/components/common-ui/shadcn-ui/card";

const AuthCarousel = () => {
  return (
    <div className="flex h-screen items-start justify-center bg-transparent border-none mt-14">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        className="h-4/5 w-4/5  flex items-center justify-center "
      >
        {images.map((image, id) => (
          <div key={id} className="flex flex-col justify-center items-center mb-4 pb-4 pt-5 lg:mb-9 lg:pb-9 xl:mb-7 xl:pb-7">
            <Image
              src={image.src}
              alt={`Image ${id}`}
              width={400}
              height={400}
              className="h-[400px] w-[400px] lg:h-[550px] lg:w-[550px] 2xl:h-[550px] 2xl:w-[550px]"
            />
            <p className=" p-9 m-7 lg:m-0 lg:p-0 xl:mb-7 xl:pb-7 flex max-w-md justify-center pt-10 text-center text-xl font-semibold text-[#EEF7FF] md:text-2xl">
              {image.text}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthCarousel;
