var request = require('request'),
    cheerio = require('cheerio');

request('http://www.angel-lm.com', function(err, resp, body){
    if(!err && resp.statusCode == 200){
        var $ = cheerio.load(body);
        var texto = $('.wrapper #title').html();
        console.log(texto);
    }
});
