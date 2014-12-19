/**
 * Created by Daryl on 28.11.2014.
 */

/*templates for all sections HOME HELP MOVIES . every menu button has its own template*/
var apiKey = '7a135ff2c408f8e138e4645f83b30222';
var baseUrl = 'http://api.themoviedb.org/3';
var largeImageUrl = 'http://image.tmdb.org/t/p/w300/';
var mediumImageUrl = 'http://image.tmdb.org/t/p/w185/';
var smallImageUrl = 'http://image.tmdb.org/t/p/w92/';

// HOME BLOCK
function homeTemplate() {
    var some = {
        1: '<img src="news/JessicaAlba.jpg" class="newsPic">',
        2: '<img src="news/EdwardNorton.jpg" class="newsPic">',
        3: '<img src="news/AlPacino.jpg" class="newsPic">'
    };
    var shortInfo = {
        1: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>',
        2: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>',
        3: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>'
    };

    var newsBlocks= _.template('<div id="Home">' +
    '<%_.each(obj,function(value,key){ %>' +
    '<section class="newsBlocks">' +
    '<%=value%>' +
    '' +
    '</section>' +
    '<%})%>'
    );


    _.each(some,function(value,key){newsBlocks += '<section class="newsBlocks">' + value + shortInfo[key] + '</section>'});
    newsBlocks += '</div>';

    $('#mainContent').find(':first-child').remove();

   // document.getElementById('mainContent').innerHTML = newsBlocks(some);
    $('#mainContent').append(newsBlocks(some));
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
        '<% console.log(obj==arguments[0]) %>' +
        '<%_.each(obj,function(movie){%>'+
            
        '<%if(movie.poster_path == null)return;%>' +
        '<div id="<%=movie.id%>" class="singleMovieBlock">' +
        '<img class="miniMovieImg" src="http://image.tmdb.org/t/p/w300<%=movie.poster_path%>" name="<%=movie.title%>">' +
        '<div class="infoBlock"><p><%=movie.title%></p><p><%=movie.release_date%></p></div></div>' +
        '<%})%>'
    );
    if($('#loader')){
       $('#loader').remove(); 
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
        actorsBlock +='<div id="' + actors[i].id + '"class="singleActorBlock">' +
        '<img class="miniActorImg" src="http://image.tmdb.org/t/p/w300' + actors[i].profile_path + '">' +
        '<div class="infoBlock">' +
        '<p>' + actors[i].name + '</p>' +
         '</div></div>';
    }

    if($('#loader')){
        $('#loader').remove();
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
        '<p>' + '<span class="infoTags">' + 'Born </span>' + actor.birthday + ' in ' + actor.place_of_birth + '</p>' +
        '<p>' + '<span class="infoTags">' + 'Also known as </span>'+ actor.also_known_as + '</p>' +
        '<p>' + '<span class="infoTags">' + 'Popularity: </span>' + actor.popularity + '</p></div>';
    content +='<div class="biography"><p>' + actor.biography + '</p></div>';

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
              <q class="par_block"> <%= singleMovie.tagline %> </q>\
              <span class="sp_title block_title">Main information</span>\
              <ul class="mov-info border_class">\
                <li>\
                  <span class="sp_title">Rates: </span>\
                  <span class = "additional searching" onclick="searchByRates(<%= singleMovie.rating %>)">\
                    <span><%= singleMovie.rating %></span>\
                  </span> / 10\
                </li>\
                <li><span class="sp_title">Budget: </span>$ <%= singleMovie.budget %></li>\
                <li><span class="sp_title">Revenue: </span>$ <%= singleMovie.revenue %></li>\
                <li><span class="sp_title">Year: </span><span class = "additional searching" onclick="searchByYears(<%= singleMovie.year %>)"><span><%= singleMovie.year %></span></span></li>\
                <li><span class="sp_title">Runtime: </span><%= singleMovie.runtime %> min</li>\
                <li><span class="sp_title">Production countries: </span>\
                  <% _.each(singleMovie.countries, function(el){ %>\
                    <span class = "additional"><span><%=el%></span></span>\
                  <% }) %>\
                </li>\
                <li><span class="sp_title">Genres: </span>\
                  <% _.each(singleMovie.genres, function(el){ %>\
                    <span class = "additional searching">\
                      <span onclick="searchByGenres(<%=el.id%>,\'<%=el.name%>\')"><%= el.name %></span>\
                    </span>\
                  <% }) %>\
                </li>\
                <li><span class="sp_title">Production companies: </span>\
                  <% _.each(singleMovie.companies, function(el){ %>\
                    <span class = "additional"><span><%= el %></span></span>\
                  <% }) %>\
                </li>\
              </ul>\
            </section>\
          </section>\
          <section class="row">\
            <section class="trailer">\
              <span class="sp_title block_title">Movie trailer</span>\
              <section class="border_class">\
                <iframe height="360" src="http://www.youtube.com/embed/<%= singleMovie.trailer %>" frameborder="0" allowfullscreen></iframe>\
              </section>\
            </section>\
            <blockquote class="overview">\
              <span>Experts overview</span>\
              <%= singleMovie.overview %>\
            </blockquote>\
          </section>\
          <section class="row">\
            <section class="screens">\
              <span class="sp_title block_title">Screenshots</span>\
              <section class="border_class carousel">\
                <section class="control" data-direction="previous">\
                  <section class="arrow prev-ar"></section>\
                </section>\
                <section class="slider"><section class="img-container">\
                <% _.each(singleMovie.images, function(el){ %>\
                    <img class="screenshot" src="<%= largeImageUrl %><%= el %>">\
                <% }) %>\
                </section></section>\
                <section class="control" data-direction="next">\
                  <section class="arrow next-ar"></section>\
                </section>\
              </section>\
            </section>\
          </section>\
          <section class="row">\
            <span class="sp_title block_title">Cast</span>\
            <section class="border_class actors_container">\
              <section class="actors">\
                <% _.each(singleMovie.actors, function(el){ %>\
                  <section class="single_actor singleActorBlock" id="<%=el.id%>">\
                    <img src="<%= smallImageUrl %><%= el.profile_path %>">\
                    <span class="act_name"><%= el.name %></span>\
                    <span class="act_role"><%= el.character %></span>\
                  </section>\
                <% }) %>\
              </section>\
            </section>\
          </section>\
          <section class="row">\
            <span class="sp_title block_title">Similar movies</span>\
            <section class="border_class similar_container">\
              <% _.each(singleMovie.similar, function(el){ %>\
                <section class="similar" onclick="showOneMovie(<%= el.id %>)">\
                  <img src="<%= mediumImageUrl %><%= el.backdrop_path %>">\
                  <span class="similar_name sp_title"><%= el.title %></span>\
                  <span class="similar_date"><%= el.release_date %></span>\
                  <span class="similar_rate"><%= el.vote_average %></span>\
                </section>\
                <% }) %>\
            </section>\
          </section>\
        </section>'
    );

    function renderSingleMoviePage(movie) {
        var singleMovie = {
            title : movie.title,
            id:movie.id,
            poster: movie.poster_path,
            tagline : movie.tagline ? movie.tagline : null,
            rating : movie.vote_average,
            overview : movie.overview ? movie.overview : null,
            year : parseInt(movie.release_date),
            budget : movie.budget == 0 ? null : movie.budget,
            revenue : movie.revenue == 0 ? null : movie.revenue,
            runtime: movie.runtime == 0 ? null : movie.runtime,
            genres: movie.genres == [] ? null : movie.genres,
            companies : [],
            countries : [],
            similar: movie.similar.results,
            images: [],
            trailer: movie.trailers.youtube[0] ? movie.trailers.youtube[0].source: null,
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
        } else {singleMovie.images = null}
        console.log(singleMovie)
        return singleMovie
    };


    $('#mainContent').find(':first-child').remove();

    $('#mainContent').append(singleMovieTemplate({"singleMovie":renderSingleMoviePage(movie)}));
    $(document).ready(createCarousel);
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





