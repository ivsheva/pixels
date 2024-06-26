"use client";
import DarkButton from "@/app/components/Buttons/DarkButton";
import FavouriteContent from "@/app/components/ShotCard/FavouriteContent";
import LikeContent from "@/app/components/ShotCard/LikeContent";
import TransparentButton from "@/app/components/Buttons/TransparentButton";
import useFavourited from "@/app/hooks/useFavourited";
import useLiked from "@/app/hooks/useLiked";
import { setFavourited } from "@/lib/redux/features/favourites/favouritesSlice";
import { changeShotsLikes } from "@/lib/redux/features/shotsLikes/shotsLikesSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Shot, User } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import SendMessage from "./ShotFooter/SendMessage";
import useUser from "@/app/hooks/useUser";
import { DarkButtonLoading } from "./ButtonsLoading";

export default function ShotButtons({
  shot,
  authorId,
}: {
  shot: Shot;
  authorId: string;
}) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const [isLiked, setLiked] = useState(false);
  const [isFavourite, setFavourite] = useState(false);
  const [isLikeLoading, setLikeLoading] = useState(false);
  const [isFavouriteLoading, setFavouriteLoading] = useState(false);

  const { data: liked, isLoading: initialLikeLoading } = useLiked(
    shot.id,
    session?.user.id || ""
  );

  const { data: favourited, isLoading: initialFavouriteLoading } =
    useFavourited(shot.id, session?.user.id || "");

  const { data: user } = useUser(authorId);

  useEffect(() => {
    if (liked) {
      setLiked(true);
    }
  }, [liked]);

  useEffect(() => {
    dispatch(changeShotsLikes({ shotId: shot.id, likes: shot.likes }));
  }, [shot.id, shot.likes, dispatch]);

  useEffect(() => {
    setFavourite(Boolean(favourited));
  }, [favourited]);

  const isAnyLikeLoading = initialLikeLoading || isLikeLoading;
  const isAnyFavouriteLoading = initialFavouriteLoading || isFavouriteLoading;

  const isButtonDisabled = authorId === session?.user.id || !session?.user.id;

  const handleLike = async () => {
    setLikeLoading(true);
    // update likes
    const { data: updatedShot }: AxiosResponse<Shot> = await axios.patch(
      "/api/shot/",
      {
        shotId: shot.id,
        option: "likes",
      }
    );

    setLikeLoading(false);

    updatedShot && setLiked((prevLiked) => !prevLiked);
    dispatch(changeShotsLikes({ shotId: shot.id, likes: updatedShot.likes }));
  };

  const handleFavourite = async () => {
    setFavouriteLoading(true);
    const {
      data: { favourited },
    }: AxiosResponse<{ favourited: boolean }> = await axios.post(
      "/api/favourite/",
      {
        userId: session?.user?.id,
        shotId: shot.id,
      }
    );

    setFavourite(favourited);
    setFavouriteLoading(false);

    dispatch(
      setFavourited({
        userId: session?.user?.id,
        shotId: shot.id,
        isFavourite: favourited,
      })
    );
  };

  return (
    <Flex gap="3" className="items-center">
      <TransparentButton
        className="p-2 sm:p-3"
        onClick={handleLike}
        disabled={isButtonDisabled}
      >
        <LikeContent isLiked={isLiked} isLoading={isAnyLikeLoading} />
      </TransparentButton>
      <TransparentButton
        className="p-2 sm:p-3"
        disabled={isButtonDisabled}
        onClick={handleFavourite}
      >
        <FavouriteContent
          isFavourite={isFavourite}
          isLoading={isAnyFavouriteLoading}
        />
      </TransparentButton>
      {!user && <DarkButtonLoading />}
      {user && (
        <SendMessage user={user.data}>
          <DarkButton
            className="text-xs sm:text-sm px-4 py-2"
            disabled={isButtonDisabled}
          >
            {window.innerWidth > 768 ? (
              "Get In Touch"
            ) : (
              <MdOutlineEmail size="16" />
            )}
          </DarkButton>
        </SendMessage>
      )}
    </Flex>
  );
}
