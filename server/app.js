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

// connect to mongoDB server
mongoose.connect(process.env.MONGODB_URL);

// set up request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// const Users = require('./models/Users');
// const Chats = require('./models/Chats');

// const user1 = Users({
//   id: 1,
//   username: 'pip',
// });

// user1.save().then(
//   () => console.log('One entry added'),
//   (err) => console.log(err)
// );

// const user2 = Users({
//   id: 2,
//   username: 'leeroycool',
// });

// user2.save().then(
//   () => console.log('One entry added'),
//   (err) => console.log(err)
// );

// const chat1 = Chats({
//   chatName: 'Cool Chat Between LEEROYCOOL and PIP',
//   users: [user1._id, user2._id],
// });

// chat1.save().then(
//   () => console.log('One entry added'),
//   (err) => console.log(err)
// );

// set app ports and policies
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);

//initialize session and cookies
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'blabber', 
    resave: false, 
    cookie: {maxAge: oneDay},
    saveUninitialized: true
  }));
app.use(cookieParser());

// routes
require('./routes/UsersRoutes')(app);
require('./routes/ChatsRoutes')(app);

app.get('/', (req, res) => {
  if ('username' in req.session){
    res.send('sup ' + req.session.username + '<br/>' + 
      `<form action="/users/logout" method="post">
          <input type="submit" value="logout" />
      </form>`);
  }
  else {
    res.send(`
        <h1>LOGIN</h1>
        <form action="/users/login" method="post">
            <input type="text" id='username' name="username" placeholder="username"/>
            <input type="text" id='password' name="password" placeholder="password"/>
            <input type="submit" value="Login" />
        </form>
    `)
  }
});

/** socket.io proof of concept */
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('show message', msg);
  });
});

// set server connection
server.listen(port, () => {
  console.log('listening on port:' + port);
});
