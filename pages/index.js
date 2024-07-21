import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import menu from "../public/icons/menu.svg";

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <div>
      <div className="fixed top-0 left-0 w-12 h-12 bg-blue-400 sm:bg-green-300 md:bg-yellow-400 lg:bg-red-300 xl:bg-purple-300">
        hi
      </div>

      <div className="mx-16 sm:mx-20 md:mx-24 lg:mx-32 mt-14">
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
            <img
              alt="menu-icon"
              className="h-5 bg-cover bg-no-repeat"
              src={menu.src}
            />
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
            <a
              href="#"
              className="text-xs lg:text-sm xl:text-base my-auto border border-black px-4 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
              data-tina-field={tinaField(data.page.header, "actionButton")}
            >
              2022 Register
            </a>
          </div>
        </div>
        <div className="md:hidden w-full h-52 sm:h-64 mt-10 sm:my-10 bg-main bg-cover bg-right rounded-md"></div>
        <img
          alt="main image"
          className="hidden md:flex w-max bg-contain bg-no-repeat my-10 lg:my-12 rounded-lg"
          data-tina-field={tinaField(data.page.heroSection, "mainImage")}
          src={data.page.heroSection.mainImage}
        />
      </div>
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
