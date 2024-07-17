import { FieldDescription } from "tinacms";

/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    {
      name: "header",
      label: "Header",
      type: "object",
      fields: [
        {
          name: "logo",
          label: "Logo",
          type: "image",
          description: "The logo for the site",
        },
        {
          name: "actionButton",
          label: "Action Button",
          type: "object",
          fields: [
            {
              name: "actionButtonToggle",
              label: "Display Action Button",
              type: "boolean",
              description: "Toggle the display of the action button",
            },
            {
              name: "actionButton",
              label: "Action Button",
              type: "string",
              description: "The text for the action button",
            },
            {
              name: "actionButtonLink",
              label: "Action Button Link",
              type: "string",
              description:
                "The link for the action button, e.g. https://example.com",
            },
          ],
        },
      ],
    },
    {
      name: "heroSection",
      label: "Hero Section",
      type: "object",
      fields: [
        {
          name: "heroToggle",
          label: "Display Hero Section",
          type: "boolean",
          description: "Toggle the display of the section",
        },
        {
          name: "mainImage",
          label: "Main Image",
          type: "image",
          description: "The main image for the hero section",
        },
        {
          name: "title",
          label: "Title",
          type: "rich-text",
          description: "The title for the hero section",
        },
        {
          name: "aboutPara1",
          label: "Description Paragraph 1",
          type: "string",
          description: "The first paragraph for description",
        },
        {
          name: "aboutPara2",
          label: "Description Paragraph 2",
          type: "string",
          description: "The second paragraph for description",
        },
        {
          name: "actionButton",
          label: "Action Button",
          type: "object",
          fields: [
            {
              name: "actionButtonToggle",
              label: "Display Action Button",
              type: "boolean",
              description: "Toggle the display of the action button",
            },
            {
              name: "actionButton",
              label: "Action Button",
              type: "string",
              description: "The text for the action button",
            },
            {
              name: "actionButtonLink",
              label: "Action Button Link",
              type: "string",
              description:
                "The link for the action button, e.g. https://example.com",
            },
          ],
        },
      ],
    },
    {
      name: "researchSection",
      label: "Research Section",
      type: "object",
      fields: [
        {
          name: "researchToggle",
          label: "Display Research Section",
          type: "boolean",
          description: "Toggle the display of the section",
        },
        {
          name: "researchSort",
          label: "Sort Research",
          type: "string",
          description: "Sort the research by date, title, or manually",
          options: ["Date (most recent first)", "Title (A-Z)", "Manual"],
        },
        {
          name: "researchItems",
          label: "Research Papers",
          type: "object",
          description: "The list of research papers",
          list: true,
          defaultItem: () => {
            return {
              title: "New Research Paper",
              date: new Date().toISOString(),
              authors: "Author 1, Author 2",
              journal: "Journal Name",
              link: "https://example.com",
            };
          },
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Untitled Paper",
            }),
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
              description: "The title for the research paper",
              required: true,
            },
            {
              name: "date",
              label: "Date",
              type: "datetime",
              description: "The date for the research paper",
            },
            {
              name: "authors",
              label: "Authors",
              type: "string",
              description: "The authors for the research paper",
              required: true,
            },
            {
              name: "journal",
              label: "Journal",
              type: "string",
              description:
                "The journal for the research paper (the text for the link)",
              required: true,
            },
            {
              name: "link",
              label: "Link",
              type: "string",
              description:
                "The link for the research paper, e.g. https://example.com",
              required: true,
            },
            {
              name: "pdf",
              label: "PDF",
              type: "image",
              description: "The PDF for the research paper",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "aboutSection",
      label: "About Section",
      type: "object",
      fields: [
        {
          name: "aboutToggle",
          label: "Display About Section",
          type: "boolean",
          description: "Toggle the display of the section",
        },
        {
          name: "sponsor",
          label: "Sponsor",
          type: "object",
          fields: [
            {
              name: "sponsorToggle",
              label: "Display Sponsor",
              type: "boolean",
              description: "Toggle the display of the sponsor",
            },
            {
              name: "sponsorImage",
              label: "Sponsor Image",
              type: "image",
              description: "The image for the sponsor",
            },
            {
              name: "sponsorName",
              label: "Sponsor Name",
              type: "string",
              description: "The name for the sponsor",
            },
            {
              name: "sponsorDescription",
              label: "Sponsor Description",
              type: "string",
              description: "The description for the sponsor",
            },
            {
              name: "sponsorLink",
              label: "Sponsor Link",
              type: "string",
              description: "The link for the sponsor, e.g. https://example.com",
            },
          ],
        },
        {
          name: "workshopFacilitators",
          label: "Workshop Facilitators",
          type: "object",
          description: "The list of workshop facilitators",
          list: true,
          defaultItem: () => {
            return {
              name: "New Facilitator",
              university: "University Name",
            };
          },
          ui: {
            itemProps: (item) => ({
              label: item?.name || "Untitled Paper",
            }),
          },
          fields: [
            {
              name: "name",
              label: "Name",
              type: "string",
              description: "The name for the workshop facilitator",
              required: true,
            },
            {
              name: "university",
              label: "University",
              type: "string",
              description: "The university for the workshop facilitator",
            },
          ],
        },
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return undefined;
    },
  },
};
