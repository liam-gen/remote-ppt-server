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
  socket.on("nextKey", (data) => {
    io.emit("nextKey", data);
  });
  socket.on("backKey", (data) => {
    io.emit("backKey", data);
  });
  socket.on("soundPlus", (data) => {
    io.emit("soundPlus", data);
  });
  socket.on("soundMinus", (data) => {
    io.emit("soundMinus", data);
  });
  socket.on("pause", (data) => {
    io.emit("pause", data);
  });
  socket.on("write", (data) => {
    io.emit("write", data);
  });
});
