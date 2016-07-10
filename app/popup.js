function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function copyToClipboard(status) {
  // Copy to clipboard
  // https://developers.google.com/web/updates/2015/04/cut-and-copy-commands
  var range = document.createRange();
  range.selectNode(status);
  window.getSelection().addRange(range);

  try {
    // Now that we've selected the anchor text, execute the copy command
    var successful = document.execCommand('copy');
    console.log('Copy email command result: ' + successful);
  } catch(err) {
    console.log('Oops, unable to copy');
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges();
}

function finish(shrtlnk) {
  // Doc element we both set as the shortened verison and use for copy
  var status = document.getElementById('status');

  // Show text that was copied
  // Has to happen before copyToClipboard() because copyToClipboard()
  // uses the 'status' doc element for copying
  status.textContent = shrtlnk;

  // Copy to clibpoard
  copyToClipboard(status);
}

function nytimes(url) {
  chrome.tabs.executeScript(null, {file: 'nytimes.js' }, function(results) {
    // We don't specify allFrames so results is always 1 length
    console.assert(results.length == 1,
        "We should never receive multiple results");
    var result = results[0];
    if (result) {
      finish(result);
    } else {
      finish(url);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Special case nytimes which doesn' have the short id in the URL, but
    // rather hidden in the content
    if (url.startsWith('http://www.nytimes.com')) {
      nytimes(url);
    } else {
      // Shorten
      finish(shrtn(url));
    }
  });
});
