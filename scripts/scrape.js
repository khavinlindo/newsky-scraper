// scrape script
//===============

// Require request and cheerio, making our scapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (callback) {

    request("http://www.nytimes.com", function(err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];

        $(".css-8atqhb").each(function(i, element) {

            var head = $(element).find("h2").text().trim();
            var sum = $(element).find("p").text().trim();
            var url = $(element).find("a").attr("href");

            if(head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headLine: headNeat,
                    summary: sumNeat,
                    link: "https://www.nytimes.com" + url
                };
                
                articles.push(dataToAdd);
            }
        });
        
        console.log(articles);
        callback(articles);
    });
}

module.exports = scrape;