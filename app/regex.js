var map = new Map();

// amazon: https://amzn.com/B01A6G35IQ
map.set(
    /^http(?:s)?:\/\/(?:www\.)?amazon\.com\/[\w\/-]*(B\w{9}).*$/,
    'https://amzn.com/$1');

// http://www.theonion.com/r/53187
map.set(
    /^http:\/\/(?:www\.)?theonion\.com\/.*?(\d+)$/,
    'http://www.theonion.com/r/$1');

function shrtn(str) {
  for (var [k, v] of map) {
    if (k.test(str)) {
      return str.replace(k, v);
    }
  }

  // Default return the full URL
  return str;
}
