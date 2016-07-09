QUnit.test("Amazon https", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ", "Passed");
});
QUnit.test("Amazon http", function(assert) {
  assert.equal(shrtn("http://www.amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ", "Passed");
});
QUnit.test("Amazon no www", function(assert) {
  assert.equal(shrtn("https://amazon.com/gp/product/B01A6G35IQ/ref=oh_aui_detailpage_o01_s00?ie=UTF8&psc=1"), "https://amzn.com/B01A6G35IQ", "Passed");
});
QUnit.test("Amazon simple", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ/"), "https://amzn.com/B01A6G35IQ", "Passed");
});
QUnit.test("Amazon simple no trailing slash", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/gp/product/B01A6G35IQ"), "https://amzn.com/B01A6G35IQ", "Passed");
});
QUnit.test("Amazon dp then product name", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/dp/B011KE4VE0/ref=nav_timeline_asin?_encoding=UTF8&psc=1"), "https://amzn.com/B011KE4VE0", "Passed");
});
QUnit.test("Amazon product name first", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/Etekcity-Ultralight-Portable-Backpacking-Ignition/dp/B00B4FY8YO?ie=UTF8&*Version*=1&*entries*=0"), "https://amzn.com/B00B4FY8YO", "Passed");
});
QUnit.test("Amazon product name first 2", function(assert) {
  assert.equal(shrtn("https://www.amazon.com/Apple-iPhone-5S-16GB-Refurbished/dp/B00YD53YQU/ref=lp_12522860011_1_1?s=wireless&ie=UTF8&qid=1468079498&sr=1-1"), "https://amzn.com/B00YD53YQU", "Passed");
});
