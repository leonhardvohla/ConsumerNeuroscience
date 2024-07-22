import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../tina/__generated__/client";
import { ReactSVG } from "react-svg";

import menu from "../public/icons/menu.svg";
import download_black from "../public/icons/download-black.svg";

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
        className={`group text-xs lg:text-sm xl:text-base my-auto border px-4 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out relative overflow-hidden ${additionalClasses}`}
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
    return (
      <ReactSVG
        src={src}
        beforeInjection={(svg) => {
          svg.querySelectorAll("*").forEach((el) => {
            if (el.getAttribute("stroke")) {
              el.setAttribute("stroke", color);
            }
            if (el.getAttribute("fill") && el.getAttribute("fill") !== "none") {
              el.setAttribute("fill", color);
            }
          });
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
        }}
        className={className}
      />
    );
  };

  return (
    <div>
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
            className="hidden md:flex w-max bg-contain bg-no-repeat my-10 lg:my-12 rounded-lg"
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
                <div className="ml-1.5 md:ml-2 h-2.5 md:h-3 w-2.5 md:w-3 md:-mt-0.5">
                  <DynamicSvg
                    src={download_black.src}
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
