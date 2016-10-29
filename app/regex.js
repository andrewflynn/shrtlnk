var regex_list = [];
// We need a separate one for PageStateMatcher filtering because it doesn't
// support fragment identifiers (params after '#')
var filter_regex_list = [];
var short_list = [];

// filter_regex arg is optional
function add(short, regex, filter_regex) {
  regex_list.push(regex);
  // If filter_regex wasn't passed, add the normal regex
  if (typeof filter_regex === 'undefined') {
    filter_regex_list.push(regex);
  } else {
    filter_regex_list.push(filter_regex);
  }
  short_list.push(short);
}

// amazon: https://amzn.com/B01A6G35IQ
add('https://amzn.com/$1',
    /^https?:\/\/(?:(?:www\.)|(?:smile\.))?amazon\.[\w\.]+\/[\w\/-]*(B\w{9}).*$/);

// http://www.theonion.com/r/53187
add('http://www.theonion.com/r/$1',
    /^https?:\/\/(?:www\.)?theonion\.com\/.*?(\d+)$/);

// YouTube with video id then time
// https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s
// NOTE: This needs to be added before the non-time based one below
//            otherwise that one will match first.
add('https://youtu.be/$1?t=$2',
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&\n]+).*?&t\=(\w+).*$/);

// Simple YouTube with no time
// https://youtu.be/1cX4t5-YpHQ
add('https://youtu.be/$1',
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&]+).*$/);

// YouTube with time then video id later
// https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ
add('https://youtu.be/$2?t=$1',
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?t\=(\w+).*?v\=([^\&]+).*$/);

// YouTube with non-time arguments before v=
// https://www.youtube.com/watch?foo=bar&v=1cX4t5-YpHQ
// NOTE: This needs to be last after normal and times
add('https://youtu.be/$1',
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v\=([^\&]+).*$/);

// StackOverflow (answer)
// http://stackoverflow.com/a/5718765
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
add('http://stackoverflow.com/a/$1',
    /^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/);

// StackOverflow (question)
// http://stackoverflow.com/q/5718624
add('http://stackoverflow.com/q/$1',
    /^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(\d+).*$/);

// StackExchange (answer)
// http://stackoverflow.com/a/164197
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
add('http://$1.com/a/$2',
    /^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/);

// StackOverflow (question)
// http://stackoverflow.com/q/164194
add('http://$1.com/q/$2',
    /^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(\d+).*$/);

// Google Web Search with type
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
add('https://www.google.com/#q=$1&tbm=$2',
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*\&tbm\=([^&]+).*$/,
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*/);

// Google Web Search with type first
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
add('https://www.google.com/#q=$2&tbm=$1',
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*tbm\=([^&]+).*\&q\=([^&]+).*$/,
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*/);

// Google Web Search query only
// https://google.com/#q=bettersettlers
add('https://www.google.com/#q=$1',
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*$/,
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*/);

// shrtlnk
// http://bit.ly/shrt_lnk
add('http://bit.ly/shrt_lnk',
    /^https?:\/\/(?:www\.)?chrome\.google\.com\/webstore\/detail\/shrtlnk\/nccahogoimgbhghcjmghidnnngigcagi.*$/);

// Instagram
// http://instagr.am/
add('http://instagr.am/$1',
    /^https?:\/\/(?:www\.)?instagram\.com\/([^\?]+).*$/);

// Reddit
// https://redd.it/
add('https://redd.it/$1',
    /^https?:\/\/(?:www\.)?reddit\.com\/r\/\w+\/comments\/(\w+)\/.*$/);

function shrtn(str) {
  for (var i = 0; i < regex_list.length; i++) {
    var regex = regex_list[i];
    var short = short_list[i];
    if (regex.test(str)) {
      return str.replace(regex, short);
    }
  }

  // Default return the full URL
  return str;
}

var custom_regex_list = [];
var custom_short_list = [];

custom_regex_list.push(/^https?:\/\/(?:www\.)?nytimes\.com.*$/);
custom_short_list.push('nytimes.js');
custom_regex_list.push(/^https?:\/\/(?:\w)*?\.?fivethirtyeight\.com.*$/);
custom_short_list.push('fivethirtyeight.js');
custom_regex_list.push(/^https?:\/\/(?:www\.)?giphy\.com.*$/);
custom_short_list.push('giphy.js');
