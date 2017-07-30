/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

require = patchRequire(require);
var casper = require("casper").create();

var links = [
    "http://google.com/",
    "http://yahoo.com/",
    "http://bing.com/",
    "https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm"
];

casper.start();

casper.each(links, function(self, link) {
    this.thenOpen(link, function() {
        this.echo(this.getTitle() + " - " + link);
    });
});

casper.run();
