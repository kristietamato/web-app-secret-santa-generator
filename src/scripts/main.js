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
  },
  displayCount: function() {
    document.getElementById('members-count').innerHTML = membersList.members.length;
  }
};

var handlers = {
  addMember: function() {
    var name = document.getElementById('input-name');
    var email = document.getElementById('input-email');
    clearErrors('error');
    if(validateName(name) && validateEmail(email)) {
      membersList.addMember(name.value, email.value);
      name.value = '';
      email.value = '';
    } else if(!validateName(name) && validateEmail(email)){
      name.value = '';
    } else if(validateName(name) && !validateEmail(email)) {
      email.value = '';
    } else {
      name.value = '';
      email.value = '';
    }
    view.displayMembers();
  },
  deleteMember: function(id) {
    membersList.deleteMember(id);
    view.displayMembers();
  }
};

document.getElementById('add-member-btn').addEventListener('click', handlers.addMember);
document.getElementById('draw-secret-santas').addEventListener('click', drawSecretSantas);

view.displayMembers();