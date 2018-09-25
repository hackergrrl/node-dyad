var net = require('net')
var collect = require('collect-stream')
var lpstream = require('length-prefixed-stream')
var through = require('through2')
var REPL = require('repl')

var input = through()
var output = through(function (chunk, enc, next) {
  if (!taken) process.stdout.write(chunk.toString().replace('!@#$', ''))
  next(null, chunk)
})

var taken = false

var repl = REPL.start({
  prompt: '!@#$',
  input: input,
  output: output,
  terminal: false
})

function myEval (code, cb) {
  taken = true
  var res = ''
  output.on('data', accum)

  input.write(code)
  input.write('\n')

  function accum (buf) {
    buf = buf.toString()
    var end = buf.indexOf('!@#$')
    if (end === -1) res += buf
    else {
      res += buf.substring(0, end)
      cb(null, res)
      output.removeListener('data', accum)
      taken = false
    }
  }
}

var server = net.createServer(function (socket) {
  var decode = lpstream.decode()
  socket.pipe(decode)
  var encode = lpstream.encode()
  encode.pipe(socket)
  decode.on('data', function (buf) {
    var code = buf.toString()
    myEval(code, function (err, res) {
      if (err) throw err
      encode.write(res)
    })
  })
})
  
server.listen('/tmp/dyad.socket', function () {
  console.log('server up on localhost:8321')

  process.stdout.write('NODE> ')
  process.stdin.on('data', function (buf) {
    var code = buf.toString()
    myEval(code, function (err, res) {
      if (err) throw err
      console.log(res)
    })
    process.stdout.write('NODE> ')
  })
})
