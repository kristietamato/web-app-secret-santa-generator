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
  return showSendEmailBtn();
}

function showSendEmailBtn() {
  // Show button 
  document.getElementById('email-all-members').style.display = 'inline-block';
}

function sendDataToServer() {
  var membersJSON = JSON.stringify(membersList.members);
  var groupName = document.getElementById('group-name').value;
  var budget = document.getElementById('budget').value;
  var exchangeDate = document.getElementById('exchange-date').value;
  var message = document.getElementById('email-message').value;

  if (!validateGroupName(groupName) || !validateBudget(budget) || !valiDate(exchangeDate)) {
    if (!validateGroupName(groupName)) {
      grouName = '';
    } 
    if (!validateBudget(budget)) {
      budget = '';
    } 
    if (!valiDate(exchangeDate)) {
      exchangeDate = '';
    }
    return false;
  } else {
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
    return true;
  }
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

function validateGroupName(group) {
  var alphaExp = /^[a-z0-9]+$/i;
  if(group == '') {
    document.getElementById('group-error').style.display = 'inline-block';
    return false;
  }
  if (group.value.match(alphaExp)) {
    clearErrors('group-error');
    return true;
  } else {
    group.value = '';
    document.getElementById('group-error').style.display = 'inline-block';
    group.focus();
    return false;
  }
}

function validateBudget(budget) {
  var alphaExp = /^(\s*|\d+)$/;
  if (budget.value.match(alphaExp) || budget == '') {
    clearErrors('budget-error');
    return true;
  } else {
    budget.value = '';
    document.getElementById('budget-error').style.display = 'inline-block';
    budget.focus();
    return false;
  }
}

function valiDate(date) {
  var today = new Date('2011-04-11T10:20:30Z');
  var inputDate = new Date(date).toUTCString();
  var alphaExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  if (date.value.match(alphaExp) || date == '' || inputDate < today) {
    clearErrors('date-error');
    return true;
  } else {
    date.value = '';
    document.getElementById('date-error').style.display = 'inline-block';
    date.focus();
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