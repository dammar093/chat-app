import React, { useEffect } from "react";
import { getAllUsers, logout } from "../state/slices/api/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAll();
  }, []);
  async function getAll() {
    const users = await getAllUsers();
    setUsers(users);
  }
  return (
    <main className="w-full h-screen flex justify-between">
      <aside className="bg-gray-800 w-64 h-full shadow-lg relative">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="p-4 border-b border-gray-700 flex items-center gap-3 cursor-pointer"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={user?.profilePic}
              alt={user?.name}
            />
            <span className="text-white font-semibold">{user?.name}</span>
          </div>
        ))}
        <div className="w-full absolute bottom-0 left-0 right-0">
          <button
            className="w-full flex items-center justify-center bg-teal-400 py-2 px-4 cursor-pointer"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </aside>
      <div className="w-full h-full relative">
        <div className="w-full h-[500px] bg-slate-700 p-5 flex flex-col overflow-y-auto">
          <div className="my-2 w-fit max-w-[75%]  leading-4 self-start">
            <div className="px-4 py-2 text-justify w-full leading-5 bg-slate-500 text-white rounded-r-lg rounded-tl-box ">
              Hello 👋
            </div>
            <div className="text-[12px] twxt-slate-500">10:00</div>
          </div>
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
          </div>
        </div>
        <div className="bg-slate-700 w-full h-14 absolute bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="w-full bg-slate-500 h-10 px-4 ">
            <form className="w-full h-full flex items-center gap-5">
              <input
                type="text"
                className="w-[95%] h-full outline-none border-none"
                placeholder="Write message..."
              />
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-paperclip"
                >
                  <path d="M13.234 20.252 21 12.3" />
                  <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
                </svg>
              </button>
              <button className="bg-teal-400 px-3 py-2 rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
