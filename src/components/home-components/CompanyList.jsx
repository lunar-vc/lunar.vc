import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./CompanyList.css";
const CompanList = ({ companies, tags }) => {
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

  const getCleanTagName = (tagName) => {
    return tagName.replace(/-/g, " ");
  };

  return (
    <section className="portcomp w-full pb-12 pt-6" data-aos="fade-up">
      <div className="max-w-5xl mx-auto pt-12 pb-24">
        <h2 className=" text-center uppercase text-xl font-bold text-[#111628] dark:text-white mb-8">
          Our portfolio companies
        </h2>

        <div className="flex flex-wrap items-center justify-center  gap-2 md:gap-3 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-nowrap  text-base flex items-center gap-2 ${
                selectedTags.includes(tag)
                  ? "bg-black dark:bg-[#D92977]  text-white dark:text-white"
                  : "bg-white dark:bg-[#374151]  text-black dark:text-white "
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

        <div
          ref={parent}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {filteredAndSortedArticles.map(({ data, ...rest }, index) => (
            <a href={`/portfolio/${rest.slug}`} key={index}>
              <div className="p-6 bg-white/50 dark:bg-white/[.08] dark:border-white/[.08] backdrop-blur-[6px] rounded-xl hover:shadow-md dark:hover:shadow-[#d9297861]  transition-shadow">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="w-[88px] h-[88px] flex-1">
                    <img
                      src={data.logo}
                      className="w-[88px] h-[88px] rounded-lg object-cover dark:hidden"
                      alt=""
                    />
                    <img
                      src={data.darkLogo}
                      className="w-[88px] h-[88px] rounded-lg object-cover hidden  dark:block"
                      alt=""
                    />
                  </div>
                  <span className="px-4 py-3 rounded-full  dark:border-white/10 brand bg-[#FDF2F8] dark:bg-[#EA4A9933] text-sm text-nowrap whitespace-nowrap">
                    {getCleanTagName(data.tags[0])}
                  </span>
                </div>
                <span className="compTitle font-content text-sm   overflow-hidden overflow-ellipsis text-wrap line-clamp-1 dark:text-white">
                  {data.compTitle}
                </span>
                <h3 className="compDes line-clamp-2 text-wrap text-2xl text-ellipsis overflow-hidden dark:text-white">
                  {data.compDescription}
                </h3>
              </div>
            </a>
          ))}
        </div>

        <div className="w-full flex items-center justify-center">
          <a
            href="/portfolio"
            className="py-4 px-6 rounded-xl text-white bg-black dark:bg-white/5 dark:backdrop-blur-[6px] dark:border-white/10 dark:border font inline-flex items-center gap-2"
          >
            Show more
            <span>
              <img src="icons/linkopen.svg" alt="" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanList;
