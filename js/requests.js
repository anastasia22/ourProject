
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

function sendRequest(url,listName,controllerTarget) {
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var moviesSearchUrl = baseUrl + url + apikey;
    var pages;
    var page=1;

    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');

    $.ajax({
        url: moviesSearchUrl,
        dataType: "jsonp",
        success: callBackFunc
    });

    function callBackFunc (data) {
        pages = data.total_pages;
        stopAnimation();
        $('#loaderImage').remove();
        switch (controllerTarget){
            case 'movies':
                moviesTemplate(data,listName);
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
        if(controllerTarget == 'movie') {
            $('#mainContent').on('mousewheel',function(){
                onToTopBtn();
            });
        }else {
        $('#mainContent').find(':first-child').on('mousewheel',
            function(event) {
                onToTopBtn();

                if ($(window).scrollTop() == $(document).height() - $(window).height() ) {
                    if(page == pages) {
                        customAlert('This is the last page.');
                    }
                    var currentPage= '&page=' + (++page);
                    moviesSearchUrl = baseUrl + url + apikey + currentPage;

                    $.ajax({
                        url: moviesSearchUrl,
                        beforeSend: function() {
                            $('#loader').show();
                        },
                        success: function (data) {
                            $('#loader').hide();
                            switch (controllerTarget){
                                case 'movies':
                                    moviesTemplate(data,listName);
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
                    });
                }
            }
        );
        }
    }
}

function getHelp(){
    $.getJSON("json/help.json", function(data) {
        helpTemplate(data)
    })
}
function getNews(){
    $.getJSON("json/news.json", function(data) {
        homeTemplate(data)
    })
}

function getGenres() {
            $.ajax({
            url: 'http://api.themoviedb.org/3/genre/movie/list?api_key=7a135ff2c408f8e138e4645f83b30222',
            dataType: 'json',
            success: paintAdvanced
        });            
}

