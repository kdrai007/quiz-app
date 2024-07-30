import { useNavigate } from "react-router-dom";
import { randomId, userName as user } from "../utils/util";
import { useSocket } from "../providers/socket-provider";

export const Field = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  function handleCreateRoom() {
    const userName: string = user;
    const roomId = randomId();
    if (socket) {
      socket.emit("create room", { roomId, userName })
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
