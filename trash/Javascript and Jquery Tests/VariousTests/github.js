var request = require('request'),
    cheerio = require('cheerio'),
    GHurls=[], GHcounter=0, GHcontributors=[], GHwatchers=[], GHstars=[], GHforks=[], GHcontributorsCounter=0, GHwatchersCounter=0, GHstarsCounter=0, GHforksCounter=0;

var githubUrl="https://github.com/AngelLM?utf8=%E2%9C%93&tab=repositories&q=&type=source&language=";

/*request(githubUrl, function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        $('.col-12').each(function(){
            console.log("Stars: " + $('.muted-link', this).eq(0).text().replace(/[^0-9.]/g, ''));
            console.log("Forks: " + $('.muted-link', this).eq(1).text().replace(/[^0-9.]/g, ''));
        });
    }
});*/

first_GH()

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
                  //console.log("--------");
                  //console.log(GHfullurl);
                  //console.log("--------");
                  var GHwatch = Number($('.social-count','.repohead-details-container').eq(0).text().replace(/[^0-9.]/g, ''));
                  GHwatchers.push(GHwatch);
                  //console.log("watchers: " + GHwatch);
                  var GHstar = Number($('.social-count','.repohead-details-container').eq(1).text().replace(/[^0-9.]/g, ''));
                  GHstars.push(GHstar);
                  //console.log("stars: " + GHstar);
                  var GHfork = Number($('.social-count','.repohead-details-container').eq(2).text().replace(/[^0-9.]/g, ''));
                  GHforks.push(GHfork);
                  //console.log("forks: " + GHfork);
                  var GHcontributor = Number($('.num','.numbers-summary').eq(3).text().replace(/[^0-9.]/g, ''));
                  GHcontributors.push(GHcontributor);
                  //console.log("contributors: " + GHcontributor);
                  //console.log("");
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
