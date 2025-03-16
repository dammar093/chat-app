import { useNavigate } from "react-router-dom";
import { getAllUsers, getMessage, logout } from "../state/slices/api/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/slices/store";
import { setUsers } from "../state/slices/usersSlice";
import { setMessages } from "../state/slices/messageSlice";

const Sidebar = ({
  setReceiver,
  setShowChat,
}: {
  setReceiver: (id: string) => void;
  setShowChat: (val: boolean) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user);
  const users = useSelector((state: RootState) => state.users.users);
  const online = useSelector((state: RootState) => state.online.online);

  /// useEffect to get all users
  useEffect(() => {
    getAll();
  }, [dispatch]);

  // fuction to get all users
  async function getAll() {
    const users = await getAllUsers();
    console.log(users);
    dispatch(setUsers(users));
  }
  // function to logout current user
  const handleLogout = () => {
    logout();
    navigate("/login");
    // socket?.disconnect();
  };

  // handale click user messagess

  const handleUserMessage = async (index: number, id: string) => {
    setActiveIndex(index);
    setShowChat(true);
    setReceiver(id);
    const messages = await getMessage(id);
    dispatch(setMessages(messages));
  };
  return (
    <aside className="bg-gray-800 w-64 h-full shadow-lg relative">
      {users.map((user: any, index: number) => (
        <div
          key={user._id}
          className={`p-2 border-b border-gray-700 flex items-center gap-3 cursor-pointer ${
            activeIndex == index && "bg-slate-500"
          } ${user._id == currentUser._id && "hidden"}`}
          onClick={() => handleUserMessage(index, user._id)}
        >
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.profilePic}
              alt={user?.name}
            />
            <div
              className={`absolute w-2 h-2 bg-green-400 top-0 right-0 rounded-full ${
                online.includes(user._id) ? "block" : "hidden"
              }`}
            ></div>
          </div>
          <span className="text-white font-semibold">{user?.name}</span>
        </div>
      ))}
      <div className="w-full absolute bottom-0 left-0 right-0">
        <button
          className="w-full flex items-center justify-center bg-teal-400 py-2 px-4 cursor-pointer"
          onClick={handleLogout}
        >
          <span>Logout</span>
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
            className="lucide lucide-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
