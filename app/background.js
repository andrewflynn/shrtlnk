function make_equals(domain) {
  return {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostEquals: domain }
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        };
}

function make_suffix(domain) {
  return {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: domain }
            })
          ],
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        };
}

var shrtlnk_rule = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlEquals: "https://chrome.google.com/webstore/detail/shrtlnk/nccahogoimgbhghcjmghidnnngigcagi" }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      };

var rules = [
    shrtlnk_rule,

    make_equals("www.amazon.com"),
    make_equals("www.theonion.com"),
    make_equals("www.youtube.com"),
    make_equals("stackoverflow.com"),
    make_equals("www.google.com"),
    make_equals("www.instagram.com"),
    make_equals("www.nytimes.com"),
    make_equals("fivethirtyeight.com"),
    make_equals("giphy.com"),

    make_suffix("stackexchange.com")
];

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Add these in bulk for performance reasons
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
