import { useRef } from "react";
import { useSocket } from "../providers/socket-provider";
import { useNavigate } from "react-router-dom";

export const JoinRoom = () => {
  const { socket } = useSocket();

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (nameRef.current && codeRef.current) {
      const userName = nameRef.current.value;
      const code = codeRef.current.value

      socket?.emit("join room", {
        userName,
        roomId: code
      })
      socket?.on("check code", (value) => {
        if (value?.isCorrect) navigate("/waiting-room");
      })
    }
  }

  return <div className="flex flex-col gap-2 items-center mt-40" onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
    <input ref={nameRef} type="text" className="p-2 border-b border-neutral-500" placeholder="enter name" />
    <input ref={codeRef} type="text" placeholder="enter code" className="p-2  border-b border-neutral-500" />
    <button className="bg-pink-400 hover:bg-pink-300 p-2 rounded-md text-white" onClick={handleSubmit} >join room</button  >
  </div >
};
