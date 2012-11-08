var
  express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
});

io.sockets.on('connection', function (socket) {
  io.sockets.emit('joined', {id: socket.id})
  socket.on('rename', function(data) {
    io.sockets.emit('rename', {id: socket.id, newName: data.newName})
  });
  socket.on('disconnect', function () {
    io.sockets.emit('disconnect', {id: socket.id});
  });
});

app.get('/', function (req, res) {
  res.render("index.jade", 200);
});

server.listen(3000);
