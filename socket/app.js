import { Server } from "socket.io";

const io = new Server({
  cors: {
    // origin: "https://catringboys.netlify.app",
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];
const addUser = (userId, socketId) => {
  const userExists = onlineUsers.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("newUser", (userId) => {
    console.log("New user:", userId);
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message "${data.text}" sent to:`, receiverId);
    } else {
      console.log("User is not online", receiverId);
    }
  });

  socket.on("newChat", ({ receiverId, data }) => {
    try {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("newChatFound", data);
        console.log(`Chat added to: ${receiverId}`);
      } else {
        console.log(`User not found: ${receiverId}`);
      }
    } catch (error) {
      console.error(
        `Error handling new chat for receiverId ${receiverId}:`,
        error
      );
    }
  });
  
  socket.on("typing", ({ receiverId, chatId, status }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("userIsTyping", { chatId, status });
      console.log("User is typing:", receiverId);
    } else {
      console.log("User not found:", receiverId);
    }
  });


  socket.on("deleteChat", ({ receiverId, chatId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("chatDeleted", chatId);
      console.log("Chat deleted from:", receiverId);
    } else {
      console.log("User not found:", receiverId);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    removeUser(socket.id);
  });
});

io.listen(4000);
