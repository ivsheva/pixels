"use client";
import { emailSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import DarkButton from "../../components/Buttons/DarkButton";
import AnimatedForm from "../../components/Animated/AnimatedForm";
import Input from "../../components/Input";
import { Center } from "../components/Center";
import SmallText from "../components/SmallText";
import { useState } from "react";

type ResetFormData = z.infer<typeof emailSchema>;

export default function ForgotPage() {
  const { register, handleSubmit } = useForm<ResetFormData>({
    resolver: zodResolver(emailSchema),
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ResetFormData) => {
    try {
      // make forgot password request
      setLoading(true);
      await axios.post("/api/auth/forgot-password", data);

      // navigate to login page
      router.push("/auth/sign-in");

      // send info toast
      toast.success(
        "Email was sent. If you can`t see it, check your spam folder.",
        {
          duration: 10000,
        }
      );
      setLoading(false);
    } catch (error) {
      toast.error("A user with this account does not exist.");
    }
  };

  return (
    <Center>
      <AnimatedForm
        className="flex flex-col gap-4 mx-auto lg:mx-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading align={{ initial: "center", md: "left" }}>
          Forgot password
        </Heading>
        {/* make heading smaller */}
        <SmallText className="mx-auto text-center w-3/4 lg:mx-0 lg:text-left ">
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </SmallText>
        <div className="w-3/4 mx-auto lg:mx-0 ">
          <label>Email</label>
          <Input register={register("email")} />
          <DarkButton disabled={isLoading} className="w-full py-3 my-2">
            Submit
          </DarkButton>
        </div>
      </AnimatedForm>
    </Center>
  );
}
