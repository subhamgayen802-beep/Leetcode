import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from 'lucide-react';


function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hi! I'm your tutor. Ask me anything about this problem — hints, code review, or the optimal solution!" }] },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {

    // Add user message to UI immediately
    const userMessage = { role: 'user', parts: [{ text: data.message }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    reset();
    setIsLoading(true);

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: updatedMessages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode
      });

      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: response.data.message }]
      }]);

    } catch (error) {
      console.error("API Error:", error);
      const status = error?.response?.status;
      let errorText = "Something went wrong. Please try again.";

      if (status === 503) {
        errorText = "The AI is currently busy due to high demand. Please wait a moment and try again.";
      } else if (status === 403) {
        errorText = "AI service authentication failed. Please contact support.";
      } else if (status === 500) {
        errorText = "Server error. Please try again later.";
      }

      setMessages(prev => [...prev, {
        role: 'model',
        parts: [{ text: errorText }]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className={`chat-bubble ${msg.role === "user" ? "chat-bubble-primary" : "bg-base-200 text-base-content"}`}>
              <pre className="whitespace-pre-wrap font-sans text-sm">{msg.parts[0].text}</pre>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-base-200 text-base-content">
              <span className="loading loading-dots loading-sm"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 p-4 bg-base-100 border-t"
      >
        <div className="flex items-center gap-2">
          <input
            placeholder="Ask me anything about this problem..."
            className={`input input-bordered flex-1 ${errors.message ? 'input-error' : ''}`}
            disabled={isLoading}
            {...register("message", { required: true, minLength: 2 })}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !!errors.message}
          >
            {isLoading
              ? <span className="loading loading-spinner loading-sm"></span>
              : <Send size={20} />
            }
          </button>
        </div>
        {errors.message && (
          <p className="text-error text-xs mt-1">Please enter at least 2 characters.</p>
        )}
      </form>
    </div>
  );

}

export default ChatAi;