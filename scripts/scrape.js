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
            //var head = $(element).find("a").children(".es182me1").text().trim();
            //var sum = $(element).find("a").find("e1n8kpyg0").text().trim();

            var head = $(element).text().trim();
            var sum = $(element).text().trim();

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
        console.log("Testing");
        console.log(articles);
        callback(articles);
    });
}

module.exports = scrape;