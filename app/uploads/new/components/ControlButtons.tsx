import TransparentButton from "@/app/[username]/components/TransparentButton";
import DarkButton from "@/app/components/DarkButton";
import { Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BeigeButton from "./BeigeButton";

export default function ControlButtons({
  onSubmit,
  file,
}: {
  onSubmit: () => void;
  file: File | null;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Flex
      width="100%"
      justify="between"
      className="py-4 px-2 sm:p-6 gap-4 xs:gap-12 sm:gap-4"
    >
      <TransparentButton
        onClick={() => router.push(`/${session?.user?.username}`)}
        className="px-4"
      >
        Cancel
      </TransparentButton>

      <Flex
        gap="4"
        align="center"
        justify="end"
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 2xl:w-1/6"
      >
        {/* Make it disabled if no image is provided */}
        <BeigeButton className="w-full" disabled={!file}>
          {/* Mobile text */}
          <Text className="sm:hidden">Save</Text>

          {/* Desktop text */}
          <Text className="hidden sm:block">Save as draft</Text>
        </BeigeButton>
        <DarkButton
          onClick={() => onSubmit()}
          className="text-sm font-semibold py-2"
          disabled={!file}
        >
          Continue
        </DarkButton>
      </Flex>
    </Flex>
  );
}
