
function popular4Kids() {
   	var forKids ='discover/movie?with_genres=16,10751&sort_by=popularity.desc';
    sendRequest(forKids,'For kids','movies');
}

function mostPopular() {
    var mostPopUrl ='discover/movie?sort_by=popularity.desc';
    sendRequest(mostPopUrl,'Most popular','movies');
}

function mostPopular2013() {
    var lastYear = 'discover/movie?primary_release_year=2013&sort_by=popularity.desc';
    sendRequest(lastYear,'Last year most popular','movies');
}

function bestHorrors() {
    var horrors = 'discover/movie?with_genres=27,80&sort_by=popularity.desc';
    sendRequest(horrors,'Best horror films','movies');
}

function bestFantasy() {
    var fantasy = 'discover/movie?with_genres=14&sort_by=popularity.desc';
    sendRequest(fantasy,'Fantasy','movies');
}

function mostPopularComedies() {
    var mostPopComedies = 'discover/movie?with_genres=35,36&sort_by=revenue.desc';
    sendRequest(mostPopComedies,'Most popular comedies','movies');
}

function defaultMovies() {
    var defaultMovies='discover/movie?primary_release_year=2014';
   sendRequest(defaultMovies,'This year movies','movies');
}

function searchByTitle(){
    window.location='#movies+' + $('#searchField').val();
    var titleSearch = 'search/movie?query=' + $('#searchField').val();
    sendRequest(titleSearch,'Search for: <span class="searchResInfo">' + $('#searchField').val() + '</span>  Results found: ','movies');
}

function searchByActor() {
    window.location='#actors+' + $('#searchField').val();
    var titleSearch = 'search/person?query=' + $('#searchField').val();
    $('#mainContent').find(':first-child').remove();
    sendRequest(titleSearch,'Search for: <span class="searchResInfo">' + $('#searchField').val() +'</span>  Results found: ','actors');
}


function sendRequest(url,listName,controllerTarget) {
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var moviesSearchUrl = baseUrl + url + apikey;
    var page=1;

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
        requestController(data,listName,controllerTarget);

        $('#mainContent').find(':first-child').on('mousewheel',
            function() {
                onToTopBtn();

                if ($(window).scrollTop() == $(document).height() - $(window).height() ) {
                    var currentPage= '&page=' + (++page);
                    moviesSearchUrl = baseUrl + url + apikey + currentPage;

                    $.ajax({
                        url: moviesSearchUrl,
                        beforeSend: function() {
                            $('#loader').show();
                        },
                        success: function (data) {
                            $('#loader').hide();
                            requestController(data,listName,controllerTarget);
                        }
                    });
                }
            }
        );
    }
}

function requestController(data,listName,target) {
    switch (target){
        case 'movies':
            moviesTemplate(data.results,listName);
            break;
        case 'actors':
            actorsTempl(data.results,listName);
            break;
        default:
            customAlert('Something wrong!');
    }
}

/*function findActors(url,listName) {
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var actorsSearchUrl = baseUrl + url + apikey;

*//*    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');*//*

    $.ajax({
        url: actorsSearchUrl,
        dataType: "jsonp",
        success: callBackFunc
    });

    function callBackFunc(data) {
        stopAnimation();
        $('#loaderImage').remove();

    }
}*/

function findThisActor(id) {
    var apikey = "?api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var actorsSearchUrl = baseUrl + 'person/'+ id + apikey;

    $.ajax({
        url: actorsSearchUrl,
        dataType: "jsonp",
        success: callBackFunc
    });

    function callBackFunc (data) {
        singleActorTempl(data);
    }
}

function showOneMovie(id) {
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/movie/";
    var additional = '?append_to_response=similar,images,trailers,credits';
    var movieUrl = baseUrl + id + additional + apikey;
    $(window).scrollTop(0);
    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');

    $.ajax({
        url: movieUrl,
        dataType: "jsonp",
        success: callBackFunc
    });
    function callBackFunc (data) {
        singleMoviePage(data);
    }
}

function getHelp(){
    $.getJSON("news/help.json", function(data) {
        helpTemplate(data)
    })
}

