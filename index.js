const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("nextKey", () => {
    console.log("nextKey");
    io.emit("nextKey");
  });
  socket.on("backKey", () => {
    console.log("backKey");
    io.emit("backKey");
  });
  socket.on("soundPlus", () => {
    io.emit("soundPlus");
  });
  socket.on("soundMinus", () => {
    io.emit("soundMinus");
  });
  socket.on("pause", () => {
    io.emit("pause");
  });
  //socket.emit("hello");
});
