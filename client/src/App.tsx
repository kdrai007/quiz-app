import { FormEvent, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Field } from "./components/Field";
import { JoinRoom } from "./components/JoinRoom";
import { NavBar } from "./components/NavBar";
import { WaitingBox } from "./components/WaitingBox";
import { useUser } from "./context/user-context";
import { Notification } from "./components/Notification";

interface Notification {
  message: string;
  type: "success" | "error";
  status: boolean;
}

function App() {
  const { user, setUser } = useUser();
  const [notification, setNotification] = useState<Notification>({ message: "", type: "success", status: false });
  const inputRef = useRef<HTMLInputElement>(null);

  if (user.userName === "") {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const value = inputRef.current?.value;
      if (value) setUser({ ...user, userName: value });
    }

    return <form className="flex justify-center items-center gap-2 h-screen" onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder="Enter your name" className="p-2 border-b border-neutral-500" />
      <button className="bg-purple-500 rounded-md p-2 text-white">Submit</button>
    </form>
  }
  function manageNotification(message: string, type: "success" | "error") {
    setNotification({ message, type, status: true });
    setTimeout(() => setNotification({ message: "", type, status: false }), 3000);
  }
  return (
    <>
      <Router>
        <NavBar />
        <Notification message={notification.message} type={notification.type} status={notification.status} />
        <div className="flex justify-center w-full h-full ">
          <Routes>
            <Route path="/" element={<Field />} />
            <Route path="/waiting-room" element={<WaitingBox manageNotification={manageNotification} />} />
            <Route path="/join" element={<JoinRoom manageNotification={manageNotification} />} />
          </Routes>
        </div >
      </Router>
    </>
  );
}

export default App;