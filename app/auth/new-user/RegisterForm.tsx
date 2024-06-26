"use client";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Separator, Text } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AnimatedForm from "../../components/Animated/AnimatedForm";
import DarkButton from "../../components/Buttons/DarkButton";
import Input from "../../components/Input";
import ErrorHandling from "../components/ErrorHandling";
import SmallText from "../components/SmallText";
import transliterate from "@/app/utils/transliterate";

type RegisterFormData = z.infer<typeof userSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const username = transliterate(data.username);
      const changedData = {
        username,
        email: data.email,
        password: data.password,
      };

      await axios.post("/api/register", changedData);
      await signIn("credentials", {
        login: changedData.email || username,
        password: changedData.password,
        callbackUrl: "/",
      });
      await axios.post("/api/emails/welcome", {
        username,
        email: changedData.email,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) setError(error.response?.data.error);
      throw error;
    }
  };

  return (
    <AnimatedForm onSubmit={handleSubmit(onSubmit)}>
      <Separator orientation="horizontal" my="3" size="4" className="w-full" />

      {/* Render errors only if its not empty */}
      <ErrorHandling errors={errors} networkError={error} />

      {/* Inputs */}
      <Flex direction="column" className="gap-y-5">
        {/* Username and email inputs */}
        <Flex
          direction={{ initial: "column", xs: "row" }}
          justify="between"
          className="gap-x-9 gap-y-4"
        >
          <Flex direction="column">
            <label>Username</label>
            <Input register={register("username")} maxLength={20} />
          </Flex>
          <Flex direction="column">
            <label>Email</label>
            <Input maxLength={45} register={register("email")} />
          </Flex>
        </Flex>
        {/* Password input */}
        <Flex direction="column">
          <label>Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="6+ characters"
            maxLength={25}
            register={register("password")}
          />
          <SmallText
            className="text-right mt-2 cursor-pointer"
            onClick={() => setShowPassword((prevShow) => !prevShow)}
          >
            {showPassword ? "Hide password" : "Show password"}
          </SmallText>
        </Flex>
      </Flex>
      {/* Button */}
      <DarkButton disabled={isSubmitting} className="py-4 my-2 w-full">
        Create Account
      </DarkButton>
      <Flex
        justify="center"
        align="center"
        gap="2"
        className="text-gray-400 text-sm"
      >
        <Text>Already have an account?</Text>
        <Link href="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </Flex>
    </AnimatedForm>
  );
}
