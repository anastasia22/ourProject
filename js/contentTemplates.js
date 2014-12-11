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

    /*var newsBlocks= _.template('<div id="Home">' +
    '<%_.each(obj,function(value,key){ %>' +
    '<section class="newsBlocks">' +
    '<%=value%>' +
    '' +
    '</section>' +
    '<%})%>'
    );*/

/*
    _.each(some,function(value,key){newsBlocks += '<section class="newsBlocks">' + value + shortInfo[key] + '</section>'});
    newsBlocks += '</div>';*/

    $('#mainContent').find(':first-child').remove();

   // document.getElementById('mainContent').innerHTML = newsBlocks(some);
    $('#mainContent').append(newsBlocks(some));
}

//HELP BLOCK
function helpTemplate() {

    var h1 = document.createElement('h1');
    h1.innerHTML='!!! Help PAGE!!';
    var section=document.createElement('section');
    section.id='Help';
    section.appendChild(h1);
    //delete current block
    $('#mainContent').find(':first-child').remove();
    //set help block
    $('#mainContent').append(section);
}

function moviesTemplate(movies,listName) {
    var movieBlocks= _.template(
        '<% console.log(obj==arguments[0]) %>' +
        '<%_.each(obj,function(movieBlaBla){%>'+
            
        '<%if(movieBlaBla.poster_path == null)return;%>' +
        '<div id="<%=movieBlaBla.id%>" class="singleMovieBlock">' +
        '<img class="miniMovieImg" src="http://image.tmdb.org/t/p/w300<%=movieBlaBla.poster_path%>">' +
        '<div class="infoBlock"><p><%=movieBlaBla.original_title%></p><p><%=movieBlaBla.release_date%></p></div></div>' +
        '<%})%>'
    );
    // console.log(obj)
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
        $('#Actors').append(movieBlocks);
        addEventsToActors();
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
}
function deleteBlock() {
    if($('#loadImage')){
        stopAnimation();
        $('#loaderImage').remove();
    }
    $('#Actor').remove();
};
function singleMoviePage(id){
    var singleMovieTemplate = 
    '<section id = "singleMovie">' + 
    '<h1> <%= singleMovie.title %> </h1>' +
    '<div class ="poster"><img src="<%= largeImageUrl %>' + '<%= singleMovie.poster %>" ></div>' +
    '<q> <%= singleMovie.tagline %> </q>' +
    '<ul class="mov-info"> <li><span class="sp_bold">Rates: </span><a href="#"><%= singleMovie.rating %></a> / 10' + 
    '</li>' +
    '<li><span class="sp_bold">Budget: </span>$ <%= singleMovie.budget %> </li>' +
    '<li><span class="sp_bold">Revenue: </span>$ <%= singleMovie.revenue %> </li>' +
    '<li><span class="sp_bold">Year: </span><a href="#"><%= singleMovie.year %></a> </li>' +
    '<li><span class="sp_bold">Runtime: </span><%= singleMovie.runtime %> min</li>' +
    '<li><span class="sp_bold">Production countries: </span>' +  
        '<% _.each(singleMovie.countries, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.countries[i] %></a>' +
        '<% }) %> </li>' +
    '<li><span class="sp_bold">Genres: </span>' + 
    '<% _.each(singleMovie.genres, function(el, i){ %>' +
        '<a href="#"> <%= singleMovie.genres[i].name %> </a> ' +
        '<% }) %> </li>' +
    '<li><span class="sp_bold">Production companies: </span>' + 
        '<% _.each(singleMovie.companies, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.companies[i] %></a>' +
        '<% }) %> </li></ul>' +
    '<p><span>Experts overview:</span> <blockquote><%= singleMovie.overview %></blockquote> </p>' +
    '<span>Screenshots: </span><section id="carousel">'+
    '<section class="control" data-direction="previous">previous</section>'+
    '<section id="slider"><section id="img-container">' +
        '<% _.each(singleMovie.images, function(el, i){ %>' +
        '<img class="screenshot" src="<%= largeImageUrl %>' +  
        '<%= singleMovie.images[i] %>">' +
    '<% }) %> </section></section>'+
    '<section class="control" data-direction="next">next</section></section>' + 
    '<span>Actors: </span><section class="actors">' + 
        '<% _.each(singleMovie.actors, function(el, i){ %>' +
        '<section class="single_actor"> <img src="<%= smallImageUrl %>' +  
        '<%= singleMovie.actors[i].profile_path %>">' +
        '<span class="act_name"><%= singleMovie.actors[i].name %></span>' +
        '<span class="act_role"><%= singleMovie.actors[i].character %></span>' +
        '</section> <% }) %> </section>'+
    '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + 
    '<%= singleMovie.trailer %>' + '" frameborder="0" allowfullscreen></iframe>'+
    '</section>';
    function renderSingleMoviePage(data) {
        singleMovie = {
            title : data.title,
            poster: data.poster_path,
            tagline : data.tagline,
            rating : data.vote_average,
            overview : data.overview,
            year : parseInt(data.release_date),
            budget : data.budget,
            revenue : data.revenue,
            companies : [],
            countries : [],
            similar: [],
            runtime: data.runtime,
            genres: data.genres,
            images: [],
            trailer: data.trailers.youtube[0].source,
            actors: data.credits.cast
        }
        for (var country in data.production_countries) {
            singleMovie.countries.push(data.production_countries[country].name)
        }
        for (var company in data.production_companies) {
            singleMovie.companies.push(data.production_companies[company].name)
        }
        for (var movie in data.similar.results) {
            singleMovie.similar.push({id:data.similar.results[movie].id, backdrop_path:data.similar.results[movie].backdrop_path, title:data.similar.results[movie].title})
        }
        for (var image in data.images.backdrops) {
            singleMovie.images.push(data.images.backdrops[image].file_path)
        }
        return singleMovie
    };
    $.ajax({
        type: "GET",
        //url: baseUrl + "/movie/" + id + '?api_key=' + apiKey,
        url:'http://api.themoviedb.org/3/movie/' + id + '?api_key=7a135ff2c408f8e138e4645f83b30222&append_to_response=similar,images,trailers,credits',
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.similar.results.length>10) {data.similar.results.splice(10)};
            if(data.credits.cast.length>10) {data.credits.cast.splice(10)}
            renderSingleMoviePage(data);//object that has all nesessary fields

            $('#mainContent').find(':first-child').remove();
    
            $('#mainContent').append(_.template(singleMovieTemplate,renderSingleMoviePage(data)));
            createCarousel();
        }
    });
};






