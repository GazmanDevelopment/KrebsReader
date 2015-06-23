# KrebsReader

This is a PebbleKit.JS app that looks for the last 5 blog entries from http://krebsonsecurity.com/.  It uses Google to convert the RSS feed into JSON and then show the last 5 entries with their title and published date.

Based on https://github.com/Antrikshy/AppHookup-for-Pebble

TO-DO:
 * Allow users to enter an address of their own RSS feed
 * Allow users to specify how many entries they want
 * Enter multiple RSS feeds
 * Convert from JS to C

Once converted to C, I will look into pushing pins to the timeline when a new blog is published from any of the entered RSS feeds.
