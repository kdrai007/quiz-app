import { useEffect } from "react";
import { useSocket } from "../providers/socket-provider";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/user-context";

export const WaitingBox = ({ manageNotification }: { manageNotification: (message: string, type: "success" | "error") => void }) => {
  const { socket } = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const roomId = location.state?.roomId;
  const { user, setRoomMembers, roomMembers } = useUser();

  useEffect(() => {
    if (!socket) {
      console.log("Socket is not connected");
      return;
    }

    // Debug: Check if the socket is connected
    console.log("Socket connected:", socket.connected);

    // Handle the new user joining the room
    const handleNewUser = (userName: { userName: string }) => {
      console.log("New user received:", userName.userName);
      setRoomMembers((prevState: string[]) => [...prevState, userName.userName]);
    };

    // Handle receiving the start quiz event
    const handleStartQuiz = ({ message }: { message: string }) => {
      manageNotification(message, "success");
      navigate("/quiz-room", { state: { roomId } });
    };

    // Set up the event listeners
    socket.on("new user", handleNewUser);
    socket.on("start quiz", handleStartQuiz);

    // Clean up the event listeners on unmount or when socket changes
    return () => {
      socket.off("new user", handleNewUser);
      socket.off("start quiz", handleStartQuiz);
    };
  }, [socket]);

  function StartQuiz() {
    if (socket) {
      socket.emit("start quiz", { roomId })
      manageNotification("Quiz Started", "success")
      navigate("/quiz-room", { state: { roomId } })
    }
  }
  function deleteRoom() {
    console.log("deleting room");
  }

  return (
    <div className="border-2 border-black h-[60%] w-[50%] rounded-md px-4 mt-10 flex flex-col">
      <div className="text-center mt-2 font-bold">Waiting Room ...</div>
      {roomId !== null && user.createdRoom.includes(roomId) && <h3 className="">Room ID is {roomId}</h3>}
      {roomMembers.length !== 0 && roomMembers.map((u: string, index: number) => <p className="" key={u + index}>{u}</p>)}
      <div className="mt-5 flex-grow"></div>
      <div className="space-x-2 self-center mt-auto mb-2">
        {roomId !== null && user.createdRoom.includes(roomId) &&
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" onClick={deleteRoom}>Delete Room</button>
        }
        {roomId !== null && user.createdRoom.includes(roomId) && roomMembers.length > 0 && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={StartQuiz}>start quiz</button>}
      </div>
    </div>
  );
};
