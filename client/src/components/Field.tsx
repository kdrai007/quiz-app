import { useNavigate } from "react-router-dom";
import { randomId } from "../utils/util";
import { useSocket } from "../providers/socket-provider";
import { useUser } from "../context/user-context";

export const Field = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { socket } = useSocket();

  function handleCreateRoom() {
    const roomId = randomId();
    setUser({ ...user, createdRoom: [...user.createdRoom, roomId] });
    if (socket) {
      socket.emit("create room", { roomId, userName: user.userName })
      socket.on("room created", ({ roomId }) => {
        console.log(roomId);
      })

      navigate("/waiting-room", { state: { roomId } });
    } else {
      console.log("Something went wrong while creating the room");
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <>
        <button
          onClick={() => navigate("/join")}
          className="bg-purple-500 mr-2 rounded-md p-2 text-white"
        >
          Join Room
        </button>
        <button onClick={handleCreateRoom}>Create Room</button>
      </>
    </div>
  );
};
