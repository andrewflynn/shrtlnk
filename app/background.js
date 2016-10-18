function make_regex(domain) {
  return {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlMatches: domain }
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        };
}

var rules = [];
regex_list.forEach(function (item, index, array) {
  rules.push(make_regex(item.source));
});
custom_regex_list.forEach(function (item, index, array) {
  rules.push(make_regex(item.source));
});

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Add these in bulk for performance reasons
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
