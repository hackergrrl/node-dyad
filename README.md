# node-dyad

> primitive language server for node

After getting into more Common Lisp programming, I've realized how nice it is
to be able to evaluate files and functions and statements against a live
environment, to test out functions and logic incrementally as I go.

There don't seem to be many options available for Node.JS to do this; I tried
[SwankJS](https://www.emacswiki.org/emacs/SwankJs) but could not get it
working. [nodejs-repl.el](https://github.com/abicky/nodejs-repl.el) looks
promising! If it works it can replace this code.

This is a quick hack that gets you a minimal working node repl that you can
also send code to.

## Caveats

- `require` does not work (yet)
- no autocompletion on the node REPL

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

