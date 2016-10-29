function verify_filter(name, url, should_be_found) {
  QUnit.test(name, function(assert) {
    var url_filter_found = false;
    filter_regex_list.forEach(function (item, index, array) {
      if (item.test(url)) {
        url_filter_found = true;
      }
    });
    custom_regex_list.forEach(function (item, index, array) {
      if (item.test(url)) {
        url_filter_found = true;
      }
    });
    assert.equal(url_filter_found, should_be_found);
  });
}

// Tests that the long version is appropriately shortened to the passed in
// short version.
//
// Also tests that the filter is working appropriately for the given long URL
function test_positive(name, long, short) {
  // First verify we're filtering appropriately for it
  verify_filter("[URL filter positive] " + name, long, true);

  // Next verify it shortens properly
  QUnit.test("[Shorten positive] " + name, function(assert) {
    assert.equal(shrtn(long), short);
  });
}

// Tests that the URL passed in should not be shorted, nor should it be filtered
function test_negative(name, url) {
  // First verify we're filtering appropriately for it and won't pick it up
  verify_filter("[URL filter negative] " + name, url, false);

  // Next verify it even if it did get picked up, it would just return itself
  QUnit.test("[Shorten negative] " + name, function(assert) {
    assert.equal(shrtn(url), url);
  });
}

// Custom ones that don't use URL parsing, just test the filters are working
// NYTimes
QUnit.module("NYTimes");
verify_filter("NYTimes homepage",
    "http://www.nytimes.com/",
    true);
verify_filter("NYTimes article",
    "http://www.nytimes.com/2016/10/23/business/dealbook/att-agrees-to-buy-time-warner-for-more-than-80-billion.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=first-column-region&region=top-news&WT.nav=top-news&mtrref=www.nytimes.com&gwh=5C7113CCFE7F858775E835129BF309BB&gwt=pay",
    true);
verify_filter("NYTimes simple article",
    "http://www.nytimes.com/2016/10/23/business/dealbook/att-agrees-to-buy-time-warner-for-more-than-80-billion.html",
    true);
verify_filter("NYTimes video",
    "http://www.nytimes.com/video/opinion/100000004720973/bad-hombres-nasty-women-the-presidential-debate-in-song.html?playlistId=1194811622299&region=video-grid&version=video-grid-headline&contentCollection=Opinion&contentPlacement=0&module=recent-videos&action=click&pgType=Multimedia&eventName=video-grid-click",
    true);

// Five Thirty Eight
QUnit.module("Five Thirty Eight");
verify_filter("538 homepage",
    "https://fivethirtyeight.com/",
    true);
verify_filter("538 http homepage",
    "http://fivethirtyeight.com/",
    true);
verify_filter("538 article",
    "https://fivethirtyeight.com/features/how-much-uncertainty-is-left-about-the-election/?ex_cid=navlink",
    true);
verify_filter("538 http article",
    "http://fivethirtyeight.com/features/all-the-cubs-needed-to-win-a-pennant-off-the-charts-hitting-and-pitching/",
    true);

// Giphy
QUnit.module("Giphy");
verify_filter("Giphy homepage",
    "https://giphy.com/",
    true);
verify_filter("Giphy http homepage",
    "http://giphy.com/",
    true);
verify_filter("Giphy gif",
    "https://giphy.com/gifs/snl-lady-gaga-saturday-night-live-l0MYx2asxOpwttTNu",
    true);
verify_filter("Giphy http gif",
    "http://giphy.com/gifs/snl-television-weekend-update-jebidiah-atkinson-REhKzEF6q48og",
    true);

// CNN
QUnit.module("CNN");
verify_filter("CNN Homepage",
    "http://www.cnn.com/",
    true);
verify_filter("CNN Article",
    "http://www.cnn.com/2016/10/28/politics/fbi-reviewing-new-emails-in-clinton-probe-director-tells-senate-judiciary-committee/index.html",
    true);
verify_filter("CNN Landing page",
    "http://www.cnn.com/election",
    true);

// zillow
QUnit.module("Zillow");
verify_filter("Zillow Homepage",
    "http://www.zillow.com/",
    true);
verify_filter("Zillow home",
    "http://www.zillow.com/homedetails/46-Eastman-Hill-Rd-Lebanon-NH-03766/112999279_zpid/",
    true);
verify_filter("Zillow Landing page",
    "http://www.zillow.com/homes/",
    true);
verify_filter("Zillow long url",
    "http://www.zillow.com/homes/for_sale/56352627_zpid/featured_sort/45.313529,-70.090027,41.939062,-74.418641_rect/7_zm/1_fr/",
    true);

// Reddit
QUnit.module("Reddit");
test_positive("Reddit simple 5 chars",
    "https://www.reddit.com/r/announcements/comments/eorhm/reddit_30_less_typing/",
    "https://redd.it/eorhm");
test_positive("Reddit subreddit 6 chars",
    "https://www.reddit.com/r/Fallout/comments/4cv407/if_this_mod_doesnt_become_one_of_the_top_10_best/",
    "https://redd.it/4cv407");

// Amazon
QUnit.module("Amazon");
test_positive("Amazon https",
    "https://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
test_positive("Amazon http",
    "http://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
test_positive("Amazon no www",
    "https://amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
test_positive("Amazon simple",
    "https://www.amazon.com/gp/product/B01A6G35IQ/",
    "https://amzn.com/B01A6G35IQ");
test_positive("Amazon simple no trailing slash",
    "https://www.amazon.com/gp/product/B01A6G35IQ",
    "https://amzn.com/B01A6G35IQ");
test_positive("Amazon dp then product name",
    "https://www.amazon.com/dp/B011KE4VE0/ref=nav_timeline_asin?_encoding=UTF8&psc=1",
    "https://amzn.com/B011KE4VE0");
test_positive("Amazon product name first",
    "https://www.amazon.com/Etekcity-Ultralight-Portable-Backpacking-Ignition/dp/B00B4FY8YO?ie=UTF8&*Version*=1&*entries*=0",
    "https://amzn.com/B00B4FY8YO");
test_positive("Amazon product name first 2",
    "https://www.amazon.com/Apple-iPhone-5S-16GB-Refurbished/dp/B00YD53YQU/ref=lp_12522860011_1_1?s=wireless&ie=UTF8&qid=1468079498&sr=1-1",
    "https://amzn.com/B00YD53YQU");
test_positive("Amazon non-com",
    "https://www.amazon.de/Fallen-Tree-Games-Quell-Zen/dp/B01H5K7KHI",
    "https://amzn.com/B01H5K7KHI");
test_positive("Amazon multi dot non-com",
    "https://www.amazon.co.uk/Fallen-Tree-Games-Quell-Zen/dp/B01H5K7KHI",
    "https://amzn.com/B01H5K7KHI");
test_positive("Amazon smile",
    "https://smile.amazon.com/Etekcity-Ultralight-Portable-Backpacking-Ignition/dp/B00B4FY8YO?ie=UTF8&*Version*=1&*entries*=0",
    "https://amzn.com/B00B4FY8YO");
test_negative("Amazon product name home page negative match",
    "https://amazon.com");
test_negative("Amazon product name My Account negative match",
    "https://www.amazon.com/gp/css/homepage.html/ref=nav_youraccount_ya");

// The Onion
QUnit.module("The Onion");
test_negative("The Onion home page negative match",
    "http://www.theonion.com/");
test_negative("The Onion collection negative match",
    "http://www.theonion.com/election-2016/");
test_positive("The Onion article",
    "http://www.theonion.com/article/teen-had-absolutely-no-say-becoming-part-snapchat--53187",
    "http://www.theonion.com/r/53187");
test_positive("The Onion american voices",
    "http://www.theonion.com/americanvoices/teens-continuing-elude-retailers-53185",
    "http://www.theonion.com/r/53185");
test_positive("The Onion video",
    "http://www.theonion.com/video/onion-reviews-independence-day-resurgence-53146",
    "http://www.theonion.com/r/53146");

// YouTube
QUnit.module("YouTube");
test_negative("YouTube home page negative match",
    "https://www.youtube.com/");
test_negative("YouTube History negative match",
    "https://www.youtube.com/feed/history");
test_positive("YouTube simple",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ");
test_positive("YouTube with arg",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ");
test_positive("YouTube simple time",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube multiple args",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&feature=youtu.be&t=1m9s",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube multiple args time first",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube time before video id",
    "https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube time before video id with arg",
    "https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube time before video id",
    "https://www.youtube.com/watch?t=1m9s&feature=youtu.be&v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
test_positive("YouTube long args",
    "https://www.youtube.com/watch?annotation_id=annotation_884950143&feature=iv&src_vid=LRvEsonVXWA&v=7xC0eD6hlm0",
    "https://youtu.be/7xC0eD6hlm0")
test_positive("YouTube simple long args",
    "https://www.youtube.com/watch?foo=bar&v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ")

// StackOverflow
QUnit.module("Stack Overflow");
test_positive("Stack Overflow simple question",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity",
    "http://stackoverflow.com/q/5718624");
test_positive("Stack Overflow simple answer",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5718765#5718765",
    "http://stackoverflow.com/a/5718765");
test_positive("Stack Overflow simple answer 2",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5720318#5720318",
    "http://stackoverflow.com/a/5720318");
test_positive("Stack Overflow simple answer missing anchor, ignore answer arg",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5720318",
    "http://stackoverflow.com/q/5718624");
test_negative("Stack Overflow home page negative match",
    "http://stackoverflow.com/");
test_negative("Stack Overflow tag negative match",
    "http://stackoverflow.com/questions/tagged/android");

// Generic StackExchange
QUnit.module("Stack Exchange");
test_positive("Stack Exchange simple question",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use",
    "http://boardgames.stackexchange.com/q/24136");
test_positive("Stack Exchange simple answer",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use/24138#24138",
    "http://boardgames.stackexchange.com/a/24138");
test_positive("Stack Exchange simple answer missing anchor, ignore answer arg",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use/24138",
    "http://boardgames.stackexchange.com/q/24136");
test_negative("Stack Exchange home page negative match",
    "http://boardgames.stackexchange.com/");
test_negative("Stack Exchange tag negative match",
    "http://boardgames.stackexchange.com/questions/tagged/catan");

// Google Web Search
QUnit.module("Google Web Search");
test_positive("Google Web Search home page negative match",
    "https://www.google.com/",
    "https://www.google.com/");
test_positive("Google Web Search simple",
    "https://www.google.com/search?q=bettersettlers",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search simple match",
    "https://www.google.com/#q=bettersettlers",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search simple type",
    "https://www.google.com/search?q=bettersettlers&tbm=vid",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search simple type match",
    "https://www.google.com/#q=bettersettlers&tbm=vid",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search simple type reverse",
    "https://www.google.com/search?tbm=vid&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search simple type reverse match",
    "https://www.google.com/#tbm=vid&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search misleading search terms",
    "https://www.google.com/search?q=WRONGbettersettlers&tbm=WRONGvid#q=bettersettlers&tbm=shop",
    "https://www.google.com/#q=bettersettlers&tbm=shop");
test_positive("Google Web Search misleading search terms match",
    "https://www.google.com/#q=WRONGbettersettlers&tbm=WRONGvid#q=bettersettlers&tbm=shop",
    "https://www.google.com/#q=bettersettlers&tbm=shop");
test_positive("Google Web Search misleading search terms reverse",
    "https://www.google.com/search?tbm=WRONGvid&q=WRONGbettersettlers#tbm=isch&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=isch");
test_positive("Google Web Search misleading search terms reverse",
    "https://www.google.com/#tbm=WRONGvid&q=WRONGbettersettlers#tbm=isch&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=isch");
test_positive("Google Web Search tons of crap",
    "https://www.google.com/search?q=bettersettlers&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&aqs=chrome..69i57j69i60j0l4.2295j0j7&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search tons of crap match",
    "https://www.google.com/#q=bettersettlers&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&aqs=chrome..69i57j69i60j0l4.2295j0j7&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search weird search",
    "https://www.google.com/search?q=test+weird+%24%25+stuff+%2F",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search weird search match",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search weird search tons of crap",
    "https://www.google.com/search?aqs=chrome..69i57j69i60j0l4.2295j0j7&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&q=test+weird+%24%25+stuff+%2F&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search weird search tons of crap match",
    "https://www.google.com/#aqs=chrome..69i57j69i60j0l4.2295j0j7&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&q=test+weird+%24%25+stuff+%2F&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search no page",
    "https://www.google.com/?gws_rd=ssl#q=bettersettlers",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search no page simple type",
    "https://www.google.com/?gws_rd=ssl#q=bettersettlers&tbm=vid",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search no page simple type reverse",
    "https://www.google.com/?gws_rd=ssl#tbm=vid&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search no page weird search",
    "https://www.google.com/?gws_rd=ssl#q=test+weird+%24%25+stuff+%2F",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search webhp simple",
    "https://www.google.com/webhp?q=bettersettlers",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search webhp simple type",
    "https://www.google.com/webhp?q=bettersettlers&tbm=vid",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search webhp simple type reverse",
    "https://www.google.com/webhp?tbm=vid&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=vid");
test_positive("Google Web Search webhp misleading search terms",
    "https://www.google.com/webhp?q=WRONGbettersettlers&tbm=WRONGvid#q=bettersettlers&tbm=shop",
    "https://www.google.com/#q=bettersettlers&tbm=shop");
test_positive("Google Web Search webhp misleading search terms reverse",
    "https://www.google.com/webhp?tbm=WRONGvid&q=WRONGbettersettlers#tbm=isch&q=bettersettlers",
    "https://www.google.com/#q=bettersettlers&tbm=isch");
test_positive("Google Web Search webhp tons of crap",
    "https://www.google.com/webhp?q=bettersettlers&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&aqs=chrome..69i57j69i60j0l4.2295j0j7&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=bettersettlers");
test_positive("Google Web Search webhp weird search",
    "https://www.google.com/webhp?q=test+weird+%24%25+stuff+%2F",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search webhp weird search tons of crap",
    "https://www.google.com/webhp?aqs=chrome..69i57j69i60j0l4.2295j0j7&rlz=1C5CHFA_enUS681US688&oq=bettersettlers&q=test+weird+%24%25+stuff+%2F&sourceid=chrome&ie=UTF-8",
    "https://www.google.com/#q=test+weird+%24%25+stuff+%2F");
test_positive("Google Web Search New 1",
    "https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=chihuahua%20blueberry%20muffin%20meme",
    "https://www.google.com/#q=chihuahua%20blueberry%20muffin%20meme");

// Google Web Search
QUnit.module("shrtlnk");
test_positive("shrtlnk simple",
    "https://chrome.google.com/webstore/detail/shrtlnk/nccahogoimgbhghcjmghidnnngigcagi",
    "http://bit.ly/shrt_lnk");
test_positive("shrtlnk args",
    "https://chrome.google.com/webstore/detail/shrtlnk/nccahogoimgbhghcjmghidnnngigcagi?utm_source=gmail",
    "http://bit.ly/shrt_lnk");

// Instagram
QUnit.module("Instagram")
test_positive("Instagram direct pic",
    "https://www.instagram.com/p/BF4Z-P0LN3h/",
    "http://instagr.am/p/BF4Z-P0LN3h/");
test_positive("Instagram profile",
    "https://www.instagram.com/ueliflynn/",
    "http://instagr.am/ueliflynn/");
test_positive("Instagram direct pic with args",
    "https://www.instagram.com/p/BF4Z-P0LN3h/?taken-by=ueliflynn",
    "http://instagr.am/p/BF4Z-P0LN3h/");
