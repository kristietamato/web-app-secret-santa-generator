function drawSecretSantas() {
  // Number of members
  var totalMembers = membersList.members.length;
  // Assign index numbers to ordered members array
  var membersArray = membersList.members;
  var membersArrayCopy = membersArray.slice();
  var membersArrayShuffled;

  membersArrayShuffled = shuffle(membersArrayCopy);

  if (totalMembers < 2) {
    document.getElementById('member-error').style.display = 'inline-block';
    document.getElementById('drawn').style.display = 'none';
    return;
  }

  // Assign 2 indexes to each member till all members are assigned
  for (var count = 0; count < totalMembers; count++) {
    // Members can't be their own secret santa
    if (membersArray[count].memberName === membersArrayShuffled[0].memberName) {
      // If it's the last item in the members array
      if (count === (totalMembers - 1)) {
        document.getElementById('draw-error').style.display = 'inline-block';
      } else {
        // Swap first 2 members of shuffled array
        swap(membersArrayShuffled, 0, 1);
      }
    }
    // Set member secret name
    membersArray[count].memberSecretSanta = membersArrayShuffled[0].memberName;
    // Pop the first item in shuffled arrays
    membersArrayShuffled.splice(0, 1);
  }
  document.getElementById('drawn').style.display = 'inline-block';
  return showSendEmailBtn(membersArray);
}

function showSendEmailBtn(membersArray) {
  // Show button 
  document.getElementById('email-all-members').style.display = 'inline-block';
  document.getElementById('email-all-members').onclick = function() {
    sendDataToServer(membersArray);
  }
}

function sendDataToServer(membersArray) {
  var membersJSON = JSON.stringify(membersArray);
  var groupName = document.getElementById('group-name').value;
  var budget = document.getElementById('budget').value;
  var exchangeDate = document.getElementById('exchange-date').value;
  var message = document.getElementById('email-message').value;

  $.ajax({
    type: 'POST',
    url: 'email-members.php',
    dataType: 'json',
    data: {
      membersList: membersJSON,
      groupName: groupName,
      budget: budget,
      exchangeDate: exchangeDate,
      message: message
    }
  });
}

// https://git.daplie.com/Daplie/knuth-shuffle
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function swap(input, index0, index1) {
  var temp = input[index0];

  input[index0] = input[index1];
  input[index1] = temp;
}

function listener(index) {
  if (confirm('Click "OK" to delete: ' + membersList.members[index].memberName)) {
    handlers.deleteMember(index);
  }
}

function validateName(name) {
  var alphaExp = /^[a-zA-Z]+$/;
  if (name.value.match(alphaExp)) {
    clearErrors('name-error');
    return true;
  } else {
    name.value = '';
    document.getElementById('name-error').style.display = 'inline-block';
    name.focus();
    return false;
  }
}

function validateEmail(email) {
  var alphaExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value.match(alphaExp)) {
    clearErrors('email-error');
    return true;
  } else {
    email.value = '';
    document.getElementById('email-error').style.display = 'inline-block';
    email.focus();
    return false;
  }
}

function clearErrors(idOrClass) {
  if (idOrClass == 'error') {
    var error = document.getElementsByClassName('error');
    for (var i = 0; i < error.length; i++) {
      error[i].style.display = 'none';
    }
  } else if (idOrClass != 'error') {
    document.getElementById(idOrClass).style.display == 'none';
  }
}