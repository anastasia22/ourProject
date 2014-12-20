/**
 * Created by Daryl on 17.12.2014.
 */

var MainRouter = Backbone.Router.extend({

    routes: {
        'menuMovies': 'defaultMovies',
        'menuHelp': 'Help',
        'menuHome': 'Home',
        'subMenuPop': 'MostPop',
        'subMenu2013': 'LastYear',
        'subMenuKids': 'ForKids',
        'subMenuComedy' : 'Comedy',
        'subMenuHorror' : 'Horror',
        'subMenuFantasy' : 'Fantasy',
        'movies+:query' : 'movieSearch',
        'actors+:query' : 'actorSearch',
        'movie+:query' : 'sinMoviePage',
        'actor+:query' : 'sinActorPage'

    },
    defaultMovies :  function() {
        $('#mainContent').find(':first-child').remove();
        defaultMovies();
    },
    Help : function() {
        $('#mainContent').find(':first-child').remove();
        getHelp();
    },
    Home : function() {
        $('#mainContent').find(':first-child').remove();
        homeTemplate();
    },
    MostPop : function() {
        $('#mainContent').find(':first-child').remove();
        mostPopular();
    },
    LastYear : function() {
        $('#mainContent').find(':first-child').remove();
        mostPopular2013();
    },
    ForKids : function() {
        $('#mainContent').find(':first-child').remove();
        popular4Kids();
    },
    Comedy : function() {
        $('#mainContent').find(':first-child').remove();
        mostPopularComedies();
    },
    Horror : function(){
        $('#mainContent').find(':first-child').remove();
        bestHorrors();
    },
    Fantasy : function(){
        $('#mainContent').find(':first-child').remove();
        bestFantasy();
    },
    movieSearch : function() {
        var searchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/movie?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();
        sendRequest(titleSearch,searchQuery);
    },
    actorSearch : function() {
        var searchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/person?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();
        findActors(titleSearch,searchQuery);
    },
    sinMoviePage : function() {
        var searchQuery=document.URL.split('#')[1].split('+')[1];
        showOneMovie(parseInt(searchQuery));
        $(window).scrollTop(0);
    },
    sinActorPage : function() {
        var searchQuery=document.URL.split('#')[1].split('+')[1];
        findThisActor(parseInt(searchQuery));
    }


});

var router = new MainRouter;

Backbone.history.start();






/*

function checkUrl() {
    var searchQuery;
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
         searchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/person?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();
        findActors(titleSearch,searchQuery);
    }else if(document.URL.split('#')[1].split('+')[0] == 'movies') {
         searchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/movie?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();
        sendRequest(titleSearch,searchQuery);
    }
}*/
