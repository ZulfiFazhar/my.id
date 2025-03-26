/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const [markdownValue, setMarkdownValue] = useState(value || "");

  const handleEditorChange = (value: any) => {
    setMarkdownValue(value);
    onChange(value);
  };

  const customOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold" as const,
        "italic" as const,
        "heading" as const,
        "|" as const,
        "quote" as const,
        "unordered-list" as const,
        "ordered-list" as const,
        "|" as const,
        "link" as const,
        "image" as const,
        "code" as const,
        "clean-block" as const,
        "|" as const,
        "preview" as const,
      ],
      placeholder: "Mulai menulis...",
    };
  }, []);

  return (
    <div className="rounded-md w-full">
      <SimpleMDE
        value={markdownValue}
        onChange={handleEditorChange}
        options={customOptions}
      />
    </div>
  );
};

export default MarkdownEditor;
