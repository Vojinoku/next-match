import { formatShortDatetime } from "./util";
import { MessageWithSenderRecipient } from "@/types";

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDatetime(message.created),
    dateRead: message.dateRead ? formatShortDatetime(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientImage: message.recipient?.image,
    recipientName: message.recipient?.name,
  };
}
