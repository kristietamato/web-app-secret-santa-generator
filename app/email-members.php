<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $members_list = $_POST['membersList'];
    $member_name = trim_input($_POST['input-name']);
    $member_email = 'kristietamato@gmail.com';
    $secret_santa_for = 'Sam';
    $group_name = trim_input($_POST['group-name']);
    $budget = trim_input($_POST['budget']);
    $exchange_date = trim_input($_POST['exchange-date']);
    $message = trim_input($_POST['email-message']);
    $from = 'Tamato.org - Secret Santa Generator';
    $subject = 'Message from Tamato.org - Secret Santa Generator';
    $body = "Hello, $member_name, you are the Secret Santa for... $secret_santa_for \n More information: \n $members_list";

    if (mail ($member_email, $subject, $body, $from)) {
      $result='<div class="alert alert-success">Thank you, your message is sent.</div>';
    } else {
      $result='<div class="alert alert-danger">There was an error sending your message. Please try again later.</div>';
    }
  }

  function trim_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>