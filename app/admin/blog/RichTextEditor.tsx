"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function ToolbarButton({
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "border-mida-primary bg-blue-50 text-mida-primary" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function asInitialHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "<p></p>";
  if (trimmed.startsWith("<")) return trimmed;
  return `<p>${trimmed.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>`;
}

export default function RichTextEditor({ initialContent = "" }: { initialContent?: string }) {
  const [html, setHtml] = useState(() => asInitialHtml(initialContent));
  const editor = useEditor({
    extensions: [StarterKit],
    content: asInitialHtml(initialContent),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[360px] px-5 py-4 text-slate-800 outline-none leading-7",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-300 bg-white">
      <input type="hidden" name="content" value={html} />
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">
        <ToolbarButton active={editor?.isActive("paragraph")} onClick={() => editor?.chain().focus().setParagraph().run()}>Párrafo</ToolbarButton>
        <ToolbarButton active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
        <ToolbarButton active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}><strong>B</strong></ToolbarButton>
        <ToolbarButton active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}><em>I</em></ToolbarButton>
        <ToolbarButton active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}>• Lista</ToolbarButton>
        <ToolbarButton active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. Lista</ToolbarButton>
        <ToolbarButton active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>Cita</ToolbarButton>
        <ToolbarButton disabled={!editor?.can().chain().focus().undo().run()} onClick={() => editor?.chain().focus().undo().run()}>↶</ToolbarButton>
        <ToolbarButton disabled={!editor?.can().chain().focus().redo().run()} onClick={() => editor?.chain().focus().redo().run()}>↷</ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
