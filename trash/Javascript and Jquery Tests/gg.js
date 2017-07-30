var request = require('request'),
    cheerio = require('cheerio'),
    afterLoad=require('after-load'),
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



var html=afterLoad(googlegroupsUrl);
var $=afterLoad.$(html);
console.log(html);
/*$("*").each(function(){
    console.log($(this).text);
    /*if($(this).innerHTML == " Miembros "){
      var MembersID=$(this).attributes.for.value;
      console.log("yay! " + MembersID);
    }*/
  //});*/

/*request(googlegroupsUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        console.log(body);
        $("div").each(function(){
            if($(this).textContent == " Miembros "){
              var MembersID=$(this).attributes.for.value;
              console.log("yay! " + MembersID);
            }
            console.log($(this));
          })*/


        /*var matchingElements = [];
        var tit=$("label");
        console.log(tit.length);
        for (var i = 0, n = $('label').length; i < n; i++){
          console.log(i + ": " +$('label')[i].textContent);
          if ($('label')[i].textContent == " Members "){
            var GGmembersID = $('label')[i].attributes.for.value;
           console.log("ID: " + GGmembersID);
          }
        }*/
        //getElementById(getAllElementsWithText().attributes.for.value).textContent;
        /*console.log("-------------");
        console.log("Google Groups stats");
        console.log("-------------");
        console.log("Members: " + GGmembers);
        console.log("");*/
  /*  }
});*/
