import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type socketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const socketContext = createContext<socketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <socketContext.Provider value={{ socket, isConnected }}>
      {children}
    </socketContext.Provider>
  );
};
export const useSocket = () => useContext(socketContext);
