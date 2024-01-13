require("dotenv").config();
const express = require("express");
const colors = require("colors");
const router = require("./routes");

const cors = require("cors"); // frontend and backend connection
const app = express();
const DbConnect = require("./database");
const cookieparser = require("cookie-parser");
const ACTIONS = require("./actions");
//sockets vala part video 10
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(cookieparser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));
const PORT = process.env.PORT || 5500;
DbConnect();

app.use(express.json({ limit: "8mb" }));
app.use(router);

app.get("/", (req, res) => {
  res.send(console.log(`hello`));
});

//10

const socketUserMap = {};
io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });
    socket.join(roomId);
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });


  // Handle mute unmute

  socket.on(ACTIONS.MUTE, ({ roomId ,userId}) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
       peerId: socket.id,
       userId,
      
      });
    
    })

  })

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
     const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
     clients.forEach((clientId) => {
       io.to(clientId).emit(ACTIONS.UNMUTE, {
         peerId: socket.id,
         userId,
       });
     });
  });



  // Leaving the room
  const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMap[clientId]?.id,
        });
      });
      socket.leave(roomId);
    });
    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);
});

//new map

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.bgYellow.bold.italic);
});
