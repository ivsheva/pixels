import { Box, Heading, Text } from "@radix-ui/themes";
import { Fragment } from "react";

export const TextOptions = ({ optionStyles }: { optionStyles: string }) => {
  return (
    <Fragment>
      <Heading size="4" className={optionStyles}>
        Heading
      </Heading>
      <Box className={optionStyles}>
        <Heading size="4">Heading</Heading>
        <Text>with text</Text>
      </Box>
      <Text className={optionStyles}>Text</Text>
    </Fragment>
  );
};

export const VideoOptions = ({ optionStyles }: { optionStyles: string }) => {
  return <Box>Video options</Box>;
};