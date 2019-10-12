// scrape script
//===============

// Require request and cheerio, making our scapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (callback) {

    request("http://www.washingtonpost.com", function(err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];

        $(".flex-stack").each(function(i, element) {
            var head = $(element).children(".headline").text().trim();
            var sum = $(element).children(".caption").text().trim();

            if(head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headLine: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        callback(articles);
    });
}

module.exports = scrape;