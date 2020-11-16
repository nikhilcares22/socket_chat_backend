const { set } = require('mongoose');

require('./db/dbconnect');
const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  User = require('./models/user'),
  Chat = require('./models/message'),
  cors = require('cors');


app.use(cors());


const port = parseInt(process.env.PORT, 10) || 4000;

http.listen(port, () => {
  console.log(`listening on ${port}`);
});


let activeUser = [];
io.on('connection', (socket) => {
  console.log('connected');

  socket.on('new user', async ({ name, id }) => {
    // console.log(socket.id);

    activeUser.push(socket.id)

    if (id == '' || id == null) {
      try {
        let newUser = await new User({
          name: name,
          socket_id: socket.id,
          isActive: true
        }).save();

        // console.log(newUser);
      } catch (error) {
        console.log(error);
      }
    } else {
      let foundUser = await User.findByIdAndUpdate(id, { isActive: true, socket_id: socket.id }, { new: true });
      // console.log(foundUser);

    }

    console.log('activeUser', activeUser);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    //remove from socket array
    activeUser.splice(activeUser.indexOf(socket.id), 1)

  })
});

