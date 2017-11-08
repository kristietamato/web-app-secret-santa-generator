$(document).ready(function() {
  $('#my-modal').load('modal.html');
});

function openModal (membersArray) {
  var members = [];
  members = membersArray;
  JSON.stringify(members);

  // Get the modal
  var modal = document.getElementById('my-modal');
  // Open the modal 
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  console.log(members);
}

function emailMembers () {
  alert('elail members');
}
