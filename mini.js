var request = require('request'),
    cheerio = require('cheerio');
var contador1 = 0;
var contador2 = 0;
var contador3 = 0;

fununo();


function fununo(){
  request("https://www.thingiverse.com/AngelLM/designs/", function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
          contador1+=1;
          if (contador1>10){
          console.log("uno");
          fundos();
        }
        else {
          fununo();
        }
        }
      });

      }

function fundos(){
                contador2+=1;
                if (contador2==100){
                console.log("dos");
                funtres();
              }
              else {
                fundos();
              }
            }


function funtres(){
                  contador3+=1;
                  if (contador3==100){
                          console.log("tres");
                          }
                          else {
                            funtres();
                          }
                        }
