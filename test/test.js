// Amazon
QUnit.test("Amazon https", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ");
});
QUnit.test("Amazon http", function(assert) {
  assert.equal(shrtn("http://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ");
});
QUnit.test("Amazon no www", function(assert) {
  assert.equal(shrtn("https://amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ");
});
QUnit.test("Amazon simple", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ/"), "https://amzn.com/B01A6G35IQ");
});
QUnit.test("Amazon simple no trailing slash", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ"), "https://amzn.com/B01A6G35IQ");
});
QUnit.test("Amazon dp then product name", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/dp/B011KE4VE0/ref=nav_timeline_asin?_encoding=UTF8&psc=1"), "https://amzn.com/B011KE4VE0");
});
QUnit.test("Amazon product name first", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/Etekcity-Ultralight-Portable-Backpacking-Ignition/dp/B00B4FY8YO?ie=UTF8&*Version*=1&*entries*=0"), "https://amzn.com/B00B4FY8YO");
});
QUnit.test("Amazon product name first 2", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/Apple-iPhone-5S-16GB-Refurbished/dp/B00YD53YQU/ref=lp_12522860011_1_1?s=wireless&ie=UTF8&qid=1468079498&sr=1-1"), "https://amzn.com/B00YD53YQU");
});
QUnit.test("Amazon product name home page negative match", function(assert) {
  assert.equal(shrtn("https://amazon.com"), "https://amazon.com");
});
QUnit.test("Amazon product name My Account negative match", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/css/homepage.html/ref=nav_youraccount_ya"), "https://www.amazon.com/gp/css/homepage.html/ref=nav_youraccount_ya");
});

// The Onion
QUnit.test("The Onion home page negative match", function(assert) {
  assert.equal(shrtn("http://www.theonion.com/"), "http://www.theonion.com/");
});
QUnit.test("The Onion collection negative match", function(assert) {
  assert.equal(shrtn("http://www.theonion.com/election-2016/"), "http://www.theonion.com/election-2016/");
});
QUnit.test("The Onion article", function(assert) {
  assert.equal(shrtn("http://www.theonion.com/article/teen-had-absolutely-no-say-becoming-part-snapchat--53187"), "http://www.theonion.com/r/53187");
});
QUnit.test("The Onion american voices", function(assert) {
  assert.equal(shrtn("http://www.theonion.com/americanvoices/teens-continuing-elude-retailers-53185"), "http://www.theonion.com/r/53185");
});
QUnit.test("The Onion video", function(assert) {
  assert.equal(shrtn("http://www.theonion.com/video/onion-reviews-independence-day-resurgence-53146"), "http://www.theonion.com/r/53146");
});
