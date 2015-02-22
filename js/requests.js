// var keys = function() {
//     var _NYTnews = '32072a386a8d87b37c7f310ac2cc27bd:11:70730185';
//     var _TMDBmovies = '7a135ff2c408f8e138e4645f83b30222';
//     this.getNewsKey = function(){
//         return _NYTnews
//     };
//     this.getMoviesKey = function(){
//         return _NYTnews
//     };

// }
var procesing;

function defaultMovies(type, page, query) {
    var url;
    var listName;
    var controllerTarget = 'movies';
    switch (type){
            case 'popular':
                url='discover/movie?sort_by=popularity.desc';
                listName='Most popular movies';
            break;
            case 'adventure':
                url='discover/movie?with_genres=12&sort_by=popularity.desc';
                listName='Adventure';
            break;
            case 'comedy':
                url='discover/movie?with_genres=35&sort_by=popularity.desc';
                listName='Comedy';
            break;
            case 'documentary':
                url='discover/movie?with_genres=99&sort_by=popularity.desc';
                listName='Documentary';
            break;
            case 'drama':
                url='discover/movie?with_genres=18&sort_by=popularity.desc';
                listName='Drama';
            break;  
            case 'fantasy':
                url='discover/movie?with_genres=14&sort_by=popularity.desc';
                listName='Fantasy';
            break;    
            case 'for-kids':
                url='discover/movie?with_genres=16,10751&sort_by=popularity.desc';
                listName='For kids';
            break;
            case 'horror':
                url='discover/movie?with_genres=27&sort_by=popularity.desc';
                listName='Horror';
            break;
            case 'romance':
                url='discover/movie?with_genres=10749&sort_by=popularity.desc';
                listName='Romance';
            break;  
            case 'thriller':
                url='discover/movie?with_genres=53&sort_by=popularity.desc';
                listName='Thriller';
            break;    
            case 'search-movies':
                url='search/movie?query=' + query;
                listName='Search for: <span class="searchResInfo">' + query + '</span>  Results found: ';
            break;
            case 'movies-with-rates':
                url='discover/movie?vote_average.lte=' + query + '&sort_by=vote_average.desc';
                listName='Movies with rating ' + query;
            break;
            case 'movies-with-year':
                url='discover/movie?primary_release_year=' + query + '&sort_by=popularity.desc';
                listName='Movies released in ' + query;
            break;
            case 'movies-with-genre':
                url='discover/movie?with_genres=' + query[0] + '&sort_by=popularity.desc';
                listName='Movies with ' + query[1] + '&nbsp;genre';
            break;
            case 'actors':
                url='search/person?query=' + query;
                listName='Search for: <span class="searchResInfo">' + query + '</span>  Results found: ';
                controllerTarget = 'actors'
            break;
            default:
                customAlert('An error occured!');
            break;
        }
    sendRequest(url,listName,controllerTarget, page, type, query);
}

function sendRequest(url,listName,controllerTarget,page,type, query) {
    procesing = false
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var pages;
    var page = page||1;
    var currentPage= '&page=' + page;
    moviesSearchUrl = baseUrl + url + apikey + currentPage;

    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');

    $.ajax({
        url: moviesSearchUrl,
        dataType: "jsonp",
        success: callBackFunc
    });

    function callBackFunc (data) {
        stopAnimation();
        $('#loaderImage').remove();
        switch (controllerTarget){
            case 'movies':
                moviesTemplate(data, listName, type, query);
                break;
            case 'actors':
                actorsTempl(data, listName, type, query);
                break;
            case 'movie':
                movieTemplate(data);
                break;
            case 'actor':
                singleActorTemplate(data);
                break;
            default:
                customAlert('An error occured!');
                break;
        }
    }
}

function getHelp(){
    $.getJSON("json/help.json", function(data) {
        helpTemplate(data)
    })
}

function getNews(page){
    procesing = false
    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');
    var page = page||0;
    var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Movies") AND type_of_material:("News")&sort=newest&api-key=c3b06d2b0936ccb5547a877c765a49a5:1:70730185&page=' + page;
    $.ajax({
        url: url,
        success: callBackFunc
    });
    function callBackFunc(data){
        stopAnimation();
        $('#loaderImage').remove();
        $('#News').data('page', (data.response.meta.offset/10 + 1));
        newsTemplate(data.response);
    }
}

function getGenres() {
            $.ajax({
            url: 'http://api.themoviedb.org/3/genre/movie/list?api_key=7a135ff2c408f8e138e4645f83b30222',
            dataType: 'json',
            success: paintAdvanced
        });            
}

