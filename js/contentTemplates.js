var baseUrl = 'http://api.themoviedb.org/3';
var hyperImageUrl = 'http://image.tmdb.org/t/p/w780/';
var largeImageUrl = 'http://image.tmdb.org/t/p/w300/';
var mediumImageUrl = 'http://image.tmdb.org/t/p/w185/';
var smallImageUrl = 'http://image.tmdb.org/t/p/w92/';
var newsUrl = 'http://static01.nyt.com/';

// HOME BLOCK
function newsTemplate(news) {
    var homeTmpl = _.template(
      '<%_.each(data, function(el){%>\
          <%if(el.multimedia.length){%>\
          <div class="singleNewsBlock">\
            <div class="newsPic"><img src="<%=newsUrl%><%=el.multimedia[0].url%>"></div>\
            <div class="newsInfo">\
              <h2 class="newsHeader" data-source="<%=el.web_url%>"><%=el.headline.main%></h2>\
              <div class="newsArticle">\
                <p><%=el.lead_paragraph%></p>\
                <a target="_blank" href="<%=el.web_url%>">Read more...</a>\
              </div>\
            </div>\
          </div>\
        <%}})%>'
    );
    if ($('#mainContent').find(':first-child').attr('id') == 'News') {
      $('#News').append(homeTmpl({'data':news.docs}));
    }  else {
        $('#mainContent').find(':first-child').remove();
        $('#mainContent').append( '<div id="News"><h1>The latest movie news</h1>' + 
          homeTmpl({'data':news.docs}) + '</div>');
    }

    
    $('#News').data('page', (news.meta.offset/10 + 1));
    procesing = true;
    NewsBlockEvents();
    loadContent()
}

//HELP BLOCK
function helpTemplate(questions) {
    var helpTmpl = _.template('<section id="Help">\
        <h1>Common questions</h1>\
        <%_.each(data, function(el){%>\
            <section class="help">\
                <span class="question">\
                    <span><%= el.number%>.</span>\
                    <span><%= el.question%></span>\
                </span>\
                <span class="answer"><%= el.answer%></span>\
            </section>\
        <%})%></section>'
    );
    //delete current block
    $('#mainContent').find(':first-child').remove();
    //set help block
    $('#mainContent').append(helpTmpl({'data':questions}));
    HelpBlockEvents();
}

function moviesTemplate(data,listName, type) {
    var movies = data.results;
    var movieBlocks = _.template(
      '<%_.each(obj,function(movie){%>\
        <%if (movie.poster_path == null) {return}%>\
        <div data-id="<%=movie.id%>" class="singleMovieBlock">\
          <div class="imgWrap">\
            <img class="miniMovieImg" src="<%=largeImageUrl%><%=movie.poster_path%>" name="<%=movie.title%>">\
            <div class="infoBlock">\
              <p><%=movie.title%></p>\
              <p><%=movie.release_date%></p>\
            </div>\
          </div>\
        </div>\
      <%})%>'
    );
    if($('#loader')) {
       $('#loader').remove(); 
    }
    if(listName) {
        if(listName.split(' ')[0] == 'Search')listName = listName + data.total_results;
    }
    if(movies.length == 0) {
        listName = 'Sorry. No results.';
    }
    if($('#mainContent').find(':first-child').attr('id') == 'Movies') {
        $('#Movies').append(movieBlocks(movies));
        singleMoveBlockEvents();
    } else {
        $('#mainContent').append('<section id="Movies"><h1>' + listName + '</h1>' + movieBlocks(movies) + '</section>');
        singleMoveBlockEvents();
    }
    $('#Movies').append('<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>');
    $('#Movies').data('total', data.total_pages);
    $('#Movies').data('page', data.page);
    $('#Movies').data('type', type);
    procesing = true;
    makeDraggable();
    loadContent()
}

function  actorsTempl(data,listName) {
    var actors = data.results;
    var actorBlocks= _.template(
        '<%_.each(obj,function(actor){%>\
        <div id="<%=actor.id%>" class="singleActorBlock">\
        <% if(!actor.profile_path) { %>\
        <img class="miniActorImg noPhoto" src="images/no-photo.png">\
        <%}else{%>\
        <img class="miniActorImg" src="<%=largeImageUrl%><%=actor.profile_path%>">\
        <%}%>\
        <div class="infoBlock"><p><%=actor.name%></p></div></div>\
        <%})%>'
    );

    if($('#loader')) {
        $('#loader').remove();
    }

    if(listName.split(' ')[0] == 'Search') {
        listName = listName + data.total_results;
    }
    if(actors.length == 0) {
        listName = 'Sorry. No results.';
    }

    if($('#mainContent').find(':first-child').attr('id') == 'Actors') {
        $('#Actors').append(actorBlocks(actors));
        singleActorBlockEvents();
    } else {
        $('#mainContent').append('<section id="Actors"><h1>' + listName + '</h1>' + actorBlocks(actors) + '</section>');
        singleActorBlockEvents();
    }
    $('#Actors').append('<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>');
}

function  singleActorTempl(actor) {
    var content = '';
    var movieAr=actor.movie_credits.cast;
    var actorPage=_.template('\
    <%if(obj.profile_path == null){%><div><image class="actorPic" src="images/no-photo.png"></div>\
    <%} else {%> <div><image class="actorPic" src="http://image.tmdb.org/t/p/w300<%=obj.profile_path%>"></div><%}%>\
    <div class="actorInfo"><p><span class="infoTags">Name: </span><%=obj.name%></p>\
    <p><span class="infoTags">Born </span> <%if(obj.birthday) {%> <%=obj.birthday%><%}else{%> "no info" <%}%>\
      in <%if(obj.place_of_birth) {%><%=obj.place_of_birth%><%}else{%>no info <%}%></p>\
     <p><span class="infoTags">Also known as </span><%if(obj.also_known_as) {%> <%=obj.also_known_as%> <%}else{%> no info <%}%></p> \
     <p><span class="infoTags">Popularity: </span><%if(obj.popularity) {%><%=parseFloat(obj.popularity).toFixed(2)%>  <%}else{%> no info<%}%></p></div>\
      <div class="biography"><p><%if(obj.biography) {%><%=obj.biography%> <%}else {%> no info<%}%></p></div>\
      <div id="castMovies"><p>Filmed in:</p><div class="castMoviesBlock"></div></div>\
    ');

    stopAnimation();
    $('#loaderImage').remove();
    $('#Actor').append(actorPage(actor));

    var movieBlocks= _.template(
        '<%_.each(obj,function(movie){%>'+
        '<%if(movie.poster_path == null){return;}%>' +
        '<div data-id="<%=movie.id%>" class="singleMovieBlock">' +
        '<div class="imgWrap">' +
        '<img class="miniMovieImg" src="<%=mediumImageUrl%><%=movie.poster_path%>" name="<%=movie.title%>">' +
        '<div class="infoBlock"><p><%=movie.title%></p><p><%=movie.release_date%></p></div></div></div>' +
        '<%})%>'
    );
    $('.castMoviesBlock').append(movieBlocks(movieAr));
    $(".singleMovieBlock").on('click',function() {
        deleteBlock();
        window.location='#movie/' + $(this).data('id');
    });
}

function createBlock() {
    $('#mainContent').append('<div id="Actor"><button id="offOnBtn"></div>');
    $('#Actor').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');
    $('body').css('overflow','hidden');
    $('#offOnBtn').on('click', function() {
        if($('#mainContent').find(':first-child').attr('id') == 'Actors' || $('#mainContent').find(':first-child').attr('id') == 'singleMovie') {
            if($('#loadImage')) {
                stopAnimation();
                $('#loaderImage').remove();
            }
            window.history.back();
        }
        deleteBlock();
    });
}

function deleteBlock() {
    if($('#loadImage')){
       stopAnimation();
       $('#loaderImage').remove();
    }
    $('body').css('overflow','auto');
    $('#Actor').remove();
}

function singleMovieTemplate (movie) { 
    var singleMovieTmpl = _.template(
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
          <% if (singleMovie.actors[0]){ %>\
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
          <% if (singleMovie.similar[0]){%>\
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
            images: [],
            trailer: movie.trailers.youtube[0] ? movie.trailers.youtube[0].source : null,
            actors: movie.credits.cast == [] ? null : movie.credits.cast,
            similar: movie.similar.results
        };
        if (movie.production_countries[0]) {
            for (var country in movie.production_countries) {
                singleMovie.countries.push(movie.production_countries[country].name)
            }
        } else {
          singleMovie.countries = null
        };
        if (movie.production_companies[0]) {
            for (var company in movie.production_companies) {
                singleMovie.companies.push(movie.production_companies[company].name)
            }
        } else {
          singleMovie.companies = null
        };
        if(movie.images.backdrops[0]) {
            for (var image in movie.images.backdrops) {
                singleMovie.images.push(movie.images.backdrops[image].file_path)
            } 
        } else {
          singleMovie.images = null
        };
        if (movie.similar.results.length > 5) {
            singleMovie.similar.splice(5)
        } 
        return singleMovie
    };


    $('#mainContent').find(':first-child').remove();

    stopAnimation();
    $('#loaderImage').remove();
    
    $('#mainContent').append(singleMovieTmpl({"singleMovie":renderSingleMoviePage(movie)}));
    addEventsToMovie();
    makeDraggable();
    singleActorBlockEvents();
}
