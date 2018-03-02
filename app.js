const express = require('express')
  , app = express()
  , server = require('http').Server(app)
  , path = require('path')
  , ejs = require('ejs')
  , vidRoute = require(path.join(__dirname, 'routes/vidRoute'))
  , socket = require('socket.io')
  , io = require('socket.io')(server);


// Configuration


app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
// app.use(express.session({ secret: 'your secret here' }));
// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(path.join(__dirname, 'public')))


// Routes
app.use('/', vidRoute);

io.on('connection', (socket) => {
  
  socket.on('stream', (data) => {
    // console.log(data);
    socket.broadcast.emit('stream', data);
    // socket.broadcast.emit('stream', [1,2,3]);
  });

  socket.on('test', (data) => {
    // socket.broadcast.emit('test', data);
    // socket.emit('test', data);
    console.log(data)
  })

  socket.on('co', (co) => {
    // console.log(data);
    socket.broadcast.emit('co', co);
  });

  /*let count = 0;
  setInterval(() => {
    socket.broadcast.emit('co', count++)
  }, 1250)*/
});

server.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});