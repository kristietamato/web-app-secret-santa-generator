(function() {
  'use strict';

  // Manage the Secret Santa list
  var membersList = {
    members: [],
    addMember: function(name, email, secretSanta) {
      this.members.push({
        memberName: name,
        memberEmail: email,
        memberSecretSanta: secretSanta
      });
    },
    deleteMember: function(index) {
      if (index > -1) {
        this.members.splice(index, 1);
      }
    }
  };

  var view = {
    displayMembers: function() {
      var htmlToAdd = '';
      for (var count = 0; count < membersList.members.length; count++) {
        var member = membersList.members[count];
        htmlToAdd += '<li>' + member.memberName
          + ' - ' + member.memberEmail + ' <i class="fa fa-trash delete"></i></li>';
      }
      document.getElementById('members-list').innerHTML = htmlToAdd;

      var buttons = document.getElementsByClassName('delete');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', listener.bind(null, i));
      }
      view.displayCount();
    },
    displayCount: function() {
      document.getElementById('members-count').innerHTML = membersList.members.length;
    }
  };

  function listener(index) {
    if (confirm('Click "OK" to delete: ' + membersList.members[index].memberName)) {
      handlers.deleteMember(index);
    }
  }

  var handlers = {
    addMember: function() {
      var name = document.getElementById('input-name');
      var email = document.getElementById('input-email');
      membersList.addMember(name.value, email.value);
      name.value = '';
      email.value = '';
      view.displayMembers();
    },
    deleteMember: function(id) {
      membersList.deleteMember(id);
      view.displayMembers();
    }
  };

  function drawSecretSantas() {
    // Number of members
    var totalMembers = membersList.members.length;
    // Assign index numbers to ordered members array
    var membersArray = membersList.members;
    var membersArrayCopy = membersArray.slice();
    var membersArrayShuffled;

    membersArrayShuffled = shuffle(membersArrayCopy);

    if(totalMembers === 0) {
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
    return openModal(membersArray);
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

  document.getElementById('add-member-btn').addEventListener('click', handlers.addMember);
  document.getElementById('draw-secret-santas').addEventListener('click', drawSecretSantas);
  view.displayMembers();
})();
