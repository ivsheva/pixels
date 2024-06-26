"use client";
import { passwordSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import DarkButton from "../../../components/Buttons/DarkButton";
import AnimatedForm from "../../../components/Animated/AnimatedForm";
import Input from "../../../components/Input";
import { CenterResponsive } from "../../components/Center";
import ErrorHandling from "../../components/ErrorHandling";
import SmallText from "../../components/SmallText";

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordFormPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "all",
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      // add token to the data
      const extendedData = {
        ...data,
        token: params.token,
      };

      await axios.post("/api/auth/change-password", extendedData);
      router.push("/auth/sign-in");

      toast.success("Password changed!");
    } catch (error) {
      if (axios.isAxiosError(error)) setError(error.response?.data.error);
    }
  };

  return (
    <CenterResponsive>
      <AnimatedForm
        className="flex flex-col gap-y-10 w-full xl:w-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex direction="column" gap="2">
          <Heading size="4" className="text-center lg:text-left">
            Reset your password
          </Heading>
          <ErrorHandling errors={errors} networkError={error} />
        </Flex>
        <Flex direction="column" gap="1">
          <Flex justify="between" align="center">
            <label className="text-sm font-bold">New password</label>
            <Text
              className="text-xs text-gray-400  cursor-pointer"
              onClick={() => setShowPassword((prevShow) => !prevShow)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </Text>
          </Flex>
          <Input
            type={showPassword ? "text" : "password"}
            register={register("password")}
          />
          <SmallText>Minimum 6 characters</SmallText>
          <DarkButton disabled={isSubmitting} className="py-3 w-full ">
            Change password
          </DarkButton>
        </Flex>
      </AnimatedForm>
    </CenterResponsive>
  );
}
