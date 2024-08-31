import { Field } from "./components/Field";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JoinRoom } from "./components/JoinRoom";
import { NavBar } from "./components/NavBar";
import { WaitingBox } from "./components/WaitingBox";
import { useUser } from "./context/user-context";
import { FormEvent, useRef } from "react";


function App() {
  const { user, setUser } = useUser();
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
  return (
    <>
      <Router>
        <NavBar />
        <div className="flex justify-center w-full h-full ">
          <Routes>
            <Route path="/" element={<Field />} />
            <Route path="/waiting-room" element={<WaitingBox />} />
            <Route path="/join" element={<JoinRoom />} />
          </Routes>
        </div >
      </Router>
    </>
  );
}

export default App;