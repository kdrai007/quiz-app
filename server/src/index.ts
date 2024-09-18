import { IoManager } from "./managers/IoManager";
const io = IoManager.getIo();

interface Room {
  [key: string]: string[]
}

const rooms: Room = {};
io.on("connection", (socket) => {

  socket.on("create room", ({ roomId, userName }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(userName)
    socket.join(roomId);
    console.log(`${userName} Created and joined the room: ${roomId}`)
    socket.emit("room created", { roomId })
  })
  socket.on("join room", ({ roomId, userName }) => {
    if (rooms[roomId]) {
      if (!rooms[roomId].includes(userName)) {
        rooms[roomId].push(userName);
        socket.join(roomId)
        // new user get existing users
        const existingUsers = rooms[roomId];
        console.log(existingUsers);
        socket.emit("existing users", { users: existingUsers })
        // boradcasting the new user to existing users
        socket.in(roomId).emit("new user", { userName });
        console.log("new user joined the room ", userName)
        socket.emit("check code", { isCorrect: true })
      }
    }
  })

  socket.on("start quiz", ({ roomId }) => {
    if (rooms[roomId]) {
      socket.to(roomId).emit("start quiz", { message: "starting quiz! let's goooooo!" })
    }
  })
  socket.on("quiz answer", ({ userName, roomId, answer, quizId }) => {
    console.log("incoming answer", answer);
    socket.to(roomId).emit("quiz answer", { answer, userName })
  })

  socket.on("next quiz", ({ roomId, setIndex }) => {
    if (rooms[roomId]) {
      socket.to(roomId).emit("next quiz", { setIndex })
    }
  })

  socket.on("disconnect", () => { });
});

io.listen(3000);
