import { Flex } from "@radix-ui/themes";
import React, { Fragment } from "react";
import { Aside, DisclosureProps } from "./Aside";
import MobileDrawer from "./MobileDrawer";

export default function Controller({
  isOpen,
  setOpen,
  title,
  children,
  isSmall,
}: DisclosureProps) {
  const asideChildren = React.Children.toArray(children)[0];
  const mobileChildren = React.Children.toArray(children)[1];

  return (
    <Fragment>
      <Aside isOpen={isOpen} setOpen={setOpen} title={title}>
        <Flex direction="column" gap="1">
          {asideChildren}
        </Flex>
      </Aside>

      {/* Editor controller for mobile */}
      <MobileDrawer isSmall={isSmall} isOpen={isOpen} setOpen={setOpen}>
        {mobileChildren}
      </MobileDrawer>
    </Fragment>
  );
}
