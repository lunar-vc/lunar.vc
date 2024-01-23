// src/components/Accordion.js
import React, { useState } from "react";
import { faq } from "../../utils/faqData";
const Accordion = () => {
  const [openTab, setOpenTab] = useState(0);
  const [openTabs, setOpenTabs] = useState({});

  // const handleTabClick = (tabNumber) => {
  //   setOpenTab(tabNumber === openTab ? null : tabNumber);
  // };

  const handleTabClick = (tabNumber) => {
    setOpenTabs((prevOpenTabs) => ({
      ...prevOpenTabs,
      [tabNumber]: !prevOpenTabs[tabNumber],
    }));
  };

  return (
    <div className=" w-full ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
        {faq.map((item) => (
          <>
            <div className="rounded-xl">
              <button
                className={`w-full text-left py-6 px-12 rounded-xl focus:outline-none ${
                  openTab === 1
                    ? " bg-white/50 dark:bg-white/5 dark:text-white backdrop-blur"
                    : "bg-white/50 dark:bg-white/5 dark:text-white backdrop-blur"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <div className=" flex items-center justify-between">
                  <span className=" text-2xl font-bold">{item.question}</span>
                  <div
                    className={`h-12 w-12 rounded-full border dark:bg-white/5 flex items-center justify-center ${
                      openTabs[item.id] ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="15"
                      height="8"
                      viewBox="0 0 15 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.35938 7.8125C7.26042 7.8125 7.16927 7.79427 7.08594 7.75781C6.9974 7.72135 6.91667 7.66667 6.84375 7.59375L0.78125 1.39844C0.645833 1.25781 0.578125 1.08854 0.578125 0.890625C0.578125 0.755208 0.609375 0.635417 0.671875 0.53125C0.734375 0.421875 0.820313 0.335938 0.929688 0.273438C1.03385 0.205729 1.15365 0.171875 1.28906 0.171875C1.48177 0.171875 1.65104 0.242188 1.79688 0.382812L7.35938 6.07031L12.9219 0.382813C13.0677 0.242188 13.237 0.171875 13.4297 0.171875C13.5651 0.171875 13.6849 0.205729 13.7891 0.273438C13.8984 0.335938 13.9844 0.421875 14.0469 0.53125C14.1094 0.635417 14.1406 0.755208 14.1406 0.890625C14.1406 1.08854 14.0703 1.25781 13.9297 1.39844L7.875 7.59375C7.80208 7.66667 7.72396 7.72135 7.64062 7.75781C7.55208 7.79427 7.45833 7.8125 7.35938 7.8125Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                <div className={openTabs[item.id] ? "block pt-6" : "hidden"}>
                  {item.answer.map((ans) => (
                    <p>{ans}</p>
                  ))}
                </div>
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
