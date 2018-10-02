#!/usr/bin/env node

var net = require('net')
var collect = require('collect-stream')
var lpstream = require('length-prefixed-stream')

var socket = net.connect('/tmp/dyad.socket')
var encode = lpstream.encode()
var decode = lpstream.decode()
socket.pipe(decode)
encode.pipe(socket)

collect(process.stdin, function (err, code) {
  code = code.toString()
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    encode.write(code)
    decode.on('data', function (buf) {
      var res = buf.toString()
      console.log(res)
      socket.end()
    })
  }
})
