import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { sendMessage } from "../state/slices/api/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/slices/store";
import { formatMessageTime } from "../utils/utils";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import { setOnline } from "../state/slices/onlineSlice";
import { addMessage } from "../state/slices/messageSlice";

const Home = () => {
  const [message, setMessage] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user);
  const messages = useSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    if (!currentUser) return;
    const newSocket = io("http://localhost:3000", {
      query: { userId: currentUser._id },
    });
    newSocket.on("connect", () => {
      console.log(`Connected to server with id ${newSocket.id}`);
    });

    newSocket.on("message", (data) => {
      toast.success(data);
    });
    newSocket.on("getOnlineUsers", (userIds) => {
      dispatch(setOnline(userIds));
    });
    newSocket?.on("newMessage", (data) => {
      dispatch(addMessage(data));
    });
    return () => {
      newSocket.disconnect();
    };
  }, [currentUser, dispatch]);

  const insertMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const data = await sendMessage(receiver, message);
    dispatch(addMessage(data));
    setMessage("");
  };

  return (
    <main className="w-full h-screen flex justify-between">
      <Sidebar setReceiver={setReceiver} setShowChat={setShowChat} />
      <div className="w-full h-full relative">
        <div className="w-full h-[550px] bg-slate-700 px-5 flex flex-col overflow-y-auto pb-10">
          {messages.length > 0 &&
            messages?.map((message: any) => (
              <div
                className={`my-2 w-fit max-w-[75%] leading-4 ${
                  message?.sender?._id === currentUser?._id
                    ? "self-end"
                    : "self-start"
                }`}
                key={message?._id}
              >
                <div
                  className={`px-4 py-2 text-justify w-full leading-5 text-white ${
                    message?.sender?._id === currentUser?._id
                      ? "rounded-l-lg rounded-tr-lg bg-teal-500"
                      : "rounded-r-lg rounded-tl-lg bg-slate-500"
                  }`}
                >
                  {message?.message}
                </div>
                <div className="text-[12px] text-slate-500">
                  {formatMessageTime(message?.createdAt)}
                </div>
              </div>
            ))}
          {messages.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#f2f2f] text-lg font-semibold">
                {showChat ? "No chat available" : "Chat with your friends"}
              </span>
            </div>
          )}
          {/* 
          <div className="my-2 w-fit max-w-[75%]  leading-4 self-start">
            <div className="px-4 py-2 text-justify w-full leading-5 bg-slate-500 text-white rounded-r-lg rounded-tl-box ">
              How are you?
            </div>
            <div className="text-[12px] twxt-slate-500">10:00</div>
          </div>
          <div className=" w-fit max-w-[75%] leading-4 self-end">
            <div className="px-4 py-2 my-2w-full text-justify leading-5 bg-teal-500 text-white rounded-l-lg rounded-tr-box ">
              Hii 👋
            </div>
            <div className="text-[12px] twxt-slate-500">10:01</div>
          </div>
          <div className=" w-fit max-w-[75%] leading-4 self-end">
            <div className="px-4 py-2 my-2w-full text-justify leading-5 bg-teal-500 text-white rounded-l-lg rounded-tr-box ">
              I am fine, and you?
            </div>
            <div className="text-[12px] twxt-slate-500">10:01</div>
          </div> */}
        </div>
        <div className="bg-slate-700 w-full h-10 absolute bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="w-full bg-slate-500 h-full">
            <form
              className="w-full h-full flex items-center gap-5"
              onSubmit={insertMessage}
            >
              <input
                type="text"
                className="w-[95%] h-full outline-none border-none px-2"
                placeholder="Write message..."
                value={message}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
              />
              <button type="button" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-paperclip"
                >
                  <path d="M13.234 20.252 21 12.3" />
                  <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
                </svg>
              </button>
              <button
                className="bg-teal-400 px-3 py-2 rounded-sm cursor-pointer"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send-horizontal"
                >
                  <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                  <path d="M6 12h16" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
