import { useEffect, useState } from "react";
import { useSocket } from "../providers/socket-provider";
import { useLocation } from "react-router-dom";

interface User {
  id: number,
  userName: string
}

export const WaitingBox = () => {
  const { socket } = useSocket();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [user, setUsers] = useState<User[]>([])
  useEffect(() => {
    if (socket) {
      const handleNewUser = (newUser: User) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      };

      // Set up the event listener
      socket.on("new user", handleNewUser);

      // Clean up the event listener on unmount or when socket changes
      return () => {
        socket.off("new user", handleNewUser);
      };
    }
  }, [socket]);
  return (
    <div className="border-2 border-black h-[60%] w-[50%] rounded-md px-4">
      <div className="text-center mt-2 font-bold">Waiting Room ...</div>
      {roomId !== null && <h3 className="">roomId is {roomId}</h3 >}
      {user.length !== 0 && user.map((u: User) => <p className="" key={u.id}>{u.userName}</p  >)}
      <div className="mt-5"></div>
    </div>
  );
};
