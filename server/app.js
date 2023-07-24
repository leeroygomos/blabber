require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || '3001';
const app = express();
const http = require('http');
const server = http.createServer(app);
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const sessionStore = require('sessionstore');

const sessionStore = new Map();

// connect to mongoDB server
mongoose.connect(process.env.MONGODB_URL);

// set up request parsers
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));

// set app ports and policies
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);

//initialize session and cookies
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: 'blabber',
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
  })
);
app.use(cookieParser());

// routes
require('./routes/UsersRoutes')(app);
require('./routes/ChatsRoutes')(app);
require('./routes/MessagesRoutes')(app);

app.get('/', (req, res) => {
  if ('username' in req.session) {
    res.send(
      'sup ' +
        req.session.username +
        '<br/>' +
        `<form action="/users/logout" method="post">
          <input type="submit" value="logout" />
      </form>`
    );
  } else {
    res.send(`
        <h1>LOGIN</h1>
        <form action="/users/login" method="post">
            <input type="text" id='username' name="username" placeholder="username"/>
            <input type="text" id='password' name="password" placeholder="password"/>
            <input type="submit" value="Login" />
        </form>
    `);
  }
});

const httpServer = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    console.log(sessionStore);
    console.log('session id ' + sessionID);
    console.log('yes or no ' + sessionStore.has(sessionID.toString()));
    const currentSession = sessionStore.has(sessionID.toString()) ? sessionStore.get(sessionID.toString()) : false;
    console.log('session ' + sessionStore.get(sessionID.toString()));
    if (currentSession) {
      console.log(currentSession);
      socket.sessionID = currentSession.id;
      socket.userID = currentSession.userID;
      socket.username = currentSession.username;
    }
  }
  else{
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    // create new session
    socket.sessionID = Date.now();
    socket.userID = socket.handshake.auth.userID;
    socket.username = username;

    sessionStore.set((socket.sessionID).toString(), {"id": socket.sessionID, "userID": socket.userID, "username": socket.username});
  }
  next();
});

io.on("connection", (socket) => {

  socket.join(socket.userID);

  // emit the list of connected users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: socket.userID,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  // emit the session and user id to the session
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // emit that a new user has connected
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
  });

  // private messaging
  socket.on("private message", ({ msg, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      msg,
      from: socket.userID,
      fromUsername: socket.username,
      to,
    });
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
    }
    sessionStore.delete((socket.sessionID).toString());
  });

});

server.listen(port, () => {
  console.log('listening on port:' + port);
});