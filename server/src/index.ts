import { IoManager } from "./managers/IoManager";
const io = IoManager.getIo();

interface Room {
  [key: string]: string[]
}

var userId = 1;
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
      rooms[roomId].push(userName);
    }

  })

  socket.on("disconnect", () => {
    // console.log("user with socket id disconnected", socket.id);
  });
});

io.listen(3000);
