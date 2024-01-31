import React, { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
      <div className="flex max-w-96 overflow-x-auto items-center justify-start gap-1 md:gap-3 mb-12">
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
            <div
              key={team.id}
              className="p-4 bg-white dark:bg-white/5 dark:text-white font-body font-normal rounded-md"
            >
              <img
                src={`/${team.data.imageUrl}`}
                className="w-full h-full rounded-md object-cover max-h-[250px]"
                alt=""
              />
              <div className=" flex flex-col gap-2 mt-4">
                <h3 className=" text-2xl font-medium">{team.data.name}</h3>
                <p className=" text-base brand">{team.data.designation}</p>
                <p className="line-clamp-2">
                  Passionate about deep tech, artificial intelligence and making
                  the world a petter place.
                </p>
                <a href="">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="LinkedIn"
                      d="M0 1.85859C0 1.31985 0.189195 0.87541 0.567568 0.525253C0.945941 0.175079 1.43784 0 2.04324 0C2.63784 0 3.11891 0.17238 3.48649 0.517172C3.86486 0.872727 4.05406 1.33602 4.05406 1.90707C4.05406 2.42424 3.87028 2.85521 3.5027 3.2C3.12433 3.55556 2.62703 3.73333 2.01081 3.73333H1.9946C1.4 3.73333 0.918925 3.55556 0.551352 3.2C0.183778 2.84444 0 2.3973 0 1.85859ZM0.210811 16V5.20404H3.81081V16H0.210811ZM5.80541 16H9.40541V9.97172C9.40541 9.5946 9.44866 9.30369 9.53514 9.09899C9.68648 8.73265 9.91622 8.42288 10.2243 8.1697C10.5324 7.91649 10.9189 7.7899 11.3838 7.7899C12.5946 7.7899 13.2 8.60336 13.2 10.2303V16H16.8V9.8101C16.8 8.21548 16.4216 7.00606 15.6649 6.18182C14.9081 5.35758 13.9081 4.94545 12.6649 4.94545C11.2703 4.94545 10.1838 5.54343 9.40541 6.73939V6.77172H9.38919L9.40541 6.73939V5.20404H5.80541C5.82702 5.54882 5.83784 6.62086 5.83784 8.4202C5.83784 10.2195 5.82702 12.7461 5.80541 16Z"
                      fill="#6B7280"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        {/* card 1 */}
      </div>
    </div>
  );
};

export default MeetTheTeam;
