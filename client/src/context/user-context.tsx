import { createContext, useContext, useState } from "react";
interface User {
  userName: string;
  createdRoom: string[];
}

interface UserContext {
  user: User;
  setUser: (user: User) => void;
}
const UserContext = createContext<UserContext>({
  user: { userName: "", createdRoom: [] },
  setUser: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ userName: "", createdRoom: [] });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);