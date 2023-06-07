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

const Users = require('./models/Users');

// uncomment this to test db connection

// const studentSchema = new mongoose.Schema({
//   roll_no: Number,
//   name: String,
//   year: Number,
//   subjects: [String],
// });

// const Student = mongoose.model('Student', studentSchema);

// const stud = new Student({
//   roll_no: 1001,
//   name: 'Madison Hyde',
//   year: 3,
//   subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming'],
// });
// stud.save().then(
//   () => console.log('One entry added'),
//   (err) => console.log(err)
// );

const newUser = Users({
  id: 1,
  username: 'pip',
});

newUser.save().then(
  () => console.log('One entry added'),
  (err) => console.log(err)
);

// set app ports and policies
app.use(express.json());
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
