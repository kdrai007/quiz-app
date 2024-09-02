import { useEffect, useState } from "react";
import { useSocket } from "../providers/socket-provider";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/user-context";

export const WaitingBox = () => {
  const { socket } = useSocket();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const { setRoomMembers, roomMembers } = useUser();

  useEffect(() => {
    if (!socket) {
      console.log("socket is not connected");
      return;
    }
    // Debug: Check if the socket is connected
    console.log("Socket connected:", socket.connected);

    // Handle the new user joining the room
    const handleNewUser = (userName: { userName: string }) => {
      console.log("New user received:", userName.userName);
      console.log("Old Members", roomMembers)
      // setRoomMembers([...roomMembers, userName.userName]);
    };

    // Set up the event listeners
    socket.on("new user", handleNewUser);

    // Clean up the event listeners on unmount or when socket changes
    return () => {
      socket.off("new user", handleNewUser);
    };
  }, [socket]);

  return (
    <div className="border-2 border-black h-[60%] w-[50%] rounded-md px-4 mt-10">
      <div className="text-center mt-2 font-bold">Waiting Room ...</div>
      {roomId !== null && <h3 className="">Room ID is {roomId}</h3>}
      {roomMembers.length !== 0 && roomMembers.map((u: string, index: number) => <p className="" key={u + index}>{u}</p>)}
      <div className="mt-5"></div>
    </div>
  );
};
