var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews;
    var dafuckarray = [1,2,3];
    var TVfollowers, TVurls = [], TVlikes = [], TVcomments = [], TVcollects = [], TVmakes = [], TVviews = [], TVdownloads = [];

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
        /*$('.thing-like','#profile-content').each(function(){
            var TVlike = Number($(this).text().replace(/[^0-9.]/g, ''));
            TVlikes+=TVlike;
        });*/
        $('.thing-img-wrapper','#profile-content').each(function(){
            var thisurl = $(this).attr('href').toString();
            TVurls.push(thisurl);
        });

        /*console.log(TVurls);
        console.log(TVurls.length);*/

        for(var i=0; i<TVurls.length; i++){
          var preurl = "https://www.thingiverse.com";
          var fullurl = preurl.concat(TVurls[i]);
          console.log("url " + fullurl);
        }







        /*console.log("-------------");
        console.log("Thingiverse stats");
        console.log("-------------");
        console.log("Followers: " + TVfollowers);
        console.log("# of likes: " + TVlikes);
        console.log(TVurls);
        console.log("");*/
    }
});

request('https://www.thingiverse.com/thing:1914500', function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TVlikes = $('.thing-views','#thing-description').text().replace(/[^0-9.]/g, '');
        console.log("Views1: " + TVlikes);
    }
});
