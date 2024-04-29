import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { changeDescription } from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { changeFont } from "@/lib/redux/features/shotText/shotTextInfo";
import { useAppDispatch } from "@/lib/redux/hooks";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment } from "react";
import Editable from "./Editable/Editable";
import EditorController from "./controllers/Editor/EditorController";

export default function TextEditor() {
  const dispatch = useAppDispatch();
  const { shotDescription: content } = useShotCreationInfo();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          "Write what went into this design or add any details you’d like to mention",
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount.configure({
        limit: 1000,
        mode: "nodeSize",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-3/4 mt-8 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap w-3/4 min-h-28 text-xl px-2 py-4 border-2 border-transparent rounded-lg placeholder:text-lg leading-7 hover:border-gray-200 transition-colors outline-purple-950 text-left `,
      },
    },
    onUpdate: ({ editor }) => {
      dispatch(changeDescription(editor.getHTML()));

      const currentFont = editor?.isActive("heading", { level: 1 })
        ? "heading 1"
        : editor?.isActive("heading", { level: 2 })
        ? "heading 2"
        : "text";

      dispatch(changeFont(currentFont));
    },
    editable: true,
  });

  return (
    <Fragment>
      <Editable onFocus={() => dispatch(setEditorOpen(true))} editor={editor} />
      <EditorController editor={editor} />
    </Fragment>
  );
}
