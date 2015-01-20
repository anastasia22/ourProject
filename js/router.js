
var MainRouter = Backbone.Router.extend({

    routes: {
        'movies_:type': 'Movies',
        'help': 'Help',
        'news': 'News',
        'movies+:query' : 'movieSearch',
        'movies-with-rates/:rate' : 'searchByRate',
        'movies-with-year/:year' : 'searchByYear',
        'movies-with-genre/:id/:genre' : 'searchByGenre',
        'actors+:query' : 'actorSearch',
        'movie/:query' : 'sinMoviePage',
        'actor/:query' : 'sinActorPage'

    },
    Help : getHelp,
    News : getNews,
    Movies : function() {
        $('#mainContent').find(':first-child').remove();
        var type = document.URL.split('#')[1].split('_')[1];
        defaultMovies(type)
    },
    movieSearch : function() {
        var searchQuery=document.URL.split('#')[1].split('+')[1];
        var titleSearch = 'search/movie?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();

        sendRequest(titleSearch,'Search for: <span class="searchResInfo">' + searchQuery + '</span>  Results found: ','movies');
    },
    searchByRate : function() {
        var rating=document.URL.split('#')[1].split('/')[1];
        var searchQuery = 'discover/movie?vote_average.lte=' + rating + '&sort_by=vote_average.desc';
        $('#mainContent').find(':first-child').remove();
        sendRequest(searchQuery, 'Movies with rating ' + rating,'movies');
    },
    searchByYear : function() {
        var year=document.URL.split('#')[1].split('/')[1];
        var searchQuery = 'discover/movie?primary_release_year=' + year + '&sort_by=popularity.desc';
        $('#mainContent').find(':first-child').remove();
        sendRequest(searchQuery, 'Movies released in ' + year,'movies');
    },
    searchByGenre: function() {
        var id = document.URL.split('#')[1].split('/')[1];
        var name = document.URL.split('#')[1].split('/')[2];
        var searchQuery = 'discover/movie?with_genres=' + id + '&sort_by=popularity.desc';
        $('#mainContent').find(':first-child').remove();
        sendRequest(searchQuery ,'Movies with ' + name + '&nbsp;genre','movies');
    },
    actorSearch : function() {
        var searchQuery=document.URL.split('#')[1].split('/')[1];
        var titleSearch = 'search/person?query=' + searchQuery;
        $('#mainContent').find(':first-child').remove();
        $('#Actor').remove();
        sendRequest(titleSearch,'Search for: <span class="searchResInfo">' + searchQuery + '</span>  Results found: ','actors');
    },
    sinMoviePage : function() {
        var searchQuery=document.URL.split('#')[1].split('/')[1];
        var url = 'movie/' + parseInt(searchQuery) + '?append_to_response=similar,images,trailers,credits';
        $('#mainContent').find(':first-child').remove();
        sendRequest(url,'','movie');
    },
    sinActorPage : function() {
        $('#Actor').remove();
        createBlock();
        var id=document.URL.split('#')[1].split('/')[1];
        sendRequest('person/' + id +'?append_to_response=movie_credits','','actor');
    }
});

var router = new MainRouter;

Backbone.history.start();





