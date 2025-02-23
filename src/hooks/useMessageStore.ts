import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessageState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (mesage: MessageDto) => void;
  remove: (id: string) => void;
  set: (messages: MessageDto[]) => void;
  updateUnreadCount: (amount: number) => void;
};

const useMessageStore = create<MessageState>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      add: (message: MessageDto) => set((state) => ({ messages: [message, ...state.messages] })),
      remove: (id) => set((state) => ({ messages: state.messages.filter((message) => message.id !== id) })),
      set: (messages) => set({ messages }),
      updateUnreadCount: (amount: number) => set((state) => ({ unreadCount: state.unreadCount + amount })),
    }),
    { name: "messageStore" }
  )
);

export default useMessageStore;
