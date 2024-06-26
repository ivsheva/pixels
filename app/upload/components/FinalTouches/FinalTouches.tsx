import TransparentButton from "@/app/components/Buttons/TransparentButton";
import DarkButton from "@/app/components/Buttons/DarkButton";
import { useShotCreationInfo } from "@/lib/redux/features/shotCreation/hooks";
import { Dialog, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ComboOptions from "./ComboOptions";
import Tags from "./Tags";
import { useState } from "react";

export default function FinalTouches({
  onSubmit,
  disabled = false,
}: {
  onSubmit: () => void;
  disabled?: boolean;
}) {
  const { fileUrl, shotTitle } = useShotCreationInfo();

  // remove html tags
  const title = shotTitle.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <DarkButton
          className="text-sm font-semibold py-2 disabled:text-gray-300 px-6  "
          disabled={!fileUrl || !title || disabled}
        >
          Continue
        </DarkButton>
      </Dialog.Trigger>
      {fileUrl && (
        <Dialog.Content className="max-w-4xl px-0 md:px-12 flex flex-col items-center md:items-start overflow-scroll">
          <Dialog.Title className="text-center md:text-left ">
            Final Touches
          </Dialog.Title>

          <Flex className="gap-16 flex-col items-center w-3/4 md:w-full md:flex-row">
            <Flex direction="column" gap="1" className="w-full md:w-1/3">
              <Text className="text-sm md:text-base text-center md:text-left whitespace-nowrap">
                Thumbnail preview
              </Text>
              <div className="h-48 max-w-[34.5rem] w-full relative">
                <Image
                  src={fileUrl}
                  alt="Shot Thumbnail"
                  className="rounded-lg object-cover w-auto h-auto"
                  fill
                />
              </div>
              <ShotStats />
            </Flex>
            <Flex direction="column" className="w-3/4 md:w-1/2">
              <ComboBox />
              <Buttons onSubmit={onSubmit} />
            </Flex>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
}

const ShotStats = () => {
  return (
    <Flex
      gap="3"
      align="center"
      className="text-xs text-gray-500 mt-1 justify-center md:justify-end"
    >
      <Flex align="center" gap="1">
        <FaHeart size="14" />
        54
      </Flex>
      <Flex align="center" gap="1">
        <FaEye size="16" />
        1029
      </Flex>
    </Flex>
  );
};

const ComboBox = () => {
  const [tagContent, setTagContent] = useState("");

  return (
    <Flex direction="column" gap="1" className="relative overflow-visible ">
      <label className="text-base">
        Tags <span className="text-xs font-light">(maximum 5)</span>
      </label>
      <Tags content={tagContent} setContent={setTagContent} />
      <ComboOptions content={tagContent} setContent={setTagContent} />
    </Flex>
  );
};

const Buttons = ({ onSubmit }: { onSubmit: () => void }) => {
  // create a state to track if the button has been clicked for more safety
  const [isClicked, setClicked] = useState(false);

  // get current tags
  const { tags } = useShotCreationInfo();

  return (
    <Flex className="mt-[10%] gap-4 md:gap-0 justify-center md:justify-between">
      <Dialog.Close>
        <TransparentButton className="py-2 px-4">Cancel</TransparentButton>
      </Dialog.Close>
      <DarkButton
        onClick={() => {
          onSubmit();
          setClicked(true);
        }}
        className="py-2 text-sm px-6"
        disabled={tags.length < 1 || isClicked}
      >
        Continue
      </DarkButton>
    </Flex>
  );
};
