export interface MessengerProps {
  isMyMessage: boolean;
  messageTime: string;
  messageText: string;
  status: string;
  onReply: () => void;
  onForward: () => void;
  onCopy: () => void;
  onReport: () => void;
  onDelete: () => void;
}
