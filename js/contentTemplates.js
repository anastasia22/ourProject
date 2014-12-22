/**
 * Created by Daryl on 28.11.2014.
 */

/*templates for all sections HOME HELP MOVIES . every menu button has its own template*/
var apiKey = '7a135ff2c408f8e138e4645f83b30222';
var baseUrl = 'http://api.themoviedb.org/3';
var hyperImageUrl = 'http://image.tmdb.org/t/p/w780/';
var largeImageUrl = 'http://image.tmdb.org/t/p/w300/';
var mediumImageUrl = 'http://image.tmdb.org/t/p/w185/';
var smallImageUrl = 'http://image.tmdb.org/t/p/w92/';

// HOME BLOCK
function homeTemplate() {
    var news;


    news ='<div id="News"><div class="singleNewsBlock"><img class="newsPic" src="' + MarkHamill.picture + '">' +
    '<div class="newsInfo"><h2 class="newsHeader">' + MarkHamill.header + '</h1><div class="newsArticle">' +
    '<p>' + MarkHamill.article + '</p></div></div></div></div>';


    if($('#mainContent').find(':first-child'))$('#mainContent').find(':first-child').remove();

    $('#mainContent').append(news);

    news ='';

    news ='<div class="singleNewsBlock"><img class="newsPic" src="' + NataliePortman.picture + '">' +
    '<div class="newsInfo"><h2 class="newsHeader">' + NataliePortman.header + '</h1><div class="newsArticle">' +
    '<p>' + NataliePortman.article + '</p></div></div></div>';


    $('#News').append(news);
}

//HELP BLOCK
function helpTemplate(questions) {
    var helpTempl = _.template('<section id="Help">\
        <h1>Common questions</h1>\
        <%_.each(data, function(el,i){%>\
            <section class="help">\
                <span class="question">\
                    <span><%= el.number%>.</span>\
                    <span><%= el.question%></span>\
                </span>\
                <span class="answer"><%= data[i].answer%></span>\
            </section>\
        <%})%></section>'
    );
    //delete current block
    $('#mainContent').find(':first-child').remove();
    //set help block
    $('#mainContent').append(helpTempl({'data':questions}));
    toggleHelp();
}

function moviesTemplate(movies,listName) {
    var movieBlocks= _.template(
        '<%_.each(obj,function(movie){%>'+
        '<%if(movie.poster_path == null){return;}%>' +
        '<div id="<%=movie.id%>" class="singleMovieBlock">' +
        '<div class="imgWrap">' + 
        '<img class="miniMovieImg" src="http://image.tmdb.org/t/p/w300<%=movie.poster_path%>" name="<%=movie.title%>">' +
        '<div class="infoBlock"><p><%=movie.title%></p><p><%=movie.release_date%></p></div></div></div>' +
        '<%})%>'
    );
    if($('#loader')){
       $('#loader').remove(); 
    }

    if(listName) {
        if(listName.split(' ')[0] == 'Search')listName = listName + movies.length;
    }

    if($('#mainContent').find(':first-child').attr('id') == 'Movies') {
        $('#Movies').append(movieBlocks(movies));
        addEvents();
    } else {
        $('#mainContent').append('<section id="Movies"><h1>' + listName + '</h1>' + movieBlocks(movies) + '</section>');
        addEvents();
    }
    $('#Movies').append('<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>');

    makeDraggable();
}

function  actorsTempl(actors,listName){
    var actorsBlock='';

    for (var i=0; i < actors.length; i++) {
        actorsBlock +='<div id="' + actors[i].id + '"class="singleActorBlock">';
        if(actors[i].profile_path == null) {
            actorsBlock+='<img class="miniActorImg noPhoto" src="images/no-photo.png">';
        } else{
            actorsBlock+='<img class="miniActorImg" src="http://image.tmdb.org/t/p/w300' + actors[i].profile_path + '">';
        }
        actorsBlock+='<div class="infoBlock">';
        actorsBlock+='<p>' + actors[i].name + '</p>';
        actorsBlock+='</div></div>';

    }

    if($('#loader')){
        $('#loader').remove();
    }
    if(listName.split(' ')[0] == 'Search') {
        listName = listName + actors.length;
    }
    actorsBlock += '<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>';

    if($('#mainContent').find(':first-child').attr('id') == 'Actors') {
       /* $('#Actors').append(actorsBlock);                                           !!!!!!!!!!!!!!!!!!!!!!!         A C H T U N G !!!!!!!!!!!!!!!!!!!!!!!!!!
        addEventsToActors();*/
    } else {
        actorsBlock='<section id="Actors"><h1>' + listName + '</h1>' + actorsBlock + '</section>';
        $('#mainContent').append(actorsBlock);
        addEventsToActors();
    }
}
function  singleActorTempl(actor) {
    var content = '';

    content='<div><image class="actorPic" src="http://image.tmdb.org/t/p/w300'+actor.profile_path+'"></div>' +
        '<div class="actorInfo"><p><span class="infoTags">' + 'Name: </span>' + actor.name + '</p>' +
        '<p>' + '<span class="infoTags">' + 'Born </span>' + (actor.birthday || 'no info') + ' in ' + (actor.place_of_birth || 'no info') + '</p>' +
        '<p>' + '<span class="infoTags">' + 'Also known as </span>'+ (actor.also_known_as || 'no info') + '</p>' +
        '<p>' + '<span class="infoTags">' + 'Popularity: </span>' + (actor.popularity.toFixed(2)  || 'no info') + '</p></div>';
    content +='<div class="biography"><p>' + (actor.biography || 'no info') + '</p></div>';

    stopAnimation();
    $('#loaderImage').remove();
    $('#Actor').append(content);

}

function createBlock(){
    $('#mainContent').append('<div id="Actor"><button id="offOnBtn"></div>');
    $('#offOnBtn').on('click', deleteBlock);
}
function deleteBlock() {
    if($('#loadImage')){
       stopAnimation();
       $('#loaderImage').remove();
    }
    $('body').css('overflow','auto');
    $('#Actor').remove();
   window.history.back();
}

function singleMoviePage (movie) { 
    var singleMovieTemplate = _.template(
        '<section id = "singleMovie">\
          <h1><%= singleMovie.title %></h1>\
          <section class="row">\
            <section class ="poster singleMovieBlock" id="<%= singleMovie.id%>">\
              <img src="<%= largeImageUrl %><%= singleMovie.poster %>" name="<%= singleMovie.title %>">\
            </section>\
            <section class="column2">\
              <%if(singleMovie.tagline) {%>\
                <q class="par_block"> <%= singleMovie.tagline %> </q>\
              <% }; %>\
              <span class="sp_title block_title">Main information</span>\
              <ul class="mov-info border_class">\
                <% if (singleMovie.rating){ %>\
                  <li>\
                    <span class="sp_title">Rates: </span>\
                    <span class = "additional searching search-rate">\
                      <span><%= singleMovie.rating %></span>\
                    </span> / 10\
                  </li>\
                <% }; %>\
                <% if (singleMovie.budget){ %>\
                  <li><span class="sp_title">Budget: </span>$ <%= singleMovie.budget %></li>\
                <% }; %>\
                <% if (singleMovie.revenue){ %>\
                  <li><span class="sp_title">Revenue: </span>$ <%= singleMovie.revenue %></li>\
                <% }; %>\
                  <li>\
                    <span class="sp_title">Year: </span>\
                    <span class = "additional searching search-year">\
                        <span><%= singleMovie.year %></span>\
                    </span>\
                  </li>\
                <% if (singleMovie.runtime){ %>\
                  <li><span class="sp_title">Runtime: </span><%= singleMovie.runtime %> min</li>\
                <% }; %>\
                <% if (singleMovie.countries){ %>\
                <li><span class="sp_title">Production countries: </span>\
                  <% _.each(singleMovie.countries, function(el){ %>\
                    <span class = "additional"><span><%=el%></span></span>\
                  <% })}; %>\
                </li>\
                  <% if (singleMovie.genres){ %>\
                    <li><span class="sp_title">Genres: </span>\
                    <% _.each(singleMovie.genres, function(el){ %>\
                      <span class = "additional searching search-genre">\
                        <span data-genre = "<%=el.id%>"><%= el.name %></span>\
                      </span>\
                  <% })%>\
                    </li>\
                  <% }; %>\
                <% if (singleMovie.companies){ %>\
                  <li><span class="sp_title">Production companies: </span>\
                  <% _.each(singleMovie.companies, function(el){ %>\
                    <span class = "additional"><span><%= el %></span></span>\
                  <% }) %>\
                </li>\
                <% }; %>\
              </ul>\
            </section>\
          </section>\
          <section class="row">\
            <section class="trailer">\
              <span class="sp_title block_title">Movie trailer</span>\
              <section class="border_class">\
                <iframe wmode="Opaque" height="360" src="http://www.youtube.com/embed/<%= singleMovie.trailer %>?wmode=transparent" frameborder="0" allowfullscreen></iframe>\
              </section>\
            </section>\
            <% if (singleMovie.overview){ %>\
            <blockquote class="overview">\
              <span>Experts overview</span>\
              <%= singleMovie.overview %>\
            </blockquote>\
            <% }; %>\
          </section>\
          <section class="row">\
            <% if (singleMovie.images){ %>\
            <section class="screens">\
              <span class="sp_title block_title">Screenshots</span>\
              <section class="border_class carousel smCarousel">\
                <section class="control smControl" data-direction="previous">\
                  <section class="arrow prev-ar prev-unable"></section>\
                </section>\
                <section class="slider smSlider"><section class="img-container smImgContainer">\
                <% _.each(singleMovie.images, function(el,i){ %>\
                    <img class="screenshot smScreenshot" src="<%= largeImageUrl %><%= el %>" data-numb="<%= i %>">\
                <% }) %>\
                </section></section>\
                <section class="control smControl" data-direction="next">\
                  <section class="arrow next-ar next-able"></section>\
                </section>\
              </section>\
            </section>\
            <% }; %>\
          </section>\
          <% if (singleMovie.actors){ %>\
          <section class="row">\
            <span class="sp_title block_title">Cast</span>\
            <section class="border_class actors_container">\
              <section class="actors">\
                <% _.each(singleMovie.actors, function(el){ %>\
                  <section class="single_actor singleActorBlock" id="<%=el.id%>">\
                    <% if (el.profile_path){ %>\
                      <img src="<%= smallImageUrl %><%= el.profile_path %>">\
                    <%} else {%>\
                      <img src="images/no-photo.png">\
                    <% } %>\
                    <span class="act_name"><%= el.name %></span>\
                    <span class="act_role"><%= el.character %></span>\
                  </section>\
                <% }) %>\
              </section>\
            </section>\
          </section>\
          <% }; %>\
          <% if (singleMovie.similar){ console.log(singleMovie.similar) %>\
          <section class="row">\
            <span class="sp_title block_title">Similar movies</span>\
            <section class="border_class similar_container">\
              <% _.each(singleMovie.similar, function(el){ %>\
                <section class="similar" data-id="<%= el.id %>">\
                  <% if (el.backdrop_path){ %>\
                    <img src="<%= mediumImageUrl %><%= el.backdrop_path %>">\
                  <%} else {%>\
                    <img src="images/no-image1.jpg">\
                  <% } %>\
                    <section>\
                    <span class="similar_name sp_title"><%= el.title %></span>\
                    <span class="similar_date"><%= el.release_date %></span>\
                    <span class="similar_rate"><%= el.vote_average %></span>\
                    </section>\
                </section>\
                <% }) %>\
            </section>\
          </section>\
          <% }; %>\
          <section id="mask"></section>\
          <% if (singleMovie.images){ %>\
          <section id="modwin" class="carousel lgCarousel">\
            <section class="control lgControl lft" data-direction="previous">\
              <section class="arrow prev-ar prev-unable"></section>\
            </section>\
            <section class="lgSlider slider"><section class="img-container lgImgContainer">\
              <% _.each(singleMovie.images, function(el, i){ %>\
                <img class="screenshot lgScreenshot " src="<%= hyperImageUrl %><%= el %>" data-direction="next" data-modal="<%=i%>">\
              <% }) %>\
            </section></section>\
            <section class="control lgControl rgh" data-direction="next">\
              <section class="arrow next-ar next-able"></section>\
            </section>\
          </section>\
          <% }; %>\
        </section>'
    );

    function renderSingleMoviePage(movie) {
        var singleMovie = {
            id:movie.id,
            title : movie.title,
            poster: movie.poster_path,
            tagline : movie.tagline,
            rating : movie.vote_average,
            year : parseInt(movie.release_date),
            budget : movie.budget,
            revenue : movie.revenue,
            runtime: movie.runtime,
            companies : [],
            countries : [],            
            genres: movie.genres,
            overview : movie.overview,
            similar: movie.similar.results,
            images: [],
            trailer: movie.trailers.youtube[0] ? movie.trailers.youtube[0].source : null,
            actors: movie.credits.cast == [] ? null : movie.credits.cast
        };
        if (movie.production_countries[0]) {
            for (var country in movie.production_countries) {
                singleMovie.countries.push(movie.production_countries[country].name)
            }
        } else {singleMovie.countries = null};
        if (movie.production_companies[0]) {
            for (var company in movie.production_companies) {
                singleMovie.companies.push(movie.production_companies[company].name)
            }
        } else {singleMovie.companies = null};
        if(movie.images.backdrops[0]) {
            for (var image in movie.images.backdrops) {
                singleMovie.images.push(movie.images.backdrops[image].file_path)
            } 
        } else {singleMovie.images = null};
        if (movie.similar.results[0]) {//should fix this bug
          movie.similar.results.splice(5)
        } else {movie.similar.results = null};
        
        return singleMovie
    };


    $('#mainContent').find(':first-child').remove();
      stopAnimation();
      $('#loaderImage').remove();
    $('#mainContent').append(singleMovieTemplate({"singleMovie":renderSingleMoviePage(movie)}));
    addEventsToMovie();
    makeDraggable();
    addEventsToActors();
}
////scroll to top button
//$(function() {
//    $(document).on('scroll', function() {
//        var windowHght = $(window).height();
//        var scrollT = $('body').scrollTop();
//        if (scrollT > windowHght) {
//            createToTop();
//        } else {
//            removeToTop();
//        }
//    });
//    
//    function createToTop() {
//        $('<div>').addClass('to-top-button');
//        $('body').insertBefore('#footer');
//    }
//    
//    function removeToTop() {
//        $('div.to-top-button').remove();
//    }
//});





