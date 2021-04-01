
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/chat', chatRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'your mongodb link here'
  )
  .then(result => {
    console.log("DB is connected")
    const server = app.listen(3000);
    const io = require('./socket').init(server);
    let users_list = []
    io.on('connection', socket => {
      const decoded_token = jwt.verify(socket.handshake.auth.token, 'somesupersecretsecret')
      users_list.push(decoded_token.name)
      socket.emit("list_users",{clients : users_list})
      socket.broadcast.emit('new_user', {
        connected_user: decoded_token.name,
        count: io.engine.clientsCount
      });
      console.log("a client is connected", decoded_token);
      socket.on("disconnect", () => {
        users_list= users_list.filter(item => item !== decoded_token.name) 
        io.emit('disconnected_user', {
          disconnected_user: decoded_token.name,
          count: io.engine.clientsCount
        });
        console.log("disconnected")
      });
      socket.on('chat-message', (massage) => {
        io.emit('chats', {
          massage: massage.msg,
          name: decoded_token.name,
          email: decoded_token.email,
          date: new Date(),
          self: massage.userid
        })
      });


    });
  })
  .catch(err => console.log(err));
