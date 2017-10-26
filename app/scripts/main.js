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
     addMember: function (name, email) {
        this.members.push({
           memberName: name,
           memberEmail: email,
           memberSecretSanta: secretSanta,
           memberGiftee: giftee,
        });
     },
     deleteMember: function () {
        this.members.splice(id, 1);
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
     deleteMember: function () {
        var id = this.getAttribute('id');
        view.displayMembers();
     }
  };

  var view = {
     displayMembers: function () {
        var htmlToAdd = '';
        var htmlCircle = '<div class="section__circle-container mdl-cell mdl-cell--2-col mdl-cell--1-col-phone"><div class="section__circle-container__circle"></div></div>';
        var htmlStartDiv = '<div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">';
        for (var count = 0; count < membersList.members.length; count++) {
           var member = membersList.members[count];
           htmlToAdd += htmlCircle + htmlStartDiv + '<h5>' + member.memberName + '</h5>' + member.memberEmail + '</div>';
        }
        document.getElementById('members-list').innerHTML = htmlToAdd;
     }
  };

  document.getElementById('add-member-btn').addEventListener('click', handlers.addMember);
})();

