/* document completey ready */
$(document).ready(function() {


var articleContainer = $(".article-container");

//articleContainer.html("No articles currently Scraped");

//Adding event listeners to any dynamically generated "save article" and "scrape new article" buttons
$(document).on("click", ".btn.save", handleArticleSave);
$(document).on("click", ".scrape-new", handleArticleScrape)
//$(document).on("click", ".clear", clearArticles);

initPage();


function initPage() {
   articleContainer.empty();
   $.get("/api/headlines?saved=false")
   .then(function(data) {
       if (data && data.length) {
           renderArticles(data)
       }
       else {
           renderEmpty();
       }
   }); 
}


function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
       articlePanels.push(createPanel(articles[i]));
    }

    articleContainer.append(articlePanels);
}


function createPanel(article) {

    var panel = 
    $(["<div class='panel panel-default'>",
       "<div class='panel-heading'>",
       "<h3>",
       article.headline,
       "<a class='btn btn-success save'>",
       "Save Article",
       "</a>",
       "</h3>",
       "</div>",
       "<div class='panel-body'>",
       article.summary,
       "</div>",
       "</div>"
    ].join(""));
    
    // Attaching the article's id to the jQuery element
    panel.data("_id", article._id);

    return panel;
}


function renderEmpty() {
    // Renders some HTML to the page explaining we don't have any articles to view
    // Using joined array of HTML string data because it's easier to read/change than a conatenated string

    var emptyAlert = 
    $(["<div class='alert alert-warning text-center'>",
       "<h4>There are no new articles.</h4>",
       "</div>",
       "<div class='panel panel-default'>",
       "<div class='panel-heading text-center'>",
       "<h3>What Would You Like To Do?</h3>",
       "</div>",
       "<div class='panel-body text-center'>",
       "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
       "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
       "</div>",
       "</div>"
    ].join(""));

    articleContainer.append(emptyAlert);
}


function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave
    })
    .then(function(data) {
        // If successfule, mongoose will send back an object containing a key of "ok" with the value of 1 (which casts to 'true')
        if (data.ok) {
            initPage();
        }
    });
} 


function handleArticleScrape() {
    $.get("/api/fetch")
      .then(function(data) {

        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
      });
}

// function clearArticles() {
//     articleContainer.empty();
// }


});