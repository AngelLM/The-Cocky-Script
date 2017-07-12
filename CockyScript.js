var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews,
    TVfollowers, TVdesigns, TVdesignspages, TVurls = [], TVlikes = [], TVcomments = [], TVcollects = [], TVmakes = [], TVviews = [], TVdownloads = [],
    TWfollowers;
var youtubeUrl="https://www.youtube.com/user/ALM37454/about",
    twitterUrl="https://twitter.com/_AngelLM",
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
        console.log("# of views: " + YTviews);
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

request(thingiverseUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        TVdesigns = $('.user-count','#main').eq(2).text().replace(/[^0-9.]/g, '');
        TVdesignspages=Math.ceil(TVdesigns/12);
        TVfollowers = $('.user-count','#main').eq(0).text().replace(/[^0-9.]/g, '');
        adquireTVurls_function();
      }
    });


function adquireTVurls_function(){

        for (var i=1; i<=TVdesignspages; i++){
          var newurl = thingiverseUrl.concat("page:"+i);
          request(newurl, function(err, resp, body){
            if(!err && resp.statusCode == 200){
                var $ = cheerio.load(body);
                $('.thing-img-wrapper','#profile-content').each(function(){
                    var thisurl = $(this).attr('href').toString();
                    TVurls.push(thisurl);
                    //console.log(TVurls.length);
                });
              }
            });
        }
        console.log(TVdesigns);
        console.log(TVurls.length);
        if (TVurls.length==TVdesigns){
          console.log("yupbro");
        }
      }

function adquireTVstats_function(){
        //console.log("segundo "+ TVurls.length); //do stuff
        for(var t=0; t<TVurls.length; t++){
          var preurl = "https://www.thingiverse.com";
          var fullurl = preurl.concat(TVurls[t]);
          console.log("#newurl: " + fullurl);
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
                  console.log("wat " + TVviews.length);
                  /*console.log("Thingiverse stats");
                  console.log("-------------");
                  console.log("Followers: " + TVfollowers);
                  console.log("# of likes: " + TVlikes);
                  console.log(TVurls);
                  console.log("");*/
              }
        });
    }
  }
