import { setEditorOpen } from "@/lib/redux/features/disclosure/disclosureSlice";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { changeTitle } from "@/lib/redux/features/shotCreation/shotCreationSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Editable from "./Editable/Editable";

export default function ShotName() {
  const dispatch = useAppDispatch();
  const { shotTitle: content } = useShotCreationInfo();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Give me a name",
      }),
      CharacterCount.configure({
        limit: 70,
        mode: "nodeSize",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `w-3/4 h-auto py-16 min-h-28 flex flex-col mx-auto whitespace-pre-wrap w-1/2 text-center items-center text-2xl md:text-3xl outline-none`,
      },
    },
    onUpdate: ({ editor }) => {
      dispatch(changeTitle(editor.getHTML()));
    },
    injectCSS: false,
    editable: true,
  });

  return (
    <Editable editor={editor} onFocus={() => dispatch(setEditorOpen(false))} />
  );
}