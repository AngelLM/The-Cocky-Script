var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews,
    TVfollowers, TVdesigns, TVdesignspages, TVurls = [], TVlikes = [], TVcomments = [], TVcollects = [], TVmakes = [], TVviews = [], TVdownloads = [], TVcounter = 1, TVlikesCounter = 0, TVcommentsCounter = 0, TVcollectsCounter = 0, TVmakesCounter = 0, TVviewsCounter = 0, TVdownloadsCounter = 0,
    TWfollowers,
    HDfollowers, HDlikes;
var youtubeUrl="https://www.youtube.com/user/ALM37454/about",
    twitterUrl="https://twitter.com/_AngelLM",
    hackadayUrl="https://hackaday.io/AngelLM",
    thingiverseUrl="https://www.thingiverse.com/AngelLM/designs/";




request(youtubeUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        YTsuscriptors = $('.about-stat','#browse-items-primary').eq(0).text().replace(/[^0-9.]/g, '');
        YTviews = $('.about-stat','#browse-items-primary').eq(1).text().replace(/[^0-9.]/g, '');
        console.log("-------------");
        console.log("YouTube stats");
        console.log("-------------");
        console.log("Suscriptors: " + YTsuscriptors);
        console.log("Views: " + YTviews);
        console.log("");
    }
});

request(twitterUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TWfollowers = $('.ProfileNav-stat','.ProfileNav-item--followers').text().replace(/[^0-9.]/g, '');
        console.log("-------------");
        console.log("Twitter stats");
        console.log("-------------");
        console.log("Followers: " + TWfollowers);
        console.log("");
    }
});


request(hackadayUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        HDfollowers = $('.followers').text().replace(/[^0-9.]/g, '');
        HDlikes = $('.follows').text().replace(/[^0-9.]/g, '');
        console.log("-------------");
        console.log("Hackaday stats");
        console.log("-------------");
        console.log("Followers: " + HDfollowers);
        console.log("Likes: " + HDlikes);
        console.log("");
    }
});



first_TV();




function first_TV(){
  request(thingiverseUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TVdesigns = $('.user-count','#main').eq(2).text().replace(/[^0-9.]/g, '');
        TVdesignspages=Math.ceil(TVdesigns/12);
        TVfollowers = $('.user-count','#main').eq(0).text().replace(/[^0-9.]/g, '');
        second_TV();
      }
    });
}

function second_TV(){
          var newurl = thingiverseUrl.concat("page:" + TVcounter);
          request(newurl, function(err, resp, body){
            if(!err && resp.statusCode == 200){
                var $ = cheerio.load(body);
                $('.thing-img-wrapper','#profile-content').each(function(){
                    var thisurl = $(this).attr('href').toString();
                    TVurls.push(thisurl);
                });
                TVcounter+= 1;
              }
              if (TVcounter>TVdesignspages){
                  TVcounter=0;
                  third_TV();
              }
              else {
                  second_TV();
              }
            });

        }

function third_TV(){
          var preurl = "https://www.thingiverse.com";
          var fullurl = preurl.concat(TVurls[TVcounter]);
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
                  TVcounter+= 1;
              }
              if (TVcounter==TVurls.length){
                  TVcounter= 0;
                  forth_TV();
              }
              else {
                  third_TV();
              }
        });

  }

  function forth_TV(){
    TVlikesCounter += TVlikes[TVcounter];
    TVcommentsCounter += TVcomments[TVcounter];
    TVcollectsCounter += TVcollects[TVcounter];
    TVmakesCounter += TVmakes[TVcounter];
    TVviewsCounter += TVviews[TVcounter];
    TVdownloadsCounter += TVdownloads[TVcounter];
    TVcounter+= 1;
    if(TVcounter==TVlikes.length){
        console.log("-------------");
        console.log("Thingiverse stats");
        console.log("-------------");
        console.log("Followers: " + TVfollowers);
        console.log("Views: " + TVviewsCounter);
        console.log("Downloads: " + TVdownloadsCounter);
        console.log("Likes: " + TVlikesCounter);
        console.log("Collects: " + TVcollectsCounter);
        console.log("Makes: " + TVmakesCounter);
        console.log("");
      }
    else {
      forth_TV();
    }


  }
