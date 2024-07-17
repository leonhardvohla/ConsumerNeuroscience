"use client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";

export default function ClientPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  return (
    <div data-tina-field={tinaField(data.page, "body")}>
      <TinaMarkdown content={content} />
      Hi!
    </div>
  );
}
