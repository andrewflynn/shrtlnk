// Only show enabled for whitelisted sites
function make_rule(domain) {
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
    make_rule("amazon.com"),
    make_rule("theonion.com"),
    make_rule("youtube.com"),
    make_rule("stackoverflow.com"),
    make_rule("stackexchange.com"),
    make_rule("google.com"),
    make_rule("instagram.com"),
    make_rule("nytimes.com"),
    make_rule("fivethirtyeight.com"),
    make_rule("giphy.com")
];

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // Add these in bulk for performance reasons
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
