var request = require('request'),
    cheerio = require('cheerio'),
    YTsuscriptors, YTviews,
    TVfollowers, TVdesigns, TVdesignspages, TVurls = [], TVlikes = [], TVcomments = [], TVcollects = [], TVmakes = [], TVviews = [], TVdownloads = [], TVcounter = 1, TVlikesCounter = 0, TVcommentsCounter = 0, TVcollectsCounter = 0, TVmakesCounter = 0, TVviewsCounter = 0, TVdownloadsCounter = 0,
    TWfollowers,
    HDfollowers, HDlikes,
    GHurls=[], GHcounter=0, GHcontributors=[], GHwatchers=[], GHstars=[], GHforks=[], GHcontributorsCounter=0, GHwatchersCounter=0, GHstarsCounter=0, GHforksCounter=0,
    GGmembers,
    IGfollowers;
var youtubeUrl="https://www.youtube.com/user/ALM37454/about",
    twitterUrl="https://twitter.com/_AngelLM",
    hackadayUrl="https://hackaday.io/AngelLM",
    thingiverseUrl="https://www.thingiverse.com/AngelLM/designs/",
    githubUrl="https://github.com/AngelLM?utf8=%E2%9C%93&tab=repositories&q=&type=source&language=",
    googlegroupsUrl="https://groups.google.com/forum/#!aboutgroup/thor-opensource-3d-printable-robotic-arm",
    instagramUrl="https://www.instagram.com/angel_lm_/";




request(youtubeUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        YTsuscriptors = $('.about-stat','#browse-items-primary').eq(0).text().replace(/[^0-9.]/g, '');
        YTviews = $('.about-stat','#browse-items-primary').eq(1).text().replace(/[^0-9]/g, '');
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
first_GH();

request(googlegroupsUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        var GGmembersID = getAllElementsWithText($(this)).attributes.for.value;
        //getElementById(getAllElementsWithText().attributes.for.value).textContent;
        console.log("-------------");
        console.log("Google Groups stats");
        console.log("-------------");
        console.log("Members: " + GGmembers);
        console.log("");
    }
});

/*request(instagramUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        IGfollowers = $("._bkw5z").innerHTML;
        console.log("-------------");
        console.log("Instagram stats");
        console.log("-------------");
        console.log("Followers: " + IGfollowers);
        console.log("");
    }
});*/

//Thingiverse Functions

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

//GitHub Functions

function first_GH(){
    request(githubUrl, function(err, resp, body){
        if(!err && resp.statusCode == 200){
            var $ = cheerio.load(body);
            $('.col-12').each(function(){
                var thisGHurl = $('a',this).attr('href');
                GHurls.push(thisGHurl);
            });
          second_GH();
        }
    });
}

function second_GH(){
    var GHpreurl = "https://github.com";
    var GHfullurl = GHpreurl.concat(GHurls[GHcounter]);
    request(GHfullurl, function(err, resp, body){
        if(!err && resp.statusCode == 200){
            var $ = cheerio.load(body);
            var GHwatch = Number($('.social-count','.repohead-details-container').eq(0).text().replace(/[^0-9.]/g, ''));
            GHwatchers.push(GHwatch);
            var GHstar = Number($('.social-count','.repohead-details-container').eq(1).text().replace(/[^0-9.]/g, ''));
            GHstars.push(GHstar);
            var GHfork = Number($('.social-count','.repohead-details-container').eq(2).text().replace(/[^0-9.]/g, ''));
            GHforks.push(GHfork);
            var GHcontributor = Number($('.num','.numbers-summary').eq(3).text().replace(/[^0-9.]/g, ''));
            GHcontributors.push(GHcontributor);
            GHcounter+= 1;
        }
        if (GHcounter==GHurls.length){
            GHcounter= 0;
            third_GH();
        }
        else {
            second_GH();
        }
    });

}

function third_GH(){
    GHcontributorsCounter += GHcontributors[GHcounter];
    GHwatchersCounter += GHwatchers[GHcounter];
    GHstarsCounter += GHstars[GHcounter];
    GHforksCounter += GHforks[GHcounter];
    GHcounter+= 1;
    if(GHcounter==GHcontributors.length){
        console.log("-------------");
        console.log("GitHub stats");
        console.log("-------------");
        console.log("Watchers: " + GHwatchersCounter);
        console.log("Stars: " + GHstarsCounter);
        console.log("Forks: " + GHforksCounter);
        console.log("contributors: " + GHcontributorsCounter);
        console.log("");
    }
    else {
        third_GH();
    }
}

function getAllElementsWithText(thiso)
{
  var matchingElements = [];
  var allElements = $(thiso).getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].textContent == " Miembros ")
    {
      return allElements[i];
    }
  }
}
