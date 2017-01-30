var curr = new Date();
var leapyear = 0;
if (curr.getFullYear() % 4 === 0) {
  leapyear = 1;
}
var months = [31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var wednesday = curr.getDate() - curr.getDay() + 3;
var tuesday = wednesday - 1;
var wednesdaymonth = curr.getMonth();
var tuesdaymonth = wednesdaymonth;
if (wednesday > months[curr.getMonth()]) {
  wednesday -= months[curr.getMonth()];
  wednesdaymonth += 1;
  tuesdaymonth += 1;
  if (wednesday == 1) {
    tuesday = months[curr.getMonth()];
    tuesdaymonth -= 1;
  }
}
var tuesdayDate = new Date(curr);
tuesdayDate.setDate(tuesday);
tuesdayDate.setMonth(tuesdaymonth);
var wednesdayDate = new Date(curr);
wednesdayDate.setDate(wednesday);
wednesdayDate.setMonth(wednesdaymonth);
var firstday = tuesdayDate.toISOString();
var lastday = wednesdayDate.toISOString();

var api = 'AIzaSyArpdb_OtqLF7KE6IUTscWNDXR4iJoN4mw';
var id = 'utschools.ca_9o570sdn27bd1f9e2ojhai6p2g@group.calendar.google.com';
var week;
var element = document.getElementById("day");
var favicon = document.getElementById("favicon");
var calendar = new XMLHttpRequest();
calendar.onreadystatechange = function() {
    if (calendar.readyState == 4 && calendar.status == 200) {
        var items = JSON.parse(calendar.response).items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].summary.includes('B Day')) {
                week = 'B';
                break;
            } else if (items[i].summary.includes('A Day')) {
                week = 'A';
                break;
            }
        }
        if (week) {
            element.innerHTML = week;
            favicon.href = 'images/' + week + '.png';
        } else {
            element.innerHTML = 'C';
            favicon.href = 'images/C.png';
        }
        element.style.opacity = 1;
    } else if (calendar.readystate == 4) {
        element.innerHTML = 'C';
        favicon.href = 'images/C.png';
        element.style.opacity = 1;
    }
};
calendar.open("GET",
    'https://www.googleapis.com/calendar/v3/calendars/' + id +
    '/events?key=' + api +
    '&timeMin=' + firstday +
    '&timeMax=' + lastday +
    '&fields=items/summary',
    true);
calendar.send(null);
