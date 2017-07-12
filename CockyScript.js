var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews,
    TVfollowers, TVurls = [], TVlikes = [], TVcomments = [], TVcollects = [], TVmakes = [], TVviews = [], TVdownloads = [];

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


request('https://www.thingiverse.com/AngelLM/designs/page:1?sort=popular', function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TVfollowers = $('.user-count','#main').eq(0).text().replace(/[^0-9.]/g, '');
        $('.thing-img-wrapper','#profile-content').each(function(){
            var thisurl = $(this).attr('href').toString();
            TVurls.push(thisurl);
        });

        for(var i=0; i<TVurls.length; i++){
          var preurl = "https://www.thingiverse.com";
          var fullurl = preurl.concat(TVurls[i]);
          request(fullurl, function(err, resp, body){
              if(!err && resp.statusCode == 200){
                  var $ = cheerio.load(body);
                  var TVview = Number($('.thing-views','#thing-description').text().replace(/[^0-9.]/g, ''));
                  TVviews.push(TVview);
                  var TVdownload = Number($('.thing-downloads','#thing-description').text().replace(/[^0-9.]/g, ''));
                  TVdownloads.push(TVdownload);
                  var TVlike = Number($('.thing-like','#thing-page').eq(0).text().replace(/[^0-9.]/g, ''));
                  TVlikes.push(TVlike);
                  var TVcollect = Number($('.thing-collect','#thing-page').eq(0).text().replace(/[^0-9.]/g, ''));
                  TVcollects.push(TVcollect);
                  var TVcomment = Number($('.thing-comment','#thing-page').eq(0).text().replace(/[^0-9.]/g, ''));
                  TVcomments.push(TVcomment);
                  var TVmake = Number($('.thing-made','#thing-page').eq(1).text().replace(/[^0-9.]/g, ''));
                  TVmakes.push(TVmake);
              }
        });
    }
}
});


/*console.log("-------------");
console.log("Thingiverse stats");
console.log("-------------");
console.log("Followers: " + TVfollowers);
console.log("# of likes: " + TVlikes);
console.log(TVurls);
console.log("");*/
