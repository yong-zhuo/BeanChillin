"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "./carousel-content/carouselContent"

const LoginCarousel = () => {
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
          <div key={id} className="relative flex h-screen flex-col">
            <div className="m-auto h-2/3 py-20">
              <Image
                src={image.src}
                alt={`Image ${id}`}
                width={600}
                height={600}
              />
            </div>
            <div className="flex h-1/3 justify-center py-20">
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

export default LoginCarousel;
