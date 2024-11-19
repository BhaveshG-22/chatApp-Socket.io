const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3004",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("ack-join-ws-&-join-room-event", (room) => {
    socket.join(room);
  });

  socket.on("msg-from-client-to-server-to-client", (data) => {
    socket.to(data.room).emit("msg-from-client-to-server-to-client", data.msg);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

server.listen(4001, () => {
  console.log("Server Listening on port 4000");
});
