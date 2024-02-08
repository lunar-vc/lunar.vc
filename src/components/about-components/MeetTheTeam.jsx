import React, { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./MeetTheTeam.css";

const MeetTheTeam = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currUrl, setCurrUrl] = useState("");
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 150,
    easing: "ease-in-out",
  });

  useEffect(() => {
    setCurrUrl(window.location.pathname);
    async function fetchData() {
      const response = await fetch("/api/team.json");
      const data = await response.json();
      setTeams(data);
    }
    fetchData();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      // Toggle the selected tag
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
  };
  // methods
  const tempTags = teams.map((comp) => comp.data.tags.flat()).flat();
  const tags = tempTags.filter(
    (value, index) => tempTags.indexOf(value) === index
  );
  // Implement sorting logic based on the selected tags
  const filteredAndSortedArticles = teams.filter((article) => {
    if (selectedTags.length === 0) {
      return true; // Show all articles if no tags are selected
    }
    // Check if the article has at least one selected tag
    return article.data.tags.some((tag) => selectedTags.includes(tag));
  });

  return (
    <div className="pt-12">
      {currUrl === "/team" ? (
        ""
      ) : (
        <h2 className="text-4xl font-medium text-black mb-8 dark:text-white">
          Meet the Team
        </h2>
      )}
      {/*  filter tags */}
      <div className="flex flex-wrap  overflow-x-auto items-center justify-start gap-1 md:gap-3 mb-12">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className={`px-3 md:px-6 py-2 md:py-3 rounded-full  text-base flex items-center gap-2 ${
              selectedTags.includes(tag)
                ? "bg-[#D92977] text-white"
                : "bg-white dark:bg-white/5 dark:text-white text-black"
            }`}
          >
            {tag}
            {selectedTags.includes(tag) ? (
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.507812 12.3594C0.414062 12.2708 0.351562 12.1667 0.320312 12.0469C0.294271 11.9271 0.296875 11.8073 0.328125 11.6875C0.359375 11.5677 0.419271 11.4635 0.507812 11.375L5.50781 6.36719L0.507812 1.36719C0.419271 1.27865 0.359375 1.17448 0.328125 1.05469C0.302083 0.934896 0.302083 0.815104 0.328125 0.695312C0.359375 0.575521 0.419271 0.471354 0.507812 0.382812C0.596354 0.289062 0.700521 0.229167 0.820312 0.203125C0.940104 0.171875 1.0599 0.171875 1.17969 0.203125C1.30469 0.229167 1.41146 0.289062 1.5 0.382812L6.5 5.38281L11.5 0.382812C11.5885 0.289062 11.6927 0.229167 11.8125 0.203125C11.9323 0.171875 12.0521 0.171875 12.1719 0.203125C12.2917 0.229167 12.3984 0.289062 12.4922 0.382812C12.5807 0.471354 12.6406 0.575521 12.6719 0.695312C12.7031 0.815104 12.7031 0.934896 12.6719 1.05469C12.6406 1.17448 12.5807 1.27865 12.4922 1.36719L7.49219 6.36719L12.4922 11.375C12.5807 11.4635 12.638 11.5677 12.6641 11.6875C12.6953 11.8073 12.6953 11.9271 12.6641 12.0469C12.638 12.1667 12.5807 12.2708 12.4922 12.3594C12.4036 12.4531 12.2969 12.513 12.1719 12.5391C12.0521 12.5703 11.9323 12.5703 11.8125 12.5391C11.6927 12.5078 11.5885 12.4479 11.5 12.3594L6.5 7.35938L1.5 12.3594C1.41146 12.4479 1.30729 12.5078 1.1875 12.5391C1.06771 12.5703 0.947917 12.5703 0.828125 12.5391C0.708333 12.5078 0.601562 12.4479 0.507812 12.3594Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0546875 7.35938C0.0546875 7.16667 0.122396 7.0026 0.257812 6.86719C0.398438 6.72656 0.5625 6.65625 0.75 6.65625H5.80469V1.60938C5.80469 1.42188 5.8724 1.26042 6.00781 1.125C6.14323 0.984375 6.30729 0.914062 6.5 0.914062C6.69271 0.914062 6.85677 0.984375 6.99219 1.125C7.13281 1.26042 7.20312 1.42188 7.20312 1.60938V6.65625H12.25C12.4375 6.65625 12.599 6.72656 12.7344 6.86719C12.875 7.0026 12.9453 7.16667 12.9453 7.35938C12.9453 7.55208 12.875 7.71615 12.7344 7.85156C12.599 7.98698 12.4375 8.05469 12.25 8.05469H7.20312V13.1094C7.20312 13.2969 7.13281 13.4583 6.99219 13.5938C6.85677 13.7344 6.69271 13.8047 6.5 13.8047C6.30729 13.8047 6.14323 13.7344 6.00781 13.5938C5.8724 13.4583 5.80469 13.2969 5.80469 13.1094V8.05469H0.75C0.5625 8.05469 0.398438 7.98698 0.257812 7.85156C0.122396 7.71615 0.0546875 7.55208 0.0546875 7.35938Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      {/* card items */}
      <div ref={parent} className=" grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredAndSortedArticles?.length > 0 &&
          filteredAndSortedArticles.map((team) => (
            <a
              href={`team/${team.slug}`}
              key={team.id}
              className="inline-block"
            >
              <div className="p-4 bg-white dark:bg-white/5 dark:text-white font-body font-normal rounded-md h-full">
                <img
                  src={`/${team.data.imageUrl}`}
                  className="w-full h-full rounded-md object-cover max-h-[250px]"
                  alt=""
                />
                <div className=" flex flex-col gap-2 mt-4">
                  <h3 className=" text-2xl font-medium">{team.data.name}</h3>
                  <p className=" text-base brand">{team.data.designation}</p>
                  <p className="line-clamp-2">
                    Passionate about deep tech, artificial intelligence and
                    making the world a petter place.
                  </p>
                  <div className=" flex items-center gap-4 mt-3 pb-2">
                    {team.data.social.twitter && (
                      <a href={team.data.social.twitter}>
                        <svg
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height="18"
                          width="18"
                        >
                          <path
                            id="Vector"
                            d="M10.6756 7.62177L17.2324 0H15.6786L9.98536 6.61788L5.43815 0H0.193481L7.06976 10.0074L0.193481 18H1.74733L7.75958 11.0113L12.5618 18H17.8064L10.6752 7.62177H10.6756ZM8.54738 10.0956L7.85067 9.09906L2.3072 1.16971H4.69381L9.16746 7.56895L9.86417 8.56546L15.6794 16.8835H13.2928L8.54738 10.096V10.0956Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    )}
                    {team.data.social.linkedin && (
                      <a href={team.data.social.linkedin}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          class=""
                        >
                          <path
                            id="LinkedIn"
                            d="M0 2.42005C0 1.84284 0.202708 1.36665 0.608108 0.991481C1.01351 0.616295 1.54055 0.428711 2.18919 0.428711C2.82626 0.428711 3.34169 0.613403 3.73552 0.982823C4.14092 1.36378 4.34363 1.86016 4.34363 2.472C4.34363 3.02611 4.14672 3.48786 3.7529 3.85728C3.3475 4.23823 2.81467 4.42871 2.15444 4.42871H2.13707C1.49999 4.42871 0.984562 4.23823 0.590734 3.85728C0.196905 3.47633 0 2.99725 0 2.42005ZM0.225869 17.5716V6.00447H4.08301V17.5716H0.225869ZM6.22008 17.5716H10.0772V11.1127C10.0772 10.7086 10.1236 10.3969 10.2162 10.1776C10.3784 9.78512 10.6245 9.45323 10.9546 9.18195C11.2847 8.91066 11.6988 8.77503 12.1969 8.77503C13.4942 8.77503 14.1429 9.6466 14.1429 11.3897V17.5716H18V10.9395C18 9.23101 17.5946 7.9352 16.7838 7.05208C15.973 6.16897 14.9015 5.72741 13.5695 5.72741C12.0753 5.72741 10.9112 6.3681 10.0772 7.64949V7.68412H10.0598L10.0772 7.64949V6.00447H6.22008C6.24324 6.37387 6.25483 7.52249 6.25483 9.45035C6.25483 11.3782 6.24324 14.0853 6.22008 17.5716Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    )}
                    {team.data.social.website && (
                      <a href={team.data.social.website}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        {/* card 1 */}
      </div>
    </div>
  );
};

export default MeetTheTeam;
