/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var rssFeed;
var ajaxReceived = false;

var main = new UI.Card({
  title: 'KrebsReader',
  body: 'Press select to browse.\n\nShake to refresh.'
});

function loadPosts() {
  main.body("Updating list...");
  
  ajaxReceived = false;
  rssFeed = null;
  
    ajax({ url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://krebsonsecurity.com/feed/&num=5', type: 'json' },
    function(data) {
      rssFeed = data;
      ajaxReceived = true;
      
      console.log('Received data.');
      Vibe.vibrate('short');
      parseFeed(data);
      main.body("Press select to browse.\n\nShake to refresh.");
    },
    function(error) {
      console.log('Error receiving reddit data.');  
      main.body("Could not download posts.\n\nShake to try refreshing again.");
      Vibe.vibrate('short');
      Vibe.vibrate('short');
    }
  );
}

main.show();
loadPosts();
 
main.on('click', 'select', function(e) {
  if (!ajaxReceived) return false;
  
  var feedList = parseFeed(rssFeed);
  
  var feedMenu = new UI.Menu({
    sections: [{
      title: "Newest Feeds",
      items: feedList
    }]
  });
  
  feedMenu.show();
  
  feedMenu.on('select', function(e) {
    var feedDetails = new UI.Card({
      title: e.item.title,
      body: e.item.body,
      scrollable: true
    });
    
    feedDetails.show();
  });
  
  feedMenu.on('accelTap', function(e) {
    feedMenu.hide();
    loadPosts();
  });
  
// End of main.on('select')
});

main.on('accelTap', function(e) {
  loadPosts();
});

function parseFeed(data) {
  var items = [];
  
  console.log("# of Entries: " + data.responseData.feed.entries.length);
  console.log("Feed title: " + data.responseData.feed.title);
  
  for (var i = 0; i < data.responseData.feed.entries.length; i++) { 
    console.log("Entry #: " + i);
    items.push({
      title: data.responseData.feed.entries[i].title,
      body: data.responseData.feed.entries[i].publishedDate
    });
  }
  
  return items;
}