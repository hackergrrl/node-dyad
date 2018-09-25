(defun js/eval-form-at-point ()
  (let* ((current (js/current-defun))
         (code (buffer-substring-no-properties (car current) (cadr current))))
    (flash-region (car current) (cadr current))))

(defun js/current-defun ()
  (save-excursion
    (js-beginning-of-defun)
    (let ((start (point)))
      (js-end-of-defun)
      (list start (point)))))

(defun flash-region (start end &optional timeout)
  "Temporarily highlight region from START to END."
  (let ((overlay (make-overlay start end)))
    (overlay-put overlay 'face 'secondary-selection)
    (run-with-timer (or timeout 0.2) nil 'delete-overlay overlay)))
