const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http"); // Import http module
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const socket = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");
}

const server = app.listen(process.env.PORT, () => {
  console.log("Server Started successfully");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",  // Add the correct origin
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
