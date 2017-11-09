<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $group_name = trim_input($_POST['group-name']);
    $budget = trim_input($_POST['budget']);
    $exchange_date = trim_input($_POST['exchange-date']);
    $message = trim_input($_POST['email-message']);
    $subject = 'Message from Tamato.org - Secret Santa Generator';
    $members_list = json_decode($_POST['membersList']);

    foreach($members_list as $member) {
      $member_name = trim_input($member.memberName);
      $member_email = 'kristietamato@gmail.com';
      $secret_santa_for = trim_input($member.memberSecretSantaIndex);
      $from = 'Tamato.org - Secret Santa Generator';
      $body = 'Hello, $member_name, you are the Secret Santa for... 
              $secret_santa_for \n More information: \n $message';
      mail($member_email, $subject, $body, $from);    
    }
  }

  function trim_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
?>