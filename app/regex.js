function shrtn(str) {
  // amazon: https://amzn.com/B01A6G35IQ
  var amzn = /^http(?:s)?:\/\/(?:www\.)?amazon\.com\/gp\/product\/(\w+)\/?.*$/;
  if (amzn.test(str)) {
    return str.replace(amzn, 'https://amzn.com/$1');
  }

  // Default return the full URL
  return str;
}
