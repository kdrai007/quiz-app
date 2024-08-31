import { useRef } from "react";
import { useSocket } from "../providers/socket-provider";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user-context";

export const JoinRoom = () => {
  const { user } = useUser();
  const { socket } = useSocket();

  const navigate = useNavigate();
  const codeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (codeRef.current) {
      const code = codeRef.current.value

      socket?.emit("join room", {
        userName: user.userName,
        roomId: code
      })
      socket?.on("check code", (value) => {
        if (value?.isCorrect) navigate("/waiting-room", { state: { roomId: code } });
      })
    }
  }

  return <div className="flex flex-col gap-2 items-center mt-40" onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
    <input ref={codeRef} type="text" placeholder="enter code" className="p-2  border-b border-neutral-500" />
    <button className="bg-pink-400 hover:bg-pink-300 p-2 rounded-md text-white" onClick={handleSubmit} >join room</button  >
  </div >
};
