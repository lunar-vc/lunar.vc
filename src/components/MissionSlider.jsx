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

const MissionSlider = ({ founderQuotes }) => {
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className="relative  w-full h-full">
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
        {founderQuotes.map(({ data }, index) => (
          <>
            <div className=" flex flex-col items-center justify-center w-full p-0 shrink-0 snap-start rounded-xl pb-12">
              <SwiperSlide>
                <div class="max-w-[650px] mx-auto flex flex-col mb-12">
                  <div class="max-w-[650px] text-center">
                    <svg
                      width="32"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.592 13.055c0 1.294-.296 2.452-.889 3.472a6.589 6.589 0 0 1-2.42 2.407c-1.02.583-2.174.875-3.459.875a7.077 7.077 0 0 1-3.664-.985c-1.103-.656-1.987-1.604-2.652-2.844C.842 14.74.51 13.241.51 11.482c0-1.513.264-2.916.793-4.21a10.843 10.843 0 0 1 2.2-3.418A11.454 11.454 0 0 1 5.747 2.02c.83-.519 1.705-.934 2.625-1.244.346-.109.634-.187.861-.232.237-.055.483-.082.739-.082.355 0 .642.1.861.3a.951.951 0 0 1 .328.753c0 .164-.032.314-.095.45a.868.868 0 0 1-.247.329 1.48 1.48 0 0 1-.396.246 7.729 7.729 0 0 1-.574.205 9.973 9.973 0 0 0-4.02 2.16 8.373 8.373 0 0 0-1.38 1.586A6.51 6.51 0 0 0 3.6 8.297h.45a5.44 5.44 0 0 1 1.956-1.408 5.932 5.932 0 0 1 2.379-.479c1.166 0 2.22.296 3.158.889a6.292 6.292 0 0 1 2.229 2.379c.546 1.002.82 2.128.82 3.377Zm16.898 0c0 1.294-.296 2.452-.888 3.472a6.486 6.486 0 0 1-2.407 2.407c-1.02.583-2.174.875-3.459.875-1.34 0-2.565-.329-3.677-.985-1.103-.656-1.987-1.604-2.653-2.844-.656-1.24-.984-2.739-.984-4.498 0-1.513.26-2.916.78-4.21a10.842 10.842 0 0 1 2.2-3.418 11.456 11.456 0 0 1 2.242-1.833c.83-.519 1.705-.934 2.626-1.244.346-.109.633-.187.86-.232.229-.055.48-.082.753-.082.355 0 .638.1.848.3a.951.951 0 0 1 .328.753c0 .164-.028.314-.082.45a.817.817 0 0 1-.26.329 1.262 1.262 0 0 1-.383.246c-.164.064-.36.132-.588.205a9.974 9.974 0 0 0-4.02 2.16 8.371 8.371 0 0 0-1.38 1.586 6.51 6.51 0 0 0-.848 1.805h.451a5.29 5.29 0 0 1 1.955-1.408 5.996 5.996 0 0 1 2.38-.479c1.175 0 2.228.296 3.157.889a6.292 6.292 0 0 1 2.229 2.379c.547 1.002.82 2.128.82 3.377Z"
                        fill="#D92977"
                      />
                    </svg>
                  </div>
                  <p class="text-xl md:text-3xl text-gray-500 text-center px-5 max-w-[650px]">
                    {data.quote}
                  </p>
                  <div class="text-3xl max-w-[650px] text-indigo-500 text-right flex items-center justify-end leading-tight -mt-3">
                    <svg
                      width="32"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.51 7.217c0-1.294.296-2.447.888-3.46a6.621 6.621 0 0 1 2.407-2.405c1.02-.593 2.178-.89 3.472-.89 1.331 0 2.548.329 3.65.985 1.113.657 2.001 1.609 2.667 2.858.665 1.24.998 2.734.998 4.484 0 1.513-.264 2.917-.793 4.211a11.007 11.007 0 0 1-2.201 3.432 12.153 12.153 0 0 1-2.243 1.832c-.829.52-1.704.934-2.625 1.244-.346.1-.633.178-.86.232a3.917 3.917 0 0 1-.766.069c-.347 0-.63-.096-.848-.288-.21-.2-.315-.455-.315-.765 0-.164.028-.31.082-.438a.798.798 0 0 1 .26-.341c.1-.092.233-.17.397-.233.164-.073.355-.146.574-.219.784-.21 1.513-.496 2.187-.86a9.852 9.852 0 0 0 1.819-1.286 8.092 8.092 0 0 0 1.38-1.6 6.83 6.83 0 0 0 .862-1.804h-.451a5.431 5.431 0 0 1-1.955 1.421c-.748.31-1.54.465-2.38.465-1.175 0-2.232-.291-3.171-.875a6.328 6.328 0 0 1-2.215-2.379C.783 9.596.51 8.465.51 7.217Zm16.912 0c0-1.294.291-2.447.875-3.46a6.62 6.62 0 0 1 2.406-2.405c1.021-.593 2.178-.89 3.473-.89 1.34 0 2.561.329 3.664.985 1.103.657 1.987 1.609 2.652 2.858.666 1.24.998 2.734.998 4.484 0 1.513-.264 2.917-.793 4.211a10.886 10.886 0 0 1-2.215 3.432 11.573 11.573 0 0 1-2.242 1.832c-.83.52-1.7.934-2.611 1.244-.346.1-.638.178-.875.232-.228.046-.47.069-.725.069-.355 0-.642-.096-.861-.288a.993.993 0 0 1-.328-.765c0-.164.027-.31.082-.438a.973.973 0 0 1 .26-.341c.1-.092.228-.17.383-.233.163-.073.36-.146.587-.219a10.41 10.41 0 0 0 2.188-.86 9.663 9.663 0 0 0 1.832-1.286 8.743 8.743 0 0 0 1.38-1.6 6.51 6.51 0 0 0 .848-1.804h-.45a5.592 5.592 0 0 1-1.956 1.421 6.083 6.083 0 0 1-2.379.465c-1.166 0-2.22-.291-3.158-.875a6.328 6.328 0 0 1-2.215-2.379c-.547-1.011-.82-2.142-.82-3.39Z"
                        fill="#D92977"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex items-center justify-center gap-5 mb-3">
                  <img
                    src={data.profilePic}
                    class="h-6 w-6 rounded-full bg-orange-500 dark:text-white"
                    alt=""
                  />
                  <span class="font-bold dark:text-white/90 ">
                    {data.name}
                    <span class="font-normal">{data.designation}</span>
                  </span>
                </div>
              </SwiperSlide>
            </div>
          </>
        ))}
      </Swiper>

      {/* <div class="absolute  top-0  flex justify-between w-full mx-auto h-full">
        <button
          ref={prevButtonRef}
          class="text-6xl prev -ml-6 lg:-ml-16 z-10"
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
          class="text-6xl next -mr-6 lg:-mr-16 z-10"
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
      </div> */}
    </div>
  );
};

export default MissionSlider;
