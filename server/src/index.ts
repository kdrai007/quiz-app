import { IoManager } from "./managers/IoManager";
const io = IoManager.getIo();

io.on("connection", (socket) => {
  console.log("user with socket id connected", socket.id);
  socket.emit("after connection", {
    name: "kdrai",
    class: "12th",
    occupation: "student",
  });

  socket.on("disconnect", () => {
    console.log("user with socket id disconnected", socket.id);
  });
});

io.listen(3000);
