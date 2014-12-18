/**
 * Created by Daryl on 17.12.2014.
 */

var AppRouter = Backbone.Router.extend({
    routes: {
        "menuMovies": "defaultRoute",
        "menuHelp": "defaultRoute1",
        "menuHome": "defaultRoute2"
    }
});
// Initiate the router
var app_router = new AppRouter;

app_router.on('route:defaultRoute', function(actions) {
    $('#mainContent').find(':first-child').remove();
    defaultMovies();
});
app_router.on('route:defaultRoute1', function(actions) {
    $('#mainContent').find(':first-child').remove();
    getHelp();
});
app_router.on('route:defaultRoute2', function(actions) {
    $('#mainContent').find(':first-child').remove();
    homeTemplate();
});



// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();







function checkUrl() {
    if(!document.URL.split('#')[1]) {
        homeTemplate();
    }else if(document.URL.split('#')[1] == 'menuMovies') {
        defaultMovies();
    }else if(document.URL.split('#')[1] == 'subMenuPop') {
        mostPopular();
    }else if(document.URL.split('#')[1] == 'subMenu2013') {
        mostPopular2013();
    }else if(document.URL.split('#')[1] == 'subMenuKids') {
        popular4Kids();
    }else if(document.URL.split('#')[1] == 'subMenuComedy') {
        mostPopularComedies();
    }else if(document.URL.split('#')[1] == 'menuHelp') {
        getHelp();
    }else if(document.URL.split('#')[1] == 'menuHome') {
        homeTemplate();
    }else if(document.URL.split('#')[1].split('+')[0] == 'actors') {
        var serchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/person?query=' + serchQuery;
        $('#mainContent').find(':first-child').remove();
        findActors(titleSearch,serchQuery);
    }else if(document.URL.split('#')[1].split('+')[0] == 'movies') {
        var serchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/movie?query=' + serchQuery;
        $('#mainContent').find(':first-child').remove();
        sendRequest(titleSearch,serchQuery);
    }
}