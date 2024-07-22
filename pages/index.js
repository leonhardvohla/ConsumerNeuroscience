import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../tina/__generated__/client";
import { ReactSVG } from "react-svg";
import { useState, useEffect } from "react";

import menu from "../public/icons/menu.svg";
import download from "../public/icons/download.svg";
import link from "../public/icons/link.svg";
import { da } from "date-fns/locale";

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
      <div className="fixed top-0 left-0 w-12 h-12 bg-blue-400 sm:bg-green-300 md:bg-yellow-400 lg:bg-red-300 xl:bg-purple-300">
        hi
      </div>

      <div
        className="px-16 sm:px-20 md:px-24 lg:px-32 pt-14"
        style={{ color: fontColor, backgroundColor: backgroundColor1 }}
        id="headerSection"
      >
        <div className="flex flex-row justify-between">
          <a href="#" className="max-h-max w-auto flex flex-col justify-center">
            <img
              alt="home-logo"
              className=" w-3/5 sm:w-auto sm:h-10 bg-cover bg-no-repeat"
              data-tina-field={tinaField(data.page.header, "logo")}
              src={data.page.header.logo}
            />
          </a>
          <a
            href="#"
            className="max-h-max w-auto flex flex-col justify-center md:hidden"
          >
            <div className="h-7 w-7">
              <DynamicSvg
                src={menu.src}
                color={fontColor}
                className="w-full h-full"
              />
            </div>
          </a>
          <div className="hidden md:flex flex-row justify-between">
            <a
              href="#"
              className="text-xs lg:text-sm xl:text-base my-auto font-semibold"
            >
              Research
            </a>
            <a
              href="#"
              className="text-xs lg:text-sm xl:text-base my-auto mx-5 lg:mx-10 xl:mx-14 font-semibold"
            >
              Past Workshops
            </a>

            <ActionButton
              actionButtonToggle={
                data.page.header.actionButton.actionButtonToggle
              }
              actionButtonLink={data.page.header.actionButton.actionButtonLink}
              actionButtonText={data.page.header.actionButton.actionButton}
              fontColor={fontColor}
              hoverColor={hoverColor}
              tinaField={tinaField(data.page.header, "actionButton")}
            />
          </div>
        </div>
      </div>
      {data.page.heroSection.heroToggle && (
        <div
          className="px-16 sm:px-20 md:px-24 lg:px-32"
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
                data-tina-field={tinaField(data.page.heroSection, "aboutPara1")}
              >
                {data.page.heroSection.aboutPara1}
              </div>
              <div
                className="mt-3"
                data-tina-field={tinaField(data.page.heroSection, "aboutPara2")}
              >
                {data.page.heroSection.aboutPara2}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-3 md:gap-6">
            {data.page.heroSection.downloadButton.actionButtonToggle && (
              <a
                href={data.page.heroSection.downloadButton.downloadButtonFile}
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
              actionButtonText={data.page.heroSection.actionButton.actionButton}
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
          className="px-16 sm:px-20 md:px-24 lg:px-32 mt-12 md:mt-14 xl:mt-18 py-10"
          style={{ color: fontColor, backgroundColor: backgroundColor2 }}
          id="researchSection"
        >
          <div className="flex flex-row justify-center md:justify-between">
            <div className="text-2xl lg:text-3xl xl:text-4xl text-center md:text-left">
              Recent Research
            </div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:flex actionButton group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden mr-0 mt-2.5`}
              style={{
                borderColor: fontColor,
                color: fontColor,
                "--button-color": fontColor,
                "--hover-color": hoverColor,
              }}
            >
              <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-transparent">
                See all research +
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                style={{ color: hoverColor }}
              >
                See all research +
              </span>
            </a>
          </div>
          <hr className="w-auto my-4 bg-stone-500 md:my-6 xl:mb-10" />
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gridAutoRows: "auto",
            }}
          >
            {data.page.researchSection.researchItems.map((item, index) => {
              console.log("Current fontColor:", fontColor);
              return (
                <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
                  <div className="p-4.5 flex flex-col bg-white shadow-2xl shadow-stone-200/50 border border-slate-100 rounded-lg h-full">
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
                        <div className="text-xs my-auto">{item.journal}</div>
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
          <div className="w-full mt-6 flex flex-col justify-center md:hidden">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`actionButton group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden mx-auto mt-2.5`}
              style={{
                borderColor: fontColor,
                color: fontColor,
                "--button-color": fontColor,
                "--hover-color": hoverColor,
              }}
            >
              <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-transparent">
                See all research +
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                style={{ color: hoverColor }}
              >
                See all research +
              </span>
            </a>
          </div>
        </div>
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
