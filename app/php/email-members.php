<?php
  if (isset($_POST['submit'])) {
    $member_name = $_POST['member-name'];
    $member_email = $_POST['member-email'];
    $message = $_POST['email-message'];
    $human = intval($_POST['human']);
    $from = 'Tamato.org - Secret Santa Generator';
    $secret_santa_email = 'kristietamato@gmail.com';
    $subject = 'Message from contactform.tamato.org';
    $body = "From: $member_name \n E-Mail: $member_email \n Message: \n $message";

    // validate human
    if ($human === 5) {
      $isHuman = TRUE;
    }

    // If human, send the email
    if ($isHuman) {
      if (mail ($secret_santa_email , $subject, $body, $from)) {
        $result='<div class="alert alert-success">Thank you, your message is sent.</div>';
      } else {
        $result='<div class="alert alert-danger">There was an error sending your message. Please try again later.</div>';
      }
    }
  }
?>