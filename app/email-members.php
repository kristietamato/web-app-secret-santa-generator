<?php
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $subject = 'Secret Santa Generator - Tamato.org';
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= 'From: <noreply@tamato.org>' . "\r\n";
    if(!empty($_POST['groupName'])) {
      $group_name = trim_input($_POST['groupName']);
    } else {
      $group_name = 'Secret Santa Group';
    }
    if(!empty($_POST['budget'])) {
      $budget = trim_input($_POST['budget']);
    } else {
      $budget = 50;
    }
    if(!empty($_POST['exchangeDate'])) {
      $exchange_date = $_POST['exchangeDate'];
    } else {
      $exchange_date = '';
    }
    if(!empty($_POST['message'])) {
      $message = trim_input($_POST['message']);
    } else {
      $message = '';
    }
    if(!empty($_POST['membersList'])) {
      $members_list = json_decode($_POST['membersList']);

      foreach($members_list as $member) {
        $member_name = trim_input($member->memberName);
        $to = trim_input($member->memberEmail);
        //$to = 'kristietamato@gmail.com';
        $secret_santa_for = trim_input($member->memberSecretSanta);
        $body = new Body();
        $body->setBody($member_name, $secret_santa_for, $group_name, $budget, $exchange_date, $message);
        mail($to, $subject, $body->getBody(), $headers);
      }
    }
  }

  function trim_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  class Body {
    private $body;
    public function setBody($memberName, $secretSantaFor, $groupName, $budget, $exchangeDate, $message) {
      $body = '
      <html>
        <body>
          <center>
            <img src="http://secretsanta.tamato.org/images/secret-santa.jpg" />
            <h2>Hello ' . $memberName . '!</h2>
            <h3>You are the Secret Santa for... <font style="color: red;">' . strtoupper($secretSantaFor) . '</font></h3>
            <table style="border-color: #666; width: 400px;" cellpadding="15">
            <tr style="background: #eee;"><td><strong>Group name</strong> </td><td>' . $groupName . '</td></tr>
            <tr style="background: #eee;"><td><strong>Gift exchange date</strong> </td><td>' . $exchangeDate . '</td></tr>
            <tr style="background: #eee;"><td><strong>Budget</strong> </td><td>$' . $budget . '</td></tr>
            <tr style="background: #eee;"><td><strong>Message</strong> </td><td>' . $message . '</td></tr>
            </table>
            <h3>Happy gifting, ' . $memberName . '!</h3>
            <p style="padding-top: 15px;">Please do not reply to this email. Thank you.</p>
          </center>
        </body>
      </html>
      ';

      $this->body = $body;
    }
    public function getBody() {
      return $this->body;
    }
  }
?>