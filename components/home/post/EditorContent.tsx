"use client";

import dynamic from "next/dynamic";
import CustomImageRenderer from "../renderers/CustomImageRenderer";
import CustomCodeRenderer from "../renderers/CustomCodeRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false },
);

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const EditorContent = ({ content }: { content: any }) => {
  return (
    
    <Output
      data={content}
      style={style}
      className="text-sm"
      renders={renderers}
    />
  );
};

export default EditorContent;
