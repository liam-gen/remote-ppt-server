const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require('cors');
const fs = require("fs")
const fileUpload = require('express-fileupload');

const app = express();

if(!fs.exists(__dirname+"/packages/lgjs-tools-chat/uploads/"))
{
  fs.mkdirSync(__dirname+"/packages/lgjs-tools-chat/uploads/", {recursive: true})
}

app.use(fileUpload());
app.use(cors())

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/lgjs-tools-uploads", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.fileToUpload;
  uploadPath = __dirname + '/packages/lgjs-tools-chat/uploads/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(uploadPath);
  });
});

server.listen(8000, () => {
  console.log("server running at http://localhost:8000 with CORS");
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

  socket.on("lgjs-tools-chat", (data) => {
    io.emit("lgjs-tools-chat", data);
  });
});
