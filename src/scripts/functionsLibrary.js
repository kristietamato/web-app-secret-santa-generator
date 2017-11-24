function drawSecretSantas() {
  // Number of members
  var totalMembers = membersList.members.length;
  // Assign index numbers to ordered members array
  var membersArray = membersList.members;
  var membersArrayCopy = membersArray.slice();
  var membersArrayShuffled;

  membersArrayShuffled = shuffle(membersArrayCopy);

  if (totalMembers === 0) {
    alert('Please add a member');
    return;
  }

  // Assign 2 indexes to each member till all members are assigned
  for (var count = 0; count < totalMembers; count++) {
    // Members can't be their own secret santa
    if (membersArray[count].memberName === membersArrayShuffled[0].memberName) {
      // If it's the last item in the members array
      if (count === (totalMembers - 1)) {
        return alert('Error: please draw again');
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
  return showSendEmail(membersArray);
}

function showSendEmail(membersArray) {
  // Show content 
  var content = document.getElementById('article-send-email');
  content.style.display = 'block';

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