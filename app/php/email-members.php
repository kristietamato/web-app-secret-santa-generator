<?php
  if ($_POST['submit']) {
    $member_name = $_POST['input-name'];
    $member_email = $_POST['input-email'];
    $secret_santa_name = 'sam';
    $group_name = $_POST['group-name'];
    $budget = $_POST['budget'];
    $exchange_date = $_POST['exchange-date'];
    $message = $_POST['email-message'];
    $from = 'Tamato.org - Secret Santa Generator';
    $subject = 'Message from contactform.tamato.org';
    $body = "From: $member_name \n E-Mail: $member_email \n Message: \n $message";

    if (mail ($member_name, $member_email, $secret_santa_name, $group_name,
    $budget, $exchange_date, $message, $from, $subject, $body)) {
      $result='<div class="alert alert-success">Thank you, your message is sent.</div>';
    } else {
      $result='<div class="alert alert-danger">There was an error sending your message. Please try again later.</div>';
    }
  }
?>