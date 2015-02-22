
var MainRouter = Backbone.Router.extend({

    routes: {
        'news': 'News',
        'help': 'Help',
        'movies_:type': 'Movies',
        'movies/:query' : 'movieSearch',
        'actors+:query' : 'actorSearch',
        'movie/:query' : 'sinMoviePage',
        'actor/:query' : 'sinActorPage',
        'movies-with-rates/:rate' : 'searchByRate',
        'movies-with-year/:year' : 'searchByYear',
        'movies-with-genre/:id/:genre' : 'searchByGenre',
    },
    Help : getHelp,
    News : getNews,
    Movies : function() {
        $('#mainContent').find(':first-child').remove();
        var type = document.URL.split('#')[1].split('_')[1];
        defaultMovies(type,0)
    },
    movieSearch : function() {
        var query=document.URL.split('#')[1].split('/')[1];
        $('#mainContent').find(':first-child').remove();
        defaultMovies('search-movies', 0, query);
    },
    searchByRate : function() {
        var rating=document.URL.split('#')[1].split('/')[1];
        $('#mainContent').find(':first-child').remove();
        defaultMovies('movies-with-rates', 0, rating);
    },
    searchByYear : function() {
        var year=document.URL.split('#')[1].split('/')[1];
        $('#mainContent').find(':first-child').remove();
        defaultMovies('movies-with-year', 0, year);
    },
    searchByGenre: function() {
        var genre = [];
        genre[0] = document.URL.split('#')[1].split('/')[1];
        genre[1] = document.URL.split('#')[1].split('/')[2];
        $('#mainContent').find(':first-child').remove();
        defaultMovies('movies-with-genre', 0, genre);
    },
    actorSearch : function() {
        var query=document.URL.split('#')[1].split('+')[1];
        $('#mainContent').find(':first-child').remove();
        defaultMovies('actors', 0, query)
    },
    sinMoviePage : function() {
        var searchQuery=document.URL.split('#')[1].split('/')[1];
        var url = 'movie/' + parseInt(searchQuery) + '?append_to_response=similar,images,trailers,credits';
        $('#mainContent').find(':first-child').remove();
        sendRequest(url,'','movie');
    },
    sinActorPage : function() {
        $('#mainContent').find(':first-child').remove();
        var id=document.URL.split('#')[1].split('/')[1];
        var url = 'person/' + id +'?append_to_response=movie_credits,images';
        sendRequest(url,'','actor');
    }
});

var router = new MainRouter;

Backbone.history.start();





