var map = new Map();

// amazon: https://amzn.com/B01A6G35IQ
map.set(
    /^http(?:s)?:\/\/(?:www\.)?amazon\.com\/[\w\/-]*(B\w{9}).*$/,
    'https://amzn.com/$1');

// http://www.theonion.com/r/53187
map.set(
    /^http:\/\/(?:www\.)?theonion\.com\/.*?(\d+)$/,
    'http://www.theonion.com/r/$1');

// YouTube with video id then time
// https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s
// IMPORTANT: This needs to be added before the non-time based one below
//            otherwise that one will match first.
map.set(
    /^https:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&\n]+).*?&t\=(\w+).*$/,
    'https://youtu.be/$1?t=$2');

// Simple YouTube with no time
// https://youtu.be/1cX4t5-YpHQ
map.set(
    /^https:\/\/(?:www\.)?youtube\.com\/watch\?v\=([^\&]+).*$/,
    'https://youtu.be/$1');

// YouTube with time then video id later
// https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ
map.set(
    /^https:\/\/(?:www\.)?youtube\.com\/watch\?t\=(\w+).*?v\=([^\&]+).*$/,
    'https://youtu.be/$2?t=$1');

// StackOverflow (answer)
// http://stackoverflow.com/a/5718765
// NOTE: Ignores the final tag which is the user (who is logged in) tag
//       that is used by SO, but we don't care about
map.set(
    /^http:\/\/(?:www\.)?stackoverflow\.com\/.*?(?:\d+)\/.*?(?:\d+)\#(\d+).*$/,
    'http://stackoverflow.com/a/$1');

// StackOverflow (question)
// http://stackoverflow.com/q/5718624
map.set(
    /^http:\/\/(?:www\.)?stackoverflow\.com\/.*?(\d+).*$/,
    'http://stackoverflow.com/q/$1');

function shrtn(str) {
  for (var [k, v] of map) {
    if (k.test(str)) {
      return str.replace(k, v);
    }
  }

  // Default return the full URL
  return str;
}
