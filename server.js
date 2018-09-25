var net = require('net')
var collect = require('collect-stream')
var lpstream = require('length-prefixed-stream')

var geval = eval

var server = net.createServer(function (socket) {
  var decode = lpstream.decode()
  socket.pipe(decode)
  var encode = lpstream.encode()
  encode.pipe(socket)
  decode.on('data', function (buf) {
    var code = buf.toString()
    var res = String(geval(code))
    encode.write(res)
  })
})
  
server.listen('/tmp/dyad.socket', function () {
  console.log('server up on localhost:8321')

  process.stdout.write('NODE> ')
  process.stdin.on('data', function (buf) {
    var code = buf.toString()
    var res
    try {
      res = String(geval(code))
    } catch (e) {
      res = e.toString()
    }
    console.log(res)
    process.stdout.write('NODE> ')
  })
})
