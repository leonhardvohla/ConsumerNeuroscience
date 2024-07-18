import { max } from "lodash";
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
          validate: (value) => {
            if (!value || value.trim() === "") {
              return "This field is required.";
            }
            if (value.length > 10) {
              return "Must be less than 10 characters";
            }
          },
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
    {
      name: "workshopsSection",
      label: "Past Workshops Section",
      type: "object",
      fields: [
        {
          name: "workshopsToggle",
          label: "Display Past Workshops Section",
          type: "boolean",
          description: "Toggle the display of the section",
        },
        {
          name: "sortWorkshops",
          label: "Sort Workshops",
          type: "string",
          description: "Sort the workshops by year or manually",
          options: ["Year (most recent first)", "Manual"],
        },
        {
          name: "colorPicker",
          label: "Color Picker",
          type: "string",
          description: "Choose a color",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "workshops",
          label: "Workshops",
          type: "object",
          description: "The list of past workshops",
          list: true,
          defaultItem: () => {
            return {
              title: "New Workshop",
              year: new Date().toISOString(),
              location: "Location",
            };
          },
          ui: {
            itemProps: (item) => ({
              label: item?.year?.split("-")[0] || "Untitled Workshop",
            }),
          },
          fields: [
            {
              name: "year",
              label: "Year",
              type: "datetime",
              description: "The year for the workshop",
              ui: {
                dateFormat: "YYYY",
              },
            },
            {
              name: "title",
              label: "Title",
              type: "string",
              description: "The title for the workshop",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "string",
              description: "The description for the workshop",
            },
            {
              name: "images",
              label: "Images",
              type: "object",
              description: "The list of images for the workshop",
              list: true,
              ui: {
                itemProps: (item) => ({
                  label: item?.image
                    ? item.image.split("/").pop()
                    : "Untitled Image",
                }),
              },
              fields: [
                {
                  name: "image",
                  label: "Image",
                  type: "image",
                  description: "Add an image",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "footer",
      label: "Footer",
      type: "object",
      fields: [
        {
          name: "footerToggle",
          label: "Display Footer",
          type: "boolean",
          description: "Toggle the display of the footer",
        },
        {
          name: "footerText",
          label: "Footer Text",
          type: "rich-text",
          description: "The text for the footer",
        },
        {
          name: "contactEmail",
          label: "Contact Email",
          type: "object",
          fields: [
            {
              name: "contactEmailToggle",
              label: "Display Contact Email",
              type: "boolean",
              description: "Toggle the display of the contact email",
            },
            {
              name: "contactEmail",
              label: "Contact Email",
              type: "string",
              description: "The email for the contact email",
            },
            {
              name: "contactEmailText",
              label: "Contact Email Text",
              type: "string",
              description: "The text for the contact email (optional)",
            },
          ],
        },
        {
          name: "footerLegalPages",
          label: "Footer Legal Pages",
          type: "object",
          description: "The list of legal pages in the footer",
          list: true,
          defaultItem: () => {
            return {
              title: "New Page",
              content: "Content",
            };
          },
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Untitled Page",
            }),
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
              description: "The title for the legal page",
              required: true,
            },
            {
              name: "content",
              label: "Content",
              type: "rich-text",
              description: "The content for the legal page",
            },
          ],
        },
      ],
    },
    {
      name: "themeSection",
      label: "Theme",
      type: "object",
      fields: [
        {
          name: "textColor",
          label: "Text Color",
          type: "string",
          description: "Choose a color for the text",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "backgroundColor1",
          label: "Background Color 1",
          type: "string",
          description:
            "Choose a color for the background (this is the primary section color starting from the hero section)",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "backgroundColor2",
          label: "Background Color 2",
          type: "string",
          description:
            "Choose a color for the background (this is the secondary section color starting from the research section)",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "backgroundColor3",
          label: "Background Color 3",
          type: "string",
          description:
            "Choose a color for the background (this is the tertiary section color used for the links in the research section)",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "highlightColor",
          label: "Highlight Color",
          type: "string",
          description:
            "Choose a color for the highlight (this is the color used for some buttons)",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          name: "buttonColor",
          label: "Button Color",
          type: "string",
          description:
            "Choose a color for the buttons (this is the color used for the buttons, the border, the text, and the hover color)",
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
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
