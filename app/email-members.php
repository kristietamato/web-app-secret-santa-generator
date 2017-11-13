<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $subject = 'Message from Tamato.org - Secret Santa Generator';
    if(!empty($_POST['group-name']))
    {
      $group_name = trim_input($_POST['group-name']);
    } else {
      $group_name = 'Secret Santa Group';
    }
    if(!empty($_POST['budget']))
    {
      $budget = trim_input($_POST['budget']);
    } else {
      $budget = 50;
    }
    if(!empty($_POST['exchange-date']))
    {
      $exchange_date = trim_input($_POST['exchange-date']);
    }
    if(!empty($_POST['message']))
    {
      $message = trim_input($_POST['email-message']);
    } else {
      $message = 'default message';
    }
    if(!empty($_POST['membersList']))
    {
      $members_list = json_decode($_POST['membersList']);

      foreach($members_list as $member) {
        $member_name = trim_input($member->memberName);
        $member_email = 'kristietamato@gmail.com';
        $secret_santa_for = trim_input($member->memberSecretSanta);
        $from = 'Tamato.org - Secret Santa Generator';
        $body = 'Hello, ' . $member_name . ', you are the Secret Santa for... ' . $secret_santa_for . '\nMore information: \n' . $message;
        mail($member_email, $subject, $body, $from);
        error_log("member_email = " . $member_email);
        error_log("subject = " . $subject);
        error_log("body = " . $body);
      }
    }
  }

  function trim_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>