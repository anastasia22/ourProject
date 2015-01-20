var keys = function() {
    var _EventListingsNY = '32072a386a8d87b37c7f310ac2cc27bd:11:70730185';
    this.getEventListings = function(){
        return _EventListingsNY
    };
}
var procesing;

function defaultMovies(type, page) {
    var url;
    var listName;
    switch (type){
            case 'popular':
                url='discover/movie?sort_by=popularity.desc';
                listName='Most popular';
                break;
            case 'this-year':
                url='discover/movie?primary_release_year=2014';
                listName='This year movies';
                break;
            case 'last-year':
                url='discover/movie?primary_release_year=2013&sort_by=popularity.desc';
                listName='Last year most popular';
                break;    
            case 'for-kids':
                url='discover/movie?with_genres=16,10751&sort_by=popularity.desc';
                listName='For kids';
                break;
            case 'comedy':
                url='discover/movie?with_genres=35,36&sort_by=revenue.desc';
                listName='Most popular comedies';
                break;
            case 'horror':
                url='discover/movie?with_genres=27,80&sort_by=popularity.desc';
                listName='Best horror films';
                break;
            case 'fantasy':
                url='discover/movie?with_genres=14&sort_by=popularity.desc';
                listName='Fantasy';
                break;
        }
    sendRequest(url,listName,'movies',type, page);
}

function sendRequest(url,listName,controllerTarget,type, page) {
    procesing = false
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var pages;
    var page = page||1;
    var currentPage= '&page=' + (++page);
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
                moviesTemplate(data,listName, type);
                break;
            case 'actors':
                actorsTempl(data,listName);
                break;
            case 'movie':
                singleMovieTemplate(data);
                break;
            case 'actor':
                singleActorTempl(data);
                break;
            default:
                customAlert('Something wrong!');
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
    // $('#mainContent').append('<div id="loaderImage"></div>');
    // new imageLoader(cImageSrc, 'startAnimation()');
    var page = page||0;
    var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:%28%22Movies%22%29%20AND%20type_of_material:%28%22News%22%29&sort=newest&api-key=c3b06d2b0936ccb5547a877c765a49a5:1:70730185&page=' + page;
    $.ajax({
        url: url,
        success: callBackFunc
    });
    function callBackFunc(data){
        // if(page > data.response.meta.offset/10){
        //     customAlert('This is the last page.');
        //     return
        // };
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

