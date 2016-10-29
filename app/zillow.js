// <div id="send-to-friend-lightbox_src">
//   <!-- Lots of commented out data including
//     http://u.zillow.com/p7e8H1/
//   -->
// </div>

function filterNone() {
  return NodeFilter.FILTER_ACCEPT;
}

// Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
var iter = document.createNodeIterator(document.getElementById('send-to-friend-lightbox_src'), NodeFilter.SHOW_COMMENT, filterNone, false);
var comments = [];
var curNode;
while (curNode = iter.nextNode()) {
  comments.push(curNode.nodeValue);
}

if (comments.length > 0) {
  comments[0].match(/(http:\/\/u\.zillow\.com\/\w+\/)/)[0];
}
