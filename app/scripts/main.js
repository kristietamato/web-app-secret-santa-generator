/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function () {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
     // [::1] is the IPv6 localhost address.
     window.location.hostname === '[::1]' ||
     // 127.0.0.1/8 is considered localhost for IPv4.
     window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
     )
  );

  if ('serviceWorker' in navigator &&
     (window.location.protocol === 'https:' || isLocalhost)) {
     navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
           // updatefound is fired if service-worker.js changes.
           registration.onupdatefound = function () {
              // updatefound is also fired the very first time the SW is installed,
              // and there's no need to prompt for a reload at that point.
              // So check here to see if the page is already controlled,
              // i.e. whether there's an existing service worker.
              if (navigator.serviceWorker.controller) {
                 // The updatefound event implies that registration.installing is set:
                 // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
                 var installingWorker = registration.installing;

                 installingWorker.onstatechange = function () {
                    switch (installingWorker.state) {
                       case 'installed':
                          // At this point, the old content will have been purged and the
                          // fresh content will have been added to the cache.
                          // It's the perfect time to display a "New content is
                          // available; please refresh." message in the page's interface.
                          break;

                       case 'redundant':
                          throw new Error('The installing ' +
                             'service worker became redundant.');

                       default:
                       // Ignore
                    }
                 };
              }
           };
        }).catch(function (e) {
           console.error('Error during service worker registration:', e);
        });
  }

  // Manage the Secret Santa list
  var membersList = {
    members: [],
    addMember: function (name, email, index, secretSantaIndex) {
      this.members.push({
          memberName: name,
          memberEmail: email,
          memberIndex: index,
          memberSecretSantaIndex: secretSantaIndex
      });
    },
    deleteMember: function (index) {
      if (index > -1) {
        this.members.splice(index, 1);
      }
    }
  };

  var handlers = {
     addMember: function () {
        var name = document.getElementById("input-name");
        var email = document.getElementById("input-email");
        membersList.addMember(name.value, email.value);
        name.value = "";
        email.value = "";
        view.displayMembers();
     },
     deleteMember: function (id) {
        membersList.deleteMember(id);
        view.displayMembers();
     }
  };

  var view = {
     displayMembers: function () {
        var htmlToAdd = '';
        var htmlCircle = '<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone"><div class="section__circle-container__circle delete"></div></div>';
        var htmlStartDiv = '<div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">';
        for (var count = 0; count < membersList.members.length; count++) {
           var member = membersList.members[count];
           htmlToAdd += htmlCircle + htmlStartDiv + '<h5>' + member.memberName + '</h5>' + member.memberEmail + '</div>';
        }
        document.getElementById('members-list').innerHTML = htmlToAdd;

        var buttons = document.getElementsByClassName('delete');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', listener.bind(null, i));
        }
        view.displayCount();
     },
     displayCount: function() {
       document.getElementById("members-count").innerHTML = membersList.members.length;
     }
  };

  function listener (index) {
    if (confirm("Click 'OK' to delete: " + membersList.members[index].memberName)) {
      handlers.deleteMember(index)
    }
  }

  function drawSecretSantas () {
    // Number of members
    var totalMembers = membersList.members.length;
    // Assign index numbers to ordered members array
    var membersArray = membersList.members;
    var membersArrayCopy = membersArray.slice();
    var membersArrayShuffled;

    for(var count = 0; count < totalMembers; count++) {
      membersArray[count].memberIndex = count;
    }

    membersArrayShuffled = shuffle(membersArrayCopy);

    // Assign 2 indexes to each member till all members are assigned
    for( var count2 = 0; count2 < totalMembers; count2++) {
      // Members can't be their own secret santa
      if(membersArray[count2].memberIndex === membersArrayShuffled[0].memberIndex) {
        if(membersArray[count2].memberIndex === (totalMembers - 1)) {
          return alert("Error: please draw again");
        } else {
          // Swap first 2 members of shuffled array
          swap(membersArrayShuffled, 0, 1);
        }
      }
      // Set member secret santa and giftee indexes
      membersArray[count2].memberSecretSantaIndex = membersArrayShuffled[0].memberIndex;
      // Pop the first item in shuffled arrays
      membersArrayShuffled.splice(0, 1);
    }
    return openModal(membersArray);
  }

  // https://git.daplie.com/Daplie/knuth-shuffle
  function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

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

  function swap (input, index0, index1) {
    var temp = input[index0];

    input[index0] = input[index1];
    input[index1] = temp;
  }

  document.getElementById('add-member-btn').addEventListener('click', handlers.addMember);
  document.getElementById('draw-secret-santas').addEventListener('click', drawSecretSantas);
  view.displayMembers();
})();

