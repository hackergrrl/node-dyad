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

## Usage (emacs)

`dyad-start-server` will start an async server process containing its own node
environment, including an interactive REPL.

You can then use `dyad-eval-form-at-point` and `dyad-run-code` to run specific
JS expressions.

## License

ISC

