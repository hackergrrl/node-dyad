# node-dyad

> primitive language server for node

After getting into more Common Lisp programming, I've realized how nice it is
to be able to evaluate files and functions and statements against a live
environment, to test out functions and logic incrementally as I go.

There don't seem to be many options available for Node.JS to do this; I tried
[SwankJS](https://www.emacswiki.org/emacs/SwankJs) but could not get it
working. [nodejs-repl.el](https://github.com/abicky/nodejs-repl.el) looks
promising! If it works it can replace this code (though this implementation
allows any language capable of shelling out to enjoy node interaction too!)

This is a quick hack that gets you a minimal working node repl that you can
also send code to.

## Caveats

- you need to hit enter twice on the REPL after it starts for it to start working
- no autocompletion on the node REPL

![screenshot of emacs running node-dyad](https://github.com/noffle/node-dyad/raw/master/screenshot.jpg)


## Usage (cli)

```
git clone 'ssb://%Hu+5CQcuQVYntvDuPmtrdRhBLLHb9ZEcVWLITKAAPeA=.sha256' node-dyad
cd node-dyad
```

### `node server.js`

Starts a node dyad server. Also acts as an interactive REPL.

### `echo '3 + 4' | node client.js`

Reads javascript code on standard input and sends it to the dyad server to be evaluated. Writes its result to standard out.

## Usage (emacs)

### `dyad-start-server`

Starts an async server process containing its own node environment, including an interactive REPL on stdin/stdout.

### `dyad-eval-current-defun`

Evaluates the function the current point is in.

### `dyad-eval-buffer`

Evaluates the entire current buffer.

### `dyad-run-code`

Interactive: prompts you for JS code to be evaluated.

## License

ISC

