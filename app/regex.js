var regex_list = [];
var short_list = [];

// amazon: https://amzn.com/B01A6G35IQ
regex_list.push(/^https?:\/\/(?:www\.)?amazon\.com\/[\w\/-]*(B\w{9}).*$/);
short_list.push('https://amzn.com/$1');

// http://www.theonion.com/r/53187
regex_list.push(/^https?:\/\/(?:www\.)?theonion\.com\/.*?(\d+)$/);
short_list.push('http://www.theonion.com/r/$1');

// YouTube with video id then time
// https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s
// NOTE: This needs to be added before the non-time based one below
//            otherwise that one will match first.
regex_list.push(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&\n]+).*?&t\=(\w+).*$/);
short_list.push('https://youtu.be/$1?t=$2');

// Simple YouTube with no time
// https://youtu.be/1cX4t5-YpHQ
regex_list.push(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&]+).*$/);
short_list.push('https://youtu.be/$1');

// YouTube with time then video id later
// https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ
regex_list.push(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?t\=(\w+).*?v\=([^\&]+).*$/);
short_list.push('https://youtu.be/$2?t=$1');

// YouTube with non-time arguments before v=
// https://www.youtube.com/watch?foo=bar&v=1cX4t5-YpHQ
// NOTE: This needs to be last after normal and times
regex_list.push(/^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v\=([^\&]+).*$/);
short_list.push('https://youtu.be/$1');

// StackOverflow (answer)
// http://stackoverflow.com/a/5718765
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
regex_list.push(/^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/);
short_list.push('http://stackoverflow.com/a/$1');

// StackOverflow (question)
// http://stackoverflow.com/q/5718624
regex_list.push(/^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(\d+).*$/);
short_list.push('http://stackoverflow.com/q/$1');

// StackExchange (answer)
// http://stackoverflow.com/a/164197
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
regex_list.push(/^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/);
short_list.push('http://$1.com/a/$2');

// StackOverflow (question)
// http://stackoverflow.com/q/164194
regex_list.push(/^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(\d+).*$/);
short_list.push('http://$1.com/q/$2');

// Google Web Search with type
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
regex_list.push(/^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*\&tbm\=([^&]+).*$/);
short_list.push('https://www.google.com/search?q=$1&tbm=$2');

// Google Web Search with type first
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
regex_list.push(/^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*tbm\=([^&]+).*\&q\=([^&]+).*$/);
short_list.push('https://www.google.com/search?q=$2&tbm=$1');

// Google Web Search query only
// https://google.com/search?q=bettersettlers
regex_list.push(/^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*$/);
short_list.push('https://www.google.com/search?q=$1');

// shrtlnk
// http://bit.ly/shrt_lnk
regex_list.push(/^https?:\/\/(?:www\.)?chrome\.google\.com\/webstore\/detail\/shrtlnk\/nccahogoimgbhghcjmghidnnngigcagi.*$/);
short_list.push('http://bit.ly/shrt_lnk');

// Instagram
// http://instagr.am/
regex_list.push(/^https?:\/\/(?:www\.)?instagram\.com\/([^\?]+).*$/);
short_list.push('http://instagr.am/$1');

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

custom_regex_list.push(/^http(?:s)?:\/\/(?:www\.)?nytimes\.com.*$/);
custom_short_list.push('nytimes.js');
custom_regex_list.push(/^http(?:s)?:\/\/(?:www\.)?fivethirtyeight\.com.*$/);
custom_short_list.push('fivethirtyeight.js');
custom_regex_list.push(/^http(?:s)?:\/\/(?:www\.)?giphy\.com.*$/);
custom_short_list.push('giphy.js');
