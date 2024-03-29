import prisma from "@/prisma/client";
import { Avatar, Flex, Heading } from "@radix-ui/themes";
import { User } from "@prisma/client";
import React from "react";
import SmallText from "../auth/components/SmallText";
import TransparentButton from "../components/TransparentButton";
import UserTabs from "./UserTabs";

interface UsernameParams {
  params: { username: string };
  children: React.ReactNode;
}

export default async function UserLayout({ params, children }: UsernameParams) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  });

  // TODO: make it return 404 page
  if (!user) return null;

  return (
    <Flex
      direction="column"
      width="100%"
      py="7"
      className="h-100% py-16 md:px-8 xl:px-20"
      gap="7"
    >
      <UserInfo user={user} />
      <UserTabs user={user} />
      {children}
    </Flex>
  );
}

const UserInfo = ({ user }: { user: User }) => {
  return (
    <Flex
      gap="6"
      align="center"
      justify="center"
      direction={{ initial: "column", sm: "row" }}
    >
      <Avatar
        size={{ initial: "7", md: "8" }}
        radius="full"
        src={user.image!}
        fallback="?"
      />
      <Flex
        direction="column"
        gap="1"
        align={{ initial: "center", sm: "start" }}
        className="min-w-48"
      >
        <Heading className="font-semibold text-2xl md:text-4xl">
          {user.username || user.name}
        </Heading>
        <SmallText className="text-sm text-gray-400">{user.email}</SmallText>
        <TransparentButton className="w-3/5 py-3 px-4">
          Edit profile
        </TransparentButton>
      </Flex>
    </Flex>
  );
};
