var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews,
    TVfollowers, TVlikes=0;

request('https://www.youtube.com/user/ALM37454/about', function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        YTsuscriptors = $('.about-stat','#browse-items-primary').eq(0).text().replace(/[^0-9.]/g, '');
        YTviews = $('.about-stat','#browse-items-primary').eq(1).text().replace(/[^0-9.]/g, '');
        console.log("-------------");
        console.log("YouTube stats");
        console.log("-------------");
        console.log("Suscriptors: " + YTsuscriptors);
        console.log("# of views: " + YTviews);
        console.log("");
    }
});


request('https://www.thingiverse.com/AngelLM/designs', function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TVfollowers = $('.user-count','#main').eq(0).text().replace(/[^0-9.]/g, '');
        $('.thing-like','#profile-content').each(function(){
            var TVlike = Number($(this).text().replace(/[^0-9.]/g, ''));
            TVlikes+=TVlike;
        });
        console.log("-------------");
        console.log("Thingiverse stats");
        console.log("-------------");
        console.log("Followers: " + TVfollowers);
        console.log("# of likes: " + TVlikes);
        console.log("");
    }
});
