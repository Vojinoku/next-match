"use client";

import { MessageDto } from "@/types";
import MessageBox from "./MessageBox";
import { useCallback, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/app/lib/pusher";
import { formatShortDatetime } from "@/app/lib/util";
import { Channel } from "pusher-js";
import useMessageStore from "@/hooks/useMessageStore";

type Props = {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
};

export default function MessageList({ initialMessages, currentUserId, chatId }: Props) {
  const setReadCount = useRef(false);
  const [messages, setMessages] = useState(initialMessages.messages);
  const { updateUnreadCount } = useMessageStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  useEffect(() => {
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updateUnreadCount]);

  const channelRef = useRef<Channel | null>(null);

  const handleNewMesage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id) ? { ...message, dateRead: formatShortDatetime(new Date()) } : message
      )
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);

      channelRef.current.bind("message:new", handleNewMesage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.subscribe();
        channelRef.current.unbind("message:new", handleNewMesage);
        channelRef.current.unbind("messages:read", handleReadMessages);
      }
    };
  }, [chatId, handleNewMesage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} currentUserId={currentUserId} />
          ))}
        </div>
      )}
    </div>
  );
}
