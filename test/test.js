function t(name, long, short) {
  QUnit.test(name, function(assert) {
    assert.equal(shrtn(long), short);
  });
}

// Amazon
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
