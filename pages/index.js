import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../tina/__generated__/client";
import React, { useState, useEffect, useRef } from "react";

import menu from "../public/icons/menu.svg";
import download from "../public/icons/download.svg";
import link from "../public/icons/link.svg";
import close from "../public/icons/close.svg";

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const fontColor = data.page.themeSection.textColor;
  const backgroundColor1 = data.page.themeSection.backgroundColor1;
  const backgroundColor2 = data.page.themeSection.backgroundColor2;
  const backgroundColor3 = data.page.themeSection.backgroundColor3;
  const highlightColor = data.page.themeSection.highlightColor;
  const hoverColor = data.page.themeSection.hoverColor;
  const unactivatedColor = data.page.themeSection.unactivatedColor;
  const unactivatedHighlightTextColor =
    data.page.themeSection.unactivatedHighlightTextColor;
  const highlightTextColor = data.page.themeSection.highlightTextColor;
  const workshopsTextColor = data.page.themeSection.inactiveWorkshopsTextColor;
  const workshopsBackgroundColor =
    data.page.themeSection.inactiveWorkshopsBackgroundColor;
  const titleLineColor = data.page.themeSection.titleLineColor;

  // Add these at the top of your component function:
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedRef = useRef(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(
    data.page.workshopsSection.workshops[0].title || null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuSectionRef = useRef(null);
  const [viewLegalPage, setViewLegalPage] = useState(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        menuSectionRef.current &&
        !menuSectionRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClick);
      window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Add this useEffect hook in your component:
  useEffect(() => {
    const adjustHeight = () => {
      if (expandedRef.current) {
        const expanded = expandedRef.current;
        const containerWidth = expanded.offsetWidth;
        const boxWidth = 250;
        const gap = 16;
        const boxesPerRow = Math.floor(
          (containerWidth + gap) / (boxWidth + gap)
        );

        let firstRowHeight = 0;
        const children = expanded.children;
        for (let i = 0; i < Math.min(boxesPerRow, children.length); i++) {
          const childHeight = children[i].offsetHeight;
          const computedStyle = window.getComputedStyle(children[i]);
          const verticalMargin =
            parseFloat(computedStyle.marginTop) +
            parseFloat(computedStyle.marginBottom);
          firstRowHeight = Math.max(
            firstRowHeight,
            childHeight + verticalMargin
          );
        }

        expanded.style.maxHeight = isExpanded
          ? `${expanded.scrollHeight}px`
          : `${firstRowHeight}px`;
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, [isExpanded]);

  const ActionButton = ({
    actionButtonToggle,
    actionButtonLink,
    actionButtonText,
    fontColor,
    hoverColor,
    tinaField,
    additionalClasses = "",
  }) => {
    if (!actionButtonToggle) {
      return null;
    }

    return (
      <a
        href={actionButtonLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`actionButton group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden ${additionalClasses}`}
        style={{
          borderColor: fontColor,
          color: fontColor,
          "--button-color": fontColor,
          "--hover-color": hoverColor,
        }}
        data-tina-field={tinaField}
      >
        <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-transparent">
          {actionButtonText}
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          style={{ color: hoverColor }}
        >
          {actionButtonText}
        </span>
      </a>
    );
  };

  const DynamicSvg = ({ src, color, className }) => {
    const [svgContent, setSvgContent] = useState(null);

    useEffect(() => {
      fetch(src)
        .then((response) => response.text())
        .then((text) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(text, "image/svg+xml");
          const svgElement = svgDoc.documentElement;

          // Set the color for both stroke and fill
          svgElement.querySelectorAll("*").forEach((el) => {
            if (el.getAttribute("stroke")) {
              el.setAttribute("stroke", color);
            }
            if (el.getAttribute("fill") && el.getAttribute("fill") !== "none") {
              el.setAttribute("fill", color);
            }
          });

          setSvgContent(svgElement.outerHTML);
        });
    }, [src, color]);

    if (!svgContent) {
      return null;
    }

    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  };

  return (
    <div
      style={{
        backgroundColor: backgroundColor1,
      }}
    >
      {isMobileMenuOpen &&
        (data.page.researchSection.researchToggle ||
          data.page.workshopsSection.workshopsToggle ||
          data.page.header.actionButton.actionButtonToggle) && (
          <div
            className="absolute top-0 left-0 w-full h-full md:hidden transition-all duration-300 ease-in-out"
            id="menuOverlay"
          >
            <div
              className="absolute top-0 left-0 w-full h-full"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
              className="absolute top-0 right-0 flex flex-col justify-end pt-10 px-8 sm:px-16 transition-all duration-300 ease-in-out"
              id="menuSection"
              ref={menuSectionRef}
            >
              <div
                className="shadow-md p-6 rounded-md flex flex-col gap-4 text-center transition-all duration-300 ease-in-out"
                style={{
                  backgroundColor: backgroundColor2,
                  color: fontColor,
                }}
              >
                <div
                  className="w-6 h-6 cursor-pointer mx-auto"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DynamicSvg
                    src={close.src}
                    color={fontColor}
                    className="w-full h-full"
                  />
                </div>
                {data.page.researchSection.researchToggle && (
                  <a
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document
                        .getElementById("researchSection")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs lg:text-sm xl:text-base my-auto font-semibold cursor-pointer"
                  >
                    Research
                  </a>
                )}
                {data.page.workshopsSection.workshopsToggle && (
                  <a
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document
                        .getElementById("workshopsSection")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs lg:text-sm xl:text-base my-auto lg:mx-10 xl:mx-14 font-semibold cursor-pointer"
                  >
                    Past Workshops
                  </a>
                )}

                <ActionButton
                  actionButtonToggle={
                    data.page.header.actionButton.actionButtonToggle
                  }
                  actionButtonLink={
                    data.page.header.actionButton.actionButtonLink
                  }
                  actionButtonText={data.page.header.actionButton.actionButton}
                  fontColor={fontColor}
                  hoverColor={hoverColor}
                  tinaField={tinaField(data.page.header, "actionButton")}
                />
              </div>
            </div>
          </div>
        )}
      {viewLegalPage && (
        <div
          className="h-screen w-screen px-10 sm:px-20 md:px-24 lg:px-32 pt-14"
          style={{
            backgroundColor: backgroundColor1,
            color: fontColor,
          }}
        >
          <div className="absolute top-0 left-0 w-screen h-auto flex flex-row justify-end px-10 sm:px-20 md:px-24 lg:px-32">
            <div
              className="w-6 h-6 cursor-pointer  pt-14"
              onClick={() => setViewLegalPage(null)}
            >
              <DynamicSvg
                src={close.src}
                color={fontColor}
                className="w-full h-full"
              />
            </div>
          </div>
          {data.page.footer.footerLegalPages.map((item, index) => {
            if (item.title === viewLegalPage) {
              return (
                <>
                  <div
                    className="text-xl font-medium text-left pb-4"
                    data-tina-field={tinaField(item, "title")}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-sm font-light ttext-left"
                    data-tina-field={tinaField(item, "content")}
                  >
                    <TinaMarkdown content={item.content} />
                  </div>
                </>
              );
            }
          })}
        </div>
      )}

      {/* display media queries */}
      {/* <div className="fixed top-0 left-0 w-12 h-12 bg-blue-400 sm:bg-green-300 md:bg-yellow-400 lg:bg-red-300 xl:bg-purple-300"></div> */}

      {!viewLegalPage && (
        <>
          <div
            className="px-10 sm:px-20 md:px-24 lg:px-32 pt-14"
            style={{ color: fontColor, backgroundColor: backgroundColor1 }}
            id="headerSection"
          >
            <div className="flex flex-row justify-between">
              <a
                href="#"
                className="max-h-max w-auto flex flex-col justify-center"
              >
                <img
                  alt="home-logo"
                  className=" w-3/5 sm:w-auto sm:h-10 bg-cover bg-no-repeat"
                  data-tina-field={tinaField(data.page.header, "logo")}
                  src={data.page.header.logo}
                />
              </a>
              {(data.page.researchSection.researchToggle ||
                data.page.workshopsSection.workshopsToggle ||
                data.page.header.actionButton.actionButtonToggle) && (
                <a
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="max-h-max w-auto flex flex-col justify-center md:hidden cursor-pointer"
                >
                  <div className="h-7 w-auto">
                    <DynamicSvg
                      src={menu.src}
                      color={fontColor}
                      className="w-full h-full"
                    />
                  </div>
                </a>
              )}
              <div className="hidden md:flex flex-row justify-between">
                {data.page.researchSection.researchToggle && (
                  <a
                    onClick={() => {
                      document
                        .getElementById("researchSection")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs lg:text-sm xl:text-base my-auto font-semibold cursor-pointer"
                  >
                    Research
                  </a>
                )}
                {data.page.workshopsSection.workshopsToggle && (
                  <a
                    onClick={() => {
                      document
                        .getElementById("workshopsSection")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs lg:text-sm xl:text-base my-auto ml-5 lg:ml-10 xl:ml-14 font-semibold cursor-pointer"
                  >
                    Past Workshops
                  </a>
                )}

                <ActionButton
                  actionButtonToggle={
                    data.page.header.actionButton.actionButtonToggle
                  }
                  actionButtonLink={
                    data.page.header.actionButton.actionButtonLink
                  }
                  actionButtonText={data.page.header.actionButton.actionButton}
                  fontColor={fontColor}
                  hoverColor={hoverColor}
                  tinaField={tinaField(data.page.header, "actionButton")}
                  additionalClasses="ml-5 lg:ml-10 xl:ml-14"
                />
              </div>
            </div>
          </div>
          {data.page.heroSection.heroToggle && (
            <div
              className="px-10 sm:px-20 md:px-24 lg:px-32"
              style={{ color: fontColor, backgroundColor: backgroundColor1 }}
              id="heroSection"
            >
              <div
                className="md:hidden w-full h-52 sm:h-64 mt-10 sm:my-10 bg-main bg-cover bg-right rounded-md"
                style={{
                  backgroundImage: `url(${data.page.heroSection.mainImage})`,
                }}
                data-tina-field={tinaField(data.page.heroSection, "mainImage")}
              ></div>
              <img
                alt="main image"
                className="hidden md:flex w-max bg-contain bg-no-repeat my-10 lg:my-12 rounded-md"
                data-tina-field={tinaField(data.page.heroSection, "mainImage")}
                src={data.page.heroSection.mainImage}
              />
              <div className="mt-8 flex flex-col md:flex-row gap-6 md:justify-between">
                <div
                  className="text-2xl sm:text-3xl md:text-4xs md:w-400 leading-snug md:leading-normal text-center md:text-left"
                  data-tina-field={tinaField(data.page.heroSection, "title")}
                >
                  <TinaMarkdown content={data.page.heroSection.title} />
                </div>
                <div className="font-light text-xs text-center leading-snug md:w-150 md:text-left md:text-3xs md:mt-2">
                  <div
                    data-tina-field={tinaField(
                      data.page.heroSection,
                      "aboutPara1"
                    )}
                  >
                    {data.page.heroSection.aboutPara1}
                  </div>
                  <div
                    className="mt-3"
                    data-tina-field={tinaField(
                      data.page.heroSection,
                      "aboutPara2"
                    )}
                  >
                    {data.page.heroSection.aboutPara2}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-3 md:gap-6">
                {data.page.heroSection.downloadButton.actionButtonToggle && (
                  <a
                    href={
                      data.page.heroSection.downloadButton.downloadButtonFile
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="order-2 mx-auto md:mx-0 text-xs lg:text-sm xl:text-base font-semibold flex flex-row md:my-auto items-center"
                  >
                    <div
                      data-tina-field={tinaField(
                        data.page.heroSection.downloadButton,
                        "actionButton"
                      )}
                    >
                      {data.page.heroSection.downloadButton.actionButton}
                    </div>
                    <div className="w-3 h-3 ml-1 flex items-center justify-center">
                      <DynamicSvg
                        src={download.src}
                        color={fontColor}
                        className="w-full h-full"
                      />
                    </div>
                  </a>
                )}
                <ActionButton
                  actionButtonToggle={
                    data.page.heroSection.actionButton.actionButtonToggle
                  }
                  actionButtonLink={
                    data.page.heroSection.actionButton.actionButtonLink
                  }
                  actionButtonText={
                    data.page.heroSection.actionButton.actionButton
                  }
                  fontColor={fontColor}
                  hoverColor={hoverColor}
                  tinaField={tinaField(data.page.heroSection, "actionButton")}
                  additionalClasses="order-1 mx-auto md:mx-0 text-xs lg:text-sm xl:text-base my-auto "
                />
              </div>
            </div>
          )}

          {data.page.researchSection.researchToggle && (
            <div
              className="px-10 sm:px-20 md:px-24 lg:px-32 mt-16 lg:mt-20 py-16 lg:py-20"
              style={{ color: fontColor, backgroundColor: backgroundColor2 }}
              id="researchSection"
            >
              <div className="flex flex-row justify-center md:justify-between">
                <div className="text-2xl lg:text-3xl xl:text-4xl text-center md:text-left">
                  Recent Research
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`hidden md:flex actionButton group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden mr-0 mt-2.5`}
                  style={{
                    borderColor: fontColor,
                    color: fontColor,
                    "--button-color": fontColor,
                    "--hover-color": hoverColor,
                  }}
                  href="#researchSection"
                >
                  <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-transparent">
                    {isExpanded ? "See less -" : "See all research +"}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    style={{ color: hoverColor }}
                  >
                    {isExpanded ? "See less -" : "See all research +"}
                  </span>
                </button>
              </div>
              <hr
                className="w-auto my-4 md:my-6 xl:mb-10"
                style={{ borderColor: titleLineColor }}
              />
              <div
                ref={expandedRef}
                className="grid gap-4 transition-[max-height] duration-500 ease-in-out overflow-hidden -mt-6"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                  gridAutoRows: "auto",
                }}
              >
                {data.page.researchSection.researchItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row justify-center mt-8 gap-4"
                    >
                      <div
                        className="p-4.5 flex flex-col shadow-2xl shadow-stone-200/50 border rounded-lg h-full"
                        style={{
                          backgroundColor: backgroundColor1,
                          borderColor: backgroundColor3,
                        }}
                      >
                        <div
                          className="text-sm font-semibold leading-4.5"
                          data-tina-field={tinaField(item, "title")}
                        >
                          {item.title}
                        </div>
                        <div
                          className="pt-1.5 text-xs font-extralight mt-0 mb-3"
                          data-tina-field={tinaField(item, "authors")}
                        >
                          {item.authors}
                        </div>
                        <div className="flex flex-row mt-auto justify-self-end">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tina-field={tinaField(item, "link")}
                            className="flex flex-row bg-slate-100 rounded-lg h-12 px-3 flex-1"
                          >
                            <div className="w-5 h-5 mr-1 my-auto -rotate-45">
                              <DynamicSvg
                                src={link.src}
                                color={fontColor}
                                className="w-full h-full"
                                key={index}
                              />
                            </div>
                            <div className="text-xs my-auto line-clamp-2">
                              {item.journal}
                            </div>
                          </a>
                          <a
                            href={item.pdf || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-tina-field={tinaField(item, "pdf")}
                            className={`flex flex-row rounded-lg h-12 w-12 ml-3 ${
                              item.pdf ? "cursor-pointer" : "cursor-default"
                            }`}
                            style={{
                              backgroundColor: item.pdf
                                ? highlightColor
                                : unactivatedColor,
                            }}
                            onClick={(e) => {
                              if (!item.pdf) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <div className="h-4 w-4 mx-auto my-auto">
                              <DynamicSvg
                                src={download.src}
                                color={
                                  item.pdf
                                    ? highlightTextColor
                                    : unactivatedHighlightTextColor
                                }
                                className="w-full h-full"
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className={`w-full mt-6 flex flex-col justify-center ${
                  isExpanded ? "" : "md:hidden"
                }`}
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`actionButton group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden mx-auto mt-2.5`}
                  style={{
                    borderColor: fontColor,
                    color: fontColor,
                    "--button-color": fontColor,
                    "--hover-color": hoverColor,
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-transparent">
                    {isExpanded ? "See less -" : "See all research +"}
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    style={{ color: hoverColor }}
                  >
                    {isExpanded ? "See less -" : "See all research +"}
                  </span>
                </button>
              </div>
            </div>
          )}
          {data.page.aboutSection.aboutToggle && (
            <div
              className="flex flex-col lg:flex-row lg:mx-32 lg:gap-10 lg:justify-between py-16 lg:py-20"
              id="aboutSection"
              style={{ color: fontColor, backgroundColor: backgroundColor1 }}
            >
              <div className="flex flex-col mx-16 sm:mx-20 md:mx-24 lg:mx-0">
                <div className="flex flex-col md:flex-row justify-between">
                  <img
                    alt="sponsor logo"
                    className="w-max md:w-auto h-auto sm:w-64 md:h-40 lg:h-50 mx-auto my-auto rounded-md"
                    data-tina-field={tinaField(
                      data.page.aboutSection.sponsor,
                      "sponsorImage"
                    )}
                    src={data.page.aboutSection.sponsor.sponsorImage}
                  />
                  <div className="flex flex-col md:ml-10 lg:mr-10">
                    <div
                      className="text-2xl md:text-xl xl:text-2xl font-bold text-center md:text-left mt-5 md:mt-0"
                      style={{ color: fontColor }}
                    >
                      Official Sponsor
                    </div>
                    <div
                      className="text-lg md:text-base xl:text-lg font-semibold text-center md:text-left leading-5 my-3 md:mt-2 md:mb-0"
                      data-tina-field={tinaField(
                        data.page.aboutSection.sponsor,
                        "sponsorName"
                      )}
                      style={{ color: fontColor }}
                    >
                      {data.page.aboutSection.sponsor.sponsorName}
                    </div>
                    <div
                      className="text-base md:text-sm xl:text-base font-light text-center md:text-left"
                      data-tina-field={tinaField(
                        data.page.aboutSection.sponsor,
                        "sponsorDescription"
                      )}
                      style={{ color: fontColor }}
                    >
                      {data.page.aboutSection.sponsor.sponsorDescription}
                    </div>
                    {data.page.aboutSection.sponsor.sponsorLinkDisplayText && (
                      <a
                        href={data.page.aboutSection.sponsor.sponsorLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-sm xl:text-base font-semibold text-center mt-3 md:text-left"
                        data-tina-field={tinaField(
                          data.page.aboutSection.sponsor,
                          "sponsorLinkDisplayText"
                        )}
                        style={{ color: fontColor }}
                      >
                        {data.page.aboutSection.sponsor.sponsorLinkDisplayText}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-col md:mx-24 lg:mx-0 md:justify-between xl:justify-start md:mt-10 lg:mt-0 lg:w-96 xl:w-200">
                <div
                  className="text-2xl md:text-xl xl:text-2xl font-bold text-center mt-8 mb-1 md:my-auto"
                  style={{ color: fontColor }}
                >
                  Workshop Facilitators
                </div>
                <div>
                  <div
                    className="text-lg md:text-base xl:text-lg font-semibold text-center leading-5 my-2 md:mt-0 xl:mb-0"
                    data-tina-field={tinaField(
                      data.page.aboutSection.workshopFacilitators,
                      "name1"
                    )}
                    style={{ color: fontColor }}
                  >
                    {data.page.aboutSection.workshopFacilitators.name1}
                  </div>
                  <div
                    className="text-md md:text-sm xl:text-md font-light text-center mb-4 md:mb-0 xl:mb-2"
                    data-tina-field={tinaField(
                      data.page.aboutSection.workshopFacilitators,
                      "university1"
                    )}
                    style={{ color: fontColor }}
                  >
                    {data.page.aboutSection.workshopFacilitators.university1}
                  </div>
                </div>
                <div>
                  <div
                    className="text-lg md:text-base xl:text-lg font-semibold text-center leading-5 my-2 md:mt-0 xl:mb-0"
                    data-tina-field={tinaField(
                      data.page.aboutSection.workshopFacilitators,
                      "name2"
                    )}
                    style={{ color: fontColor }}
                  >
                    {data.page.aboutSection.workshopFacilitators.name2}
                  </div>
                  <div
                    className="text-md md:text-sm xl:text-md font-light text-center xl:mb-2"
                    data-tina-field={tinaField(
                      data.page.aboutSection.workshopFacilitators,
                      "university2"
                    )}
                    style={{ color: fontColor }}
                  >
                    {data.page.aboutSection.workshopFacilitators.university2}
                  </div>
                </div>
              </div>
            </div>
          )}
          {data.page.workshopsSection.workshopsToggle && (
            <div
              className="w-full py-16 lg:py-20 px-16 md:px-24 lg:px-32"
              style={{ backgroundColor: backgroundColor2 }}
              id="workshopsSection"
            >
              <div
                className="text-2xl lg:text-3xl md:text-left text-center"
                style={{ color: fontColor }}
              >
                Past Workshops
              </div>
              <hr
                className="w-auto my-4 md:my-6 xl:mb-10"
                style={{ borderColor: titleLineColor }}
              />
              <div className="flex flex-row justify-center md:justify-start mt-8 mx-auto">
                <div className="flex flex-row gap-2">
                  {data.page.workshopsSection.workshops.map((item, index) => {
                    if (item.title === selectedWorkshop) {
                      return (
                        <div
                          className="rounded-md px-4 py-1.5 font-semibold transition-all duration-300 ease-in-out"
                          style={{
                            color: highlightTextColor,
                            backgroundColor: highlightColor,
                          }}
                          data-tina-field={tinaField(item, "year")}
                          key={index}
                          onClick={() => setSelectedWorkshop(item.title)}
                        >
                          {new Date(item.year).getFullYear()}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="rounded-md px-4 py-1.5 font-semibold cursor-pointer transition-all duration-300 ease-in-out"
                          style={{
                            color: workshopsTextColor,
                            backgroundColor: workshopsBackgroundColor,
                          }}
                          data-tina-field={tinaField(item, "year")}
                          key={index}
                          onClick={() => setSelectedWorkshop(item.title)}
                        >
                          {new Date(item.year).getFullYear()}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {data.page.workshopsSection.workshops.map((item, index) => {
                if (item.title === selectedWorkshop) {
                  return (
                    <div key={index}>
                      <div
                        className="text-xl font-semibold text-center md:text-left mt-6 mb-1 transition-all duration-300 ease-in-out"
                        style={{
                          color: fontColor,
                        }}
                        data-tina-field={tinaField(item, "title")}
                      >
                        {item.title}
                      </div>
                      <div className="flex flex-col">
                        <div
                          className="text-sm font-light text-center mt-6 md:my-4 md:text-left"
                          style={{
                            color: fontColor,
                          }}
                          data-tina-field={tinaField(item, "description")}
                        >
                          {item.description}
                        </div>
                        <img
                          alt="image1"
                          className="w-full mt-6 rounded-md"
                          src={item.poster}
                          data-tina-field={tinaField(item, "poster")}
                        />
                        <div className="flex overflow-x-auto overflow-y-hidden gap-2 pt-2">
                          {item.images.map((image, index) => {
                            return (
                              <div key={index} className="flex-shrink-0">
                                <img
                                  className="h-20 sm:h-32 md:h-40 w-auto rounded-md"
                                  data-tina-field={tinaField(image, "image")}
                                  src={image.image}
                                  alt={`Image ${index}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
          {data.page.footer.footerToggle && (
            <div
              className="w-full py-16 lg:py-20 px-16 md:px-24 lg:px-32 flex flex-col lg:flex-row justify-between"
              style={{ backgroundColor: backgroundColor1, color: fontColor }}
              id="footer"
            >
              <div
                className="text-sm font-light text-center lg:text-left"
                data-tina-field={tinaField(data.page.footer, "footerText")}
              >
                <TinaMarkdown content={data.page.footer.footerText} />
              </div>
              <div className="flex flex-col lg:flex-row mt-4 lg:mt-0">
                {data.page.footer.contactEmail.contactEmailToggle && (
                  <a
                    href={`mailto:${data.page.footer.contactEmail.contactEmail}`}
                    data-tina-field={tinaField(
                      data.page.footer.contactEmail,
                      "contactEmailText"
                    )}
                    className="text-sm text-center lg:text-left font-medium"
                  >
                    {data.page.footer.contactEmail.contactEmailText}
                  </a>
                )}
                {data.page.footer.footerLegalPages.map((item, index) => {
                  return (
                    <div
                      className="text-sm text-center lg:text-left font-medium mt-2 md:mt-0 lg:ml-4 cursor-pointer"
                      data-tina-field={tinaField(item, "title")}
                      key={index}
                      onClick={() => setViewLegalPage(`${item.title}`)}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx", // Adjust the path if needed
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
