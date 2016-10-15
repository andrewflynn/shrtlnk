var map = new Map();

// amazon: https://amzn.com/B01A6G35IQ
map.set(
    /^https?:\/\/(?:www\.)?amazon\.com\/[\w\/-]*(B\w{9}).*$/,
    'https://amzn.com/$1');

// http://www.theonion.com/r/53187
map.set(
    /^https?:\/\/(?:www\.)?theonion\.com\/.*?(\d+)$/,
    'http://www.theonion.com/r/$1');

// YouTube with video id then time
// https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s
// NOTE: This needs to be added before the non-time based one below
//            otherwise that one will match first.
map.set(
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&\n]+).*?&t\=(\w+).*$/,
    'https://youtu.be/$1?t=$2');

// Simple YouTube with no time
// https://youtu.be/1cX4t5-YpHQ
map.set(
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&]+).*$/,
    'https://youtu.be/$1');

// YouTube with time then video id later
// https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ
map.set(
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?t\=(\w+).*?v\=([^\&]+).*$/,
    'https://youtu.be/$2?t=$1');

// YouTube with non-time arguments before v=
// https://www.youtube.com/watch?foo=bar&v=1cX4t5-YpHQ
// NOTE: This needs to be last after normal and times
map.set(
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v\=([^\&]+).*$/,
    'https://youtu.be/$1');

// StackOverflow (answer)
// http://stackoverflow.com/a/5718765
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
map.set(
    /^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/,
    'http://stackoverflow.com/a/$1');

// StackOverflow (question)
// http://stackoverflow.com/q/5718624
map.set(
    /^https?:\/\/(?:www\.)?stackoverflow\.com\/.*?(\d+).*$/,
    'http://stackoverflow.com/q/$1');

// StackExchange (answer)
// http://stackoverflow.com/a/164197
// NOTE: (answer) needs to be added before (question) otherwise that one will
//       match first.
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
map.set(
    /^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/,
    'http://$1.com/a/$2');

// StackOverflow (question)
// http://stackoverflow.com/q/164194
map.set(
    /^https?:\/\/(?:www\.)?(.*?stackexchange)\.com\/.*?(\d+).*$/,
    'http://$1.com/q/$2');

// Google Web Search with type
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
map.set(
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*\&tbm\=([^&]+).*$/,
    'https://www.google.com/search?q=$1&tbm=$2');

// Google Web Search with type first
// https://google.com/search?q=bettersettlers&tbm=isch
// NOTE: Search type (eg image, news, video, etc) need to come first, otherwise
//       generic would match first
map.set(
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*tbm\=([^&]+).*\&q\=([^&]+).*$/,
    'https://www.google.com/search?q=$2&tbm=$1');

// Google Web Search query only
// https://google.com/search?q=bettersettlers
map.set(
    /^https?:\/\/(?:www\.)?google\.com\/(?:(?:search)|(?:webhp))?.*q\=([^&]+).*$/,
    'https://www.google.com/search?q=$1');

// shrtlnk
// http://bit.ly/shrt_lnk
map.set(
    /^https?:\/\/(?:www\.)?chrome\.google\.com\/webstore\/detail\/shrtlnk\/nccahogoimgbhghcjmghidnnngigcagi.*$/,
    'http://bit.ly/shrt_lnk');

// Instagram
// http://instagr.am/
map.set(
    /^https?:\/\/(?:www\.)?instagram\.com\/([^\?]+).*$/,
    'http://instagr.am/$1');

function shrtn(str) {
  for (var [k, v] of map) {
    if (k.test(str)) {
      return str.replace(k, v);
    }
  }

  // Default return the full URL
  return str;
}
