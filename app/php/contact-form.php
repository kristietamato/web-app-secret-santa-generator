<?php
  if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $human = intval($_POST['human']);
    $from = 'Simple Contact Form';
    $to = 'kristietamato@gmail.com';
    $subject = 'Message from contactform.tamato.org';
    $body = "From: $name \n E-Mail: $email \n Message: \n $message";

    // validate human
    if ($human === 5) {
      $isHuman = TRUE;
    }

    // If human, send the email
    if ($isHuman) {
      if (mail ($to, $subject, $body, $from)) {
        $result='<div class="alert alert-success">Thank you, your message is sent.</div>';
      } else {
        $result='<div class="alert alert-danger">There was an error sending your message. Please try again later.</div>';
      }
    }
  }
?>
