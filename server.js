var net = require('net')
var collect = require('collect-stream')
var lpstream = require('length-prefixed-stream')
var vm = require('vm')

var sandbox = {}
vm.createContext(sandbox)

var server = net.createServer(function (socket) {
  var decode = lpstream.decode()
  socket.pipe(decode)
  var encode = lpstream.encode()
  encode.pipe(socket)
  decode.on('data', function (buf) {
    var code = buf.toString()
    var res = vm.runInContext(code, sandbox)
    console.log('res', typeof res, res)
    res = String(res)
    console.log(code, ' -> ', res)
    encode.write(res)
  })
})
  
server.listen('/tmp/dyad.socket', function () {
  console.log('server up on localhost:8321')
})

