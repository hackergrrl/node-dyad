(defun js/current-defun ()
  (save-excursion
    (js-beginning-of-defun)
    (let ((start (point)))
      (js-end-of-defun)
      (buffer-substring-no-properties start (point)))))
