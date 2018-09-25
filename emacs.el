(defun dyad-start-server ()
  (interactive)
  (shell-command "rm -rf /tmp/dyad.socket && node ~/dev/dyad-node-repl/server.js &"))

(defun dyad-eval-form-at-point ()
  (interactive)
  (let* ((current (dyad--current-defun))
         (code (buffer-substring-no-properties (car current) (cadr current))))
    (dyad--flash-region (car current) (cadr current))
    (dyad--run-code code)))

(defun dyad-run-code (code)
  (interactive "sCode: ")
  (message (dyad--run-code code)))

(defun dyad--run-code (code)
  (interactive "sCode: ")
  (write-region code nil "/tmp/dyad-code.tmp")
  (string-trim
   (shell-command-to-string "node ~/dev/dyad-node-repl/client.js < /tmp/dyad-code.tmp")))

(defun dyad--current-defun ()
  (save-excursion
    (js-beginning-of-defun)
    (let ((start (point)))
      (js-end-of-defun)
      (list start (point)))))

(defun dyad--flash-region (start end &optional timeout)
  "Temporarily highlight region from START to END."
  (let ((overlay (make-overlay start end)))
    (overlay-put overlay 'face 'secondary-selection)
    (run-with-timer (or timeout 0.2) nil 'delete-overlay overlay)))
