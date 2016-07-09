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
