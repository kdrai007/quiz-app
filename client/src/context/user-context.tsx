import { createContext, useContext, useEffect, useState } from "react";
interface User {
  userName: string;
  createdRoom: string[];
}


interface UserContext {
  user: User;
  roomMembers: string[];
  setRoomMembers: (roomMember: string[]) => void;
  setUser: (user: User) => void;
}
const UserContext = createContext<UserContext>({
  user: { userName: "", createdRoom: [] },
  roomMembers: [],
  setRoomMembers: () => { },
  setUser: () => { },
});
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ userName: "", createdRoom: [] });
  const [roomMembers, setRoomMembers] = useState<string[]>([]);
  useEffect(() => {
    console.log("memebers added", roomMembers);
  }, [roomMembers])

  return (
    <UserContext.Provider value={{ user, setUser, roomMembers, setRoomMembers }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);