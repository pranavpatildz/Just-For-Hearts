"use client";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "staff";
};

type InquiryChatProps = {
  messages: ChatMessage[];
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
};

export default function InquiryChat({
  messages,
  messageInput,
  onMessageInputChange,
  onSendMessage,
}: InquiryChatProps) {
  return (
    <div className="mt-6">
      <div className="bg-gray-50 border rounded-xl p-6 h-[400px] overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] px-4 py-2 rounded-lg text-sm ${
              message.sender === "user"
                ? "ml-auto bg-red-500 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => onMessageInputChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
        />
        <button
          type="button"
          onClick={onSendMessage}
          className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 hover:-translate-y-0.5"
        >
          Send
        </button>
      </div>
    </div>
  );
}
