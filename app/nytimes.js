// <span class="story-short-url">
//   <a href="http://nyti.ms/29G9uP9">
//     http://nyti.ms/29G9uP9
//   </a>
// </span>
var shorturlspans = document.getElementsByClassName('story-short-url');
if (shorturlspans.length == 1) {
  var shorturlspan = shorturlspans[0];
  // Should always only have one single child (<a> element)
  console.assert(shorturlspan.childNodes.length == 1);

  // Evaluate the URL so it's returned in the callback
  shorturlspan.childNodes[0].innerText;
} else {
  // Attempt #2 for videos
  // <div id="sharetools-video"
  //   ...
  //   data-url="http://www.nytimes.com/video/opinion/100000004720973/bad-hombres-nasty-women-the-presidential-debate-in-song.html"
  //   data-tinyurl="http://nyti.ms/2eqOECy"
  //   ...
  // >
  document.getElementById("sharetools-video").getAttribute("data-tinyurl");
}
