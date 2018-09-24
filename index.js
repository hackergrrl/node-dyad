var net = require('net')
var repl = require('repl')
var through = require('through2')

var input = through()
var output = through(function (chunk, _, next) {
  next(null, chunk)
})

output.pipe(process.stdout)

repl.start({
  prompt: '> ',
  input: input,
  output: output,
  terminal: false
})

process.stdin.on('data', function (buf) {
  input.write(buf)
})

var server = net.createServer(function (socket) {
  socket.pipe(input)
})
  
server.listen('/tmp/dyad.socket', function () {
  console.log('server up on localhost:8321')
})

