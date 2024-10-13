"use client";

import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useState } from "react";
import { pusherClient } from "@/app/lib/pusher";

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
};

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: Props) {
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMesage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMesage);
    return () => {
      channel.subscribe();
      channel.unbind("message:new", handleNewMesage);
    };
  }, [chatId, handleNewMesage]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
