"use client";
import { messageSchema } from "@/app/lib/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export default function ChatForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<messageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: messageSchema) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center gap-2"
    >
      <Input
        fullWidth
        placeholder="Type a message"
        variant="faded"
        {...register("text")}
        isInvalid={!!errors.text}
        errorMessage={errors.text?.message}
      />
      <Button
        type="submit"
        isIconOnly
        color="secondary"
        radius="full"
        isLoading={isSubmitting}
        isDisabled={!isValid || isSubmitting}
      >
        <HiPaperAirplane size={18} />
      </Button>
    </form>
  );
}
