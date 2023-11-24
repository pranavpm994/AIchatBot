import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TypingAnimation from "../components/TypingAnimation";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [isLoading,responseMsg]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);
    sendMessage(inputValue);
    setInputValue("");
  };
  const sendMessage = (message) => {
    const url = "/api/chat";
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    };
    setIsLoading(true);
    axios
      .post(url, data)
      .then((response) => {
        setResponseMsg(response.data.choices[0].message.content);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: "assistant",
            message: response.data.choices[0].message.content,
          },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-400 flex flex-col">
      <div className="flex h-[calc(100dvh)] flex-col items-center">
        <div className="flex top-0 left-0 right-0 w-full xl:w-[900px] md:w-[700px] 2xl:w-[1100px] bg-gray-900">
          <h1 className="bg-gradient-to-r from-blue-500 to-red-500 text-center text-transparent bg-clip-text w-screen py-3 font-bold text-6xl">
            botAI
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto w-full xl:w-[900px] md:w-[700px] 2xl:w-[1100px] bg-gray-900">
          <div className="flex items-center mb-4">
            <div className="flex-1 space-y-4 pl-6 pr-6 text-white">
              {/* flex space-y-4 grow overflow-y-auto flex-col p-6 pt-24 max-h-[screen] bg-gray-900 */}
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.type === "user" ? "bg-purple-500" : "bg-gray-800"
                    } rounded-lg p-4 text-white max-w-sm`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
              <div ref={scrollRef}></div>
            </div>
          </div>
        </div>
        <div className="flex w-full xl:w-[900px] md:w-[700px] 2xl:w-[1100px]">
          <div className="flex-1 bottom-0 left-0 right-0 p-2 pt-1 bg-gray-900">
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-2 rounded-lg border border-gray-900">
                <input
                  className="flex-1 w-5/6 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                  type="text"
                  placeholder="Message..."
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="flex-none bg-blue-900 rounded-lg px-4 py-2 text-white font-semibold-focus:outline-none hover:bg-purple-600 transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
