function t(name, long, short) {
  QUnit.test(name, function(assert) {
    assert.equal(shrtn(long), short);
  });
}

// Amazon
QUnit.module("Amazon");
t("Amazon https",
    "https://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
t("Amazon http",
    "http://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
t("Amazon no www",
    "https://amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1",
    "https://amzn.com/B01A6G35IQ");
t("Amazon simple",
    "https://www.amazon.com/gp/product/B01A6G35IQ/",
    "https://amzn.com/B01A6G35IQ");
t("Amazon simple no trailing slash",
    "https://www.amazon.com/gp/product/B01A6G35IQ",
    "https://amzn.com/B01A6G35IQ");
t("Amazon dp then product name",
    "https://www.amazon.com/dp/B011KE4VE0/ref=nav_timeline_asin?_encoding=UTF8&psc=1",
    "https://amzn.com/B011KE4VE0");
t("Amazon product name first",
    "https://www.amazon.com/Etekcity-Ultralight-Portable-Backpacking-Ignition/dp/B00B4FY8YO?ie=UTF8&*Version*=1&*entries*=0",
    "https://amzn.com/B00B4FY8YO");
t("Amazon product name first 2",
    "https://www.amazon.com/Apple-iPhone-5S-16GB-Refurbished/dp/B00YD53YQU/ref=lp_12522860011_1_1?s=wireless&ie=UTF8&qid=1468079498&sr=1-1",
    "https://amzn.com/B00YD53YQU");
t("Amazon product name home page negative match",
    "https://amazon.com",
    "https://amazon.com");
t("Amazon product name My Account negative match",
    "https://www.amazon.com/gp/css/homepage.html/ref=nav_youraccount_ya",
    "https://www.amazon.com/gp/css/homepage.html/ref=nav_youraccount_ya");

// The Onion
QUnit.module("The Onion");
t("The Onion home page negative match",
    "http://www.theonion.com/",
    "http://www.theonion.com/");
t("The Onion collection negative match",
    "http://www.theonion.com/election-2016/",
    "http://www.theonion.com/election-2016/");
t("The Onion article",
    "http://www.theonion.com/article/teen-had-absolutely-no-say-becoming-part-snapchat--53187",
    "http://www.theonion.com/r/53187");
t("The Onion american voices",
    "http://www.theonion.com/americanvoices/teens-continuing-elude-retailers-53185",
    "http://www.theonion.com/r/53185");
t("The Onion video",
    "http://www.theonion.com/video/onion-reviews-independence-day-resurgence-53146",
    "http://www.theonion.com/r/53146");

// YouTube
QUnit.module("YouTube");
t("YouTube home page negative match",
    "https://www.youtube.com/",
    "https://www.youtube.com/");
t("YouTube History negative match",
    "https://www.youtube.com/feed/history",
    "https://www.youtube.com/feed/history");
t("YouTube simple",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ");
t("YouTube with arg",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ");
t("YouTube simple time",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
t("YouTube multiple args",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&feature=youtu.be&t=1m9s",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
t("YouTube multiple args time first",
    "https://www.youtube.com/watch?v=1cX4t5-YpHQ&t=1m9s&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
t("YouTube time before video id",
    "https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
t("YouTube time before video id with arg",
    "https://www.youtube.com/watch?t=1m9s&v=1cX4t5-YpHQ&feature=youtu.be",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");
t("YouTube time before video id",
    "https://www.youtube.com/watch?t=1m9s&feature=youtu.be&v=1cX4t5-YpHQ",
    "https://youtu.be/1cX4t5-YpHQ?t=1m9s");

// StackOverflow
QUnit.module("Stack Overflow");
t("Stack Overflow simple question",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity",
    "http://stackoverflow.com/q/5718624");
t("Stack Overflow simple answer",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5718765#5718765",
    "http://stackoverflow.com/a/5718765");
t("Stack Overflow simple answer 2",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5720318#5720318",
    "http://stackoverflow.com/a/5720318");
t("Stack Overflow simple answer missing anchor, ignore answer arg",
    "http://stackoverflow.com/questions/5718624/ontouchevent-never-called-mapactivity/5720318",
    "http://stackoverflow.com/q/5718624");
t("Stack Overflow home page negative match",
    "http://stackoverflow.com/",
    "http://stackoverflow.com/");
t("Stack Overflow tag negative match",
    "http://stackoverflow.com/questions/tagged/android",
    "http://stackoverflow.com/questions/tagged/android");

// Generic StackExchange
QUnit.module("Stack Exchange");
t("Stack Exchange simple question",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use",
    "http://boardgames.stackexchange.com/q/24136");
t("Stack Exchange simple answer",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use/24138#24138",
    "http://boardgames.stackexchange.com/a/24138");
t("Stack Exchange simple answer missing anchor, ignore answer arg",
    "http://boardgames.stackexchange.com/questions/24136/what-algorithm-does-better-settlers-use/24138",
    "http://boardgames.stackexchange.com/q/24136");
t("Stack Exchange home page negative match",
    "http://boardgames.stackexchange.com/",
    "http://boardgames.stackexchange.com/");
t("Stack Exchange tag negative match",
    "http://boardgames.stackexchange.com/questions/tagged/catan",
    "http://boardgames.stackexchange.com/questions/tagged/catan");
