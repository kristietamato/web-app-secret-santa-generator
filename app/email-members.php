<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $subject = 'Message from Tamato.org - Secret Santa Generator';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
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
        //$to = trim_input($member->memberEmail);
        $to = 'kristietamato@gmail.com';
        $secret_santa_for = trim_input($member->memberSecretSanta);
        $message = new Message();
        $message->setMessage($member_name, $to, $secret_santa_for, $budget);
        mail($to, $subject, $message->getMessage(), $headers);
      }
    }
  }

  function trim_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  class Message {
    private $message;
    public function setMessage($member_name, $to, $secret_santa_for, $budget) {
      $message = '<html><body>';
      $message .= '<img src="secretsanta.tamato.org/images/secret-santa.jpg />';
      $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
      $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . $member_name . "</td></tr>";
      $message .= "<tr><td><strong>Email:</strong> </td><td>" . $to . "</td></tr>";
      $message .= "<tr><td><strong>Type of Change:</strong> </td><td>" . $secret_santa_for . "</td></tr>";
      $message .= "<tr><td><strong>Urgency:</strong> </td><td>" . $budget . "</td></tr>";
      $message .= "<tr><td><strong>NEW Content:</strong> </td><td>" . $budget . "</td></tr>";
      $message .= "</table>";
      $message .= "</body></html>";

      $this->message = $message;
    }
    public function getMessage() {
      return $this->message;
    }
  }
?>