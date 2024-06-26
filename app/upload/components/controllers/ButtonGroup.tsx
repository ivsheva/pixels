import { useAppDispatch } from "@/lib/redux/hooks";
import { AppDispatch } from "@/lib/redux/store";
import { Flex } from "@radix-ui/themes";
import { Editor } from "@tiptap/react";
import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface ButtonGroupProps {
  icons: JSX.Element[];

  activeElements?: string[];
  activeElement?: string;

  setActiveElements?: (
    elements: string[],
    dispatch: AppDispatch,
    editor: Editor | null
  ) => void;
  setActiveElement?: (
    element: string,
    dispatch: AppDispatch,
    editor: Editor | null
  ) => void;

  currentFont?: string;
  editor: Editor | null;
}

export default function ButtonGroup({
  icons,

  activeElements,
  setActiveElements,

  activeElement,
  setActiveElement,

  currentFont,

  editor,
}: ButtonGroupProps) {
  const dispatch = useAppDispatch();
  const focusedEditor = editor?.chain().focus();

  const handleClick = (iconKey: string) => {
    if (setActiveElements) {
      if (
        iconKey === "bold" &&
        (currentFont === "heading 1" || currentFont === "heading 2")
      )
        return;

      if (activeElements?.includes(iconKey)) {
        const deleteCommands: Record<string, () => void> = {
          bold: () => focusedEditor?.unsetBold().run(),
          italic: () => focusedEditor?.unsetItalic().run(),
          underline: () => focusedEditor?.unsetUnderline().run(),
        };
        activeElements.forEach((element) => deleteCommands[element]());

        return setActiveElements(
          activeElements.filter((element) => element !== iconKey),
          dispatch,
          editor
        );
      } else setActiveElements([...activeElements!, iconKey], dispatch, editor);
    }

    if (setActiveElement) {
      setActiveElement(iconKey, dispatch, editor);
    }
  };

  const activeStyles = "border-2 border-purple-900 bg-[rgba(79,60,201,.1)]";
  const disabledStyles =
    "bg-[#f3f3f4] border-zinc-300 cursor-not-allowed text-zinc-400";

  return (
    <Flex className="w-full">
      {icons.map((icon, index) => {
        return (
          <IconButton
            className={classNames(
              "transition-colors border border-gray-200",
              editor?.isActive(icon.key!) && activeStyles,
              editor?.isActive({ textAlign: icon.key }) && activeStyles,
              index === 0 && "rounded-l-lg",
              index === icons.length - 1 && "rounded-r-lg",
              icon.key === "bold" &&
                (currentFont === "heading 1" || currentFont === "heading 2") &&
                disabledStyles
            )}
            onClick={() => handleClick(icon.key!)}
            key={index}
            icon={icon}
          />
        );
      })}
    </Flex>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={classNames("w-1/3 py-4 border flex justify-center", className)}
      {...props}
    >
      {icon}
    </button>
  );
};
