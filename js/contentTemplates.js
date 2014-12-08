/**
 * Created by Daryl on 28.11.2014.
 */
/*templates for all sections HOME HELP MOVIES . every menu button has its own template*/
var apiKey = '7a135ff2c408f8e138e4645f83b30222';
var baseUrl = 'http://api.themoviedb.org/3';
var largeImageUrl = 'http://image.tmdb.org/t/p/w300/';
var mediumImageUrl = 'http://image.tmdb.org/t/p/w185/';
var smallImageUrl = 'http://image.tmdb.org/t/p/w45/';

// HOME BLOCK
function homeTemplate() {
    var newsPictures = {
        1: '<img src="news/JessicaAlba.jpg" class="newsPic">',
        2: '<img src="news/EdwardNorton.jpg" class="newsPic">',
        3: '<img src="news/AlPacino.jpg" class="newsPic">'
    }
    var shortInfo = {
        1: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>',
        2: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>',
        3: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet aut consequatur, doloremque dolorum excepturi nesciunt odit perspiciatis provident quaerat quisquam quod suscipit tenetur. Animi debitis impedit mollitia quos suscipit!</p>'
    }

    var newsBlocks='<div id="Home">';

// create news block with pic and news
    _.each(newsPictures,function(value,key){newsBlocks += '<section class="newsBlocks">' + value + shortInfo[key] + '</section>'});
    newsBlocks += '</div>';
// delete current block
    $('#mainContent').find(':first-child').remove();
//set home block
    $('#mainContent').append(newsBlocks);
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
    var movieBlocks='';
    console.log(movies);
    //paint recived movie list
    for(var i=0; i < movies.length; i++) {
        //check if  current movie have no poster pass it
        if(movies[i].poster_path == null) {
            continue;
        }
        movieBlocks += '<div id="' + movies[i].id + '" class="singleMovieBlock">' +
        '<img class="miniMovieImg" src="http://image.tmdb.org/t/p/w300' + movies[i].poster_path + '">' +
        '<div class="infoBlock">' +
        '<p>' + movies[i].original_title + '</p>' +
        '<p>' + movies[i].release_date + '</p>' +
        '</div></div>';
    }
    //removes prev 'little' preloder
    if($('#loader')){
       $('#loader').remove(); 
    }
    //adds little preloder
    movieBlocks += '<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>';

    //check if it is the first paint if true it wrapps it into 'Movies'
    if($('#mainContent').find(':first-child').attr('id') == 'Movies') {
        $('#Movies').append(movieBlocks);
        //slide out event
        addEvents();
    } else {
        movieBlocks='<section id="Movies"><h1>' + listName + '</h1>' + movieBlocks + '</section>';
        $('#mainContent').append(movieBlocks);
        addEvents();
    }
}

function  actorsTempl(actors,listName){
    var actorsBlock='';

    for (var i=0; i < actors.length; i++) {
        actorsBlock +='<div id="' + actors[i].id + '"class="singleActorBlock">' +
        '<img class="miniActorImg" src="http://image.tmdb.org/t/p/w300' + actors[i].profile_path + '">' +
        '<p>' + actors[i].name + '</p>' +
        '<p>' + actors[i].popularity + '</p>' +
         '</div>';
    }

    if($('#loader')){
        $('#loader').remove();
    }

    actorsBlock += '<div id="loader"><img src="http://preloaders.net/images/ajax-loader.gif" alt="AJAX loader" title="AJAX loader" /></div>';

    if($('#mainContent').find(':first-child').attr('id') == 'Actors') {
        $('#Actors').append(movieBlocks);
        //slide out event
       // addEvents();
    } else {
        actorsBlock='<section id="Actors"><h1>' + listName + '</h1>' + actorsBlock + '</section>';
        $('#mainContent').append(actorsBlock);
        //addEvents();
    }
}

function singleMoviePage(id){
    var singleMovieTemplate = 
    '<section id = "singleMovie">' + 
    '<h1> <%= singleMovie.title %> </h1>' +
    '<div class ="poster"><img src="<%= largeImageUrl %>' + '<%= singleMovie.poster %>" ></div>' +
    '<q> <%= singleMovie.tagline %> </q>' +
    '<ul class="mov-info"> <li><span>Rates: </span><a href="#"><%= singleMovie.rating %></a> / 10' + 
    // '<div class="stars">' + 
    // '<% _.times(7, function() { %>' +
    // '<img src="images/star.png"></img> ' +
    // '<% }) %> </div>' + 
    '</li>' +
    '<li><span>Budget: </span>$ <%= singleMovie.budget %> </li>' +
    '<li><span>Revenue: </span>$ <%= singleMovie.revenue %> </li>' +
    '<li><span>Year: </span><a href="#"><%= singleMovie.year %></a> </li>' +
    '<li><span>Runtime: </span><%= singleMovie.runtime %> min</li>' +
    '<li><span>Production countries: </span>' +  
        '<% _.each(singleMovie.countries, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.countries[i] %></a>' +
        '<% }) %> </li>' +
    '<li><span>Genres: </span>' + 
    '<% _.each(singleMovie.genres, function(el, i){ %>' +
        '<a href="#"> <%= singleMovie.genres[i].name %> </a> ' +
        '<% }) %> </li>' +
    '<li><span>Production companies: </span>' + 
        '<% _.each(singleMovie.companies, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.companies[i] %></a>' +
        '<% }) %> </li></ul>' +
    '<p><span>Experts overview:</span> <blockquote><%= singleMovie.overview %></blockquote> </p>' +
    
    '<li><span>Actors: </span><table>' + 
        '<% _.each(singleMovie.actors, function(el, i){ %>' +
        '<tr><td> <img src="<%= smallImageUrl %>' +  
        '<%= singleMovie.actors[i].profile_path %>" </td>' +
        '<td><%= singleMovie.actors[i].name %></td>' +
        '<td><%= singleMovie.actors[i].character %></td>' +
        '</tr> <% }) %> </table></li></ul>' +
    '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + 
    '<%= singleMovie.trailer %>' + '" frameborder="0" allowfullscreen></iframe>'



    ;
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
        }
    })




}
