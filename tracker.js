const Server = require('bittorrent-tracker').Server

const port = 3303

const server = new Server({
  udp: true, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true // enable web-based statistics? [default=true]
})

// Internal http, udp, and websocket servers exposed as public properties.
server.http
server.udp
server.ws

server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

server.on('listening', function () {
  // fired when all requested servers are listening
  console.log('listening on http port:' + server.http.address().port)
  console.log('listening on udp port:' + server.udp.address().port)
  console.log('listening on ws port:' + server.ws.address().port)
})

// start tracker server listening! Use 0 to listen on a random free port.
server.listen(port)

// listen for individual tracker messages from peers:

server.on('start', function (addr) {
  console.log('got start message from ' + addr)
})
