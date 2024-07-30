import { Field } from "./components/Field";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JoinRoom } from "./components/JoinRoom";
import { NavBar } from "./components/NavBar";
import { WaitingBox } from "./components/WaitingBox";


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <div className="flex   justify-center w-full h-full ">
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
