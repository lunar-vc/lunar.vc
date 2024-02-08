import React, { useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const PortfolioItem = ({ companies, tags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });
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

  // Implement sorting logic based on the selected tags
  const filteredAndSortedArticles = companies.filter((article) => {
    if (selectedTags.length === 0) {
      return true; // Show all articles if no tags are selected
    }
    // Check if the article has at least one selected tag
    return article.data.tags.some((tag) => selectedTags.includes(tag));
  });

  useEffect(() => {
    // Parse the tag from the URL
    const urlTag = new URL(window.location.href).hash.slice(1);

    if (tags.includes(urlTag)) {
      setSelectedTags([urlTag]);
    }
  }, [tags]);
  return (
    <section className="portcomp w-full mb-8">
      <div className="">
        <div className="flex md:flex-wrap  overflow-x-auto md:overflow-x-visible items-center justify-start gap-1 md:gap-3 mb-12 backdrop-blur-[6px] ">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-full  text-base flex items-center gap-2 text-nowrap hover:shadow-md dark:hover:shadow-[#d9297861]  transition-shadow ${
                selectedTags.includes(tag)
                  ? "bg-[#D92977] text-white"
                  : "bg-white text-black dark:bg-white/5 dark:text-white"
              }`}
            >
              {tag}{" "}
              {selectedTags.includes(tag) ? (
                <img src="/icons/cross-white.svg" alt="" />
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

        {/* extra */}
        <div
          ref={parent}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
        >
          {filteredAndSortedArticles.map(({ data, ...rest }, index) => (
            <a href={`/portfolio/${rest.slug}`} key={index}>
              <div className="py-6 h-full overflow-y-hidden px-5 rounded-lg bg-white/5 dark:bg-white/5 dark:text-white border dark:border-white/5 backdrop-blur hover:shadow-md dark:hover:shadow-[#d9297861]  transition-shadow">
                <img
                  src={data.thumbnails}
                  alt=""
                  className="w-[100px] h-[100px] rounded-md mb-4 object-cover"
                />
                <span className="mb-3 text-2xl">{data.compTitle}</span>
                <p className="mb-4 text-[#6B7280] line-clamp-2 text-wrap text-base text-ellipsis overflow-hidden">
                  {data.compDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className=" brand text-sm px-2 py-1 rounded-full bg-[#FDF2F8] dark:bg-white/5 border-[#FBCFE8] dark:border-white/5 border text-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioItem;
