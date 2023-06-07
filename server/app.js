require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || '3001';
const app = express();
const http = require('http');
const server = http.createServer(app);
mongoose.connect(process.env.MONGODB_URL);
app.use(express.json());

const Users = require('./models/Users');

const user1 = Users({
  id: 1,
  username: 'pip',
});

user1.save().then(
  () => console.log('One entry added'),
  (err) => console.log(err)
);

const user2 = Users({
  id: 2,
  username: 'leeroycool',
});

user2.save().then(
  () => console.log('One entry added'),
  (err) => console.log(err)
);

// routes
require('./routes/UsersRoutes')(app);
require('./routes/ChatssRoutes')(app);

// set app ports and policies
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', port);

app.get('/', (req, res) => {
  res.send('bruh');
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
