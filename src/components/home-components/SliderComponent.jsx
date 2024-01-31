import { useRef, useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const SliderComponent = ({ stories }) => {
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Controller,
          Autoplay,
        ]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        loop
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {stories.map(({ data }, index) => (
          <>
            <div className=" max-w-xl mx-auto">
              <SwiperSlide>
                <div
                  key={index}
                  class="flex flex-col items-center justify-center w-full p-0 shrink-0 snap-start rounded-xl"
                >
                  <img
                    class="w-full max-w-full rounded-xl imgwrapper"
                    src={data.image}
                    alt="placeholder image"
                  />

                  <div class="absulute bottom-0 z-40  max-w-5xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-6 items-center justify-between w-full my-4">
                    <div class="flex flex-col gap-1 flex-1">
                      <span class="text-2xl text-[#6B7280] ">
                        Pre-Seed:{" "}
                        <a
                          href="#"
                          class="text-2xl text-black dark:text-white font-body font-medium"
                        >
                          {data.preseed}
                        </a>
                      </span>
                      <span class="text-2xl text-[#6B7280] ">
                        Seed:{" "}
                        <a
                          href="#"
                          class="text-2xl text-black font-body dark:text-white font-medium"
                        >
                          {data.seed}
                        </a>
                      </span>
                      <span class="text-2xl text-[#6B7280] ">
                        Series-A:{" "}
                        <a
                          href="#"
                          class="text-2xl text-black dark:text-white font-body font-medium"
                        >
                          {data.seriesA}
                        </a>
                      </span>
                    </div>
                    <div class="absulute bottom-0">
                      <a
                        href={data.articleLink}
                        target="_blank"
                        class="py-4 px-6 rounded-xl text-white bg-black dark:bg-white/5 inline-flex items-center gap-2 hover:cursor-pointer"
                      >
                        Read the Story{" "}
                        <span>
                          <img src="icons/linkopen.svg" alt="" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </>
        ))}
      </Swiper>

      <div class="absolute z-10 -top-28 xl:-top-16  flex justify-between w-full mx-auto h-full">
        <button
          ref={prevButtonRef}
          class="text-6xl prev -ml-6 lg:-ml-16"
          id="prev-button"
          onClick={() => {
            swiperRef.current.slidePrev();
          }}
        >
          <span
            aria-hidden="true"
            class="h-12 w-12 flex items-center justify-center rounded-full border-[.9] bg-white dark:bg-white/5"
          >
            <svg
              width="8"
              height="15"
              class="text-gray-300 lg:h-8 hover:text-gray-400"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="dark:fill-white"
                d="M0.1875 7.35938C0.1875 7.26042 0.205729 7.16927 0.242188 7.08594C0.278646 6.9974 0.333333 6.91667 0.40625 6.84375L6.60156 0.78125C6.74219 0.645833 6.91146 0.578125 7.10938 0.578125C7.24479 0.578125 7.36458 0.609375 7.46875 0.671875C7.57812 0.734375 7.66406 0.820312 7.72656 0.929688C7.79427 1.03385 7.82812 1.15365 7.82812 1.28906C7.82812 1.48177 7.75781 1.65104 7.61719 1.79688L1.92969 7.35938L7.61719 12.9219C7.75781 13.0677 7.82812 13.237 7.82812 13.4297C7.82812 13.5651 7.79427 13.6849 7.72656 13.7891C7.66406 13.8984 7.57812 13.9844 7.46875 14.0469C7.36458 14.1094 7.24479 14.1406 7.10938 14.1406C6.91146 14.1406 6.74219 14.0703 6.60156 13.9297L0.40625 7.875C0.333333 7.80208 0.278646 7.72396 0.242188 7.64062C0.205729 7.55208 0.1875 7.45833 0.1875 7.35938Z"
                fill="black"
              />
            </svg>
          </span>
          <span class="sr-only">Skip to previous slide page</span>
        </button>

        <button
          ref={nextButtonRef}
          class="text-6xl next -mr-6 lg:-mr-16"
          id="next-button"
          onClick={() => {
            console.log("clicked");
            swiperRef.current.slideNext();
          }}
        >
          <span
            aria-hidden="true"
            class="h-12 w-12  flex items-center justify-center rounded-full border-[.9] bg-white dark:bg-white/5"
          >
            <svg
              width="8"
              height="15"
              class="text-gray-300 lg:h-8 hover:text-gray-400"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="dark:fill-white"
                d="M7.82031 7.35938C7.82031 7.45833 7.79948 7.55208 7.75781 7.64062C7.72135 7.72396 7.66667 7.80208 7.59375 7.875L1.40625 13.9297C1.26562 14.0703 1.09375 14.1406 0.890625 14.1406C0.760417 14.1406 0.640625 14.1094 0.53125 14.0469C0.421875 13.9844 0.335938 13.8984 0.273438 13.7891C0.210938 13.6849 0.179688 13.5651 0.179688 13.4297C0.179688 13.237 0.247396 13.0677 0.382812 12.9219L6.07031 7.35938L0.382812 1.79688C0.247396 1.65104 0.179688 1.48177 0.179688 1.28906C0.179688 1.15365 0.210938 1.03385 0.273438 0.929688C0.335938 0.820312 0.421875 0.734375 0.53125 0.671875C0.640625 0.609375 0.760417 0.578125 0.890625 0.578125C1.09375 0.578125 1.26562 0.645833 1.40625 0.78125L7.59375 6.84375C7.66667 6.91667 7.72135 6.9974 7.75781 7.08594C7.79948 7.16927 7.82031 7.26042 7.82031 7.35938Z"
                fill="black"
              />
            </svg>
          </span>
          <span class="sr-only">Skip to next slide page</span>
        </button>
      </div>
    </div>
  );
};

export default SliderComponent;
