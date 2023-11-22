import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import TypingAnimation from "@/components/TypingAnimation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [inputValue, responseMsg]);
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
        console.log(response);
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
    <div className="bg-indigo-50 flex flex-col items-center justify-center">
      <div className="container flex h-[calc(100dvh)] flex-col">
        <div className="flex sticky top-0 left-0 right-0 items-center bg-gray-900 justify-center">
          <h1 className="bg-gradient-to-r from-blue-500 to-red-500 text-center text-transparent bg-clip-text w-screen py-3 font-bold text-6xl">
            botAI
          </h1>
        </div>
        <div className="flex-1 overflow-hidden  bg-gray-900">
          <div className="flex items-center mb-4">
            <div className="flex-1 space-y-4 p-6 text-white">
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
        <div class="flex items-center border-t p-2">
          <div className="flex-none fixed bottom-0 left-0 right-0 p-2 pt-1 bg-gray-900">
            <form onSubmit={handleSubmit}>
              <div className="flex rounded-lg border border-gray-900 bg-gray-800">
                <input
                  className="grow px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
                  type="text"
                  placeholder="Enter some data..."
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="flex-none bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold-focus:outline-none hover:bg-purple-600 transition-colors duration-300"
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
  return (
    <>
      <div className="flex-none fixed min-w-full">
        <h1 className="bg-gradient-to-r from-blue-500 to-green-500 text-center py-3 font-bold text-6xl">
          ChatGPT
        </h1>
      </div>
      <div className="container flex flex-col min-w-full space-y-8">
        <div className="flex space-y-4 grow overflow-y-auto flex-col p-6 pt-24 max-h-[screen] bg-gray-900">
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
        </div>
      </div>
      <div className="flex-none fixed bottom-0 left-0 right-0 p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex rounded-lg border border-gray-200 bg-gray-800">
            <input
              className="grow px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
              type="text"
              placeholder="Enter some data..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              type="submit"
              className="flex-none bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold-focus:outline-none hover:bg-purple-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
