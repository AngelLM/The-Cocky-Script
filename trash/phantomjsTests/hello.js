var webPage = require('webpage');
var page = webPage.create();

/*page.customHeaders = {
  "X-Test": "foo",
  "DNT": "1"
};*/

page.open('https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm', function (status) {
  var content = page.content;
  console.log('Content: ' + content);
  phantom.exit();
})
