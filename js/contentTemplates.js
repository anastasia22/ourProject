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

function moviesTemplate() {
    var movies = {
            Dragon:{
                year: 1999,
                poster: '<img src="moviesIcons/icon1.jpg">'

            },
            Lucy:{
                year: 1299,
                poster: '<img src="moviesIcons/icon2.jpg">'

            },
            Harry_Potter:{
                year: 1933,
                poster: '<img src="moviesIcons/icon3.jpg">'

            }
    };

    var movieBlocks='<section id="Movies">';


    _.each(movies,function(value,key){
        movieBlocks += '<div class="singleMovieBlock" onclick="singleMoviePage()">' + value.poster + key + ' year:' + value.year + '</div>';
    });
    movieBlocks += '</section>';
    $('#mainContent').find(':first-child').remove();
    $('#mainContent').append(movieBlocks);
}

function singleMoviePage(id){
    var singleMovieTemplate = 
    '<section id = "singleMovie">' + 
    '<h1> <%= singleMovie.title %> </h1>' +
    '<div class ="poster"><img src="<%= largeImageUrl %>' + '<%= singleMovie.poster %>" ></div>' +
    '<q> <%= singleMovie.tagline %> </q>' +
    '<ul> <li><span>Rates: </span><a href="#"><%= singleMovie.rating %></a>' + 
    '<% for(var i=0; i++; i <= Math.round(singleMovie.rating)) { %>' +
    '<span class="glyphicon glyphicon-star"><span> ' +
    '<% }; %>' + 
    '<% for(var i=0; i++; i <= (10 - Math.round(singleMovie.rating))){ %>' +
    '<span class="glyphicon glyphicon-star-empty"><span> ' +
    '<% }; %>' + 
    '</li>' +
    '<li><span>Year: </span><a href="#"><%= singleMovie.year %></a> </li>' +
    '<li><span>Runtime: </span><%= singleMovie.runtime %> min</li>' +
    '<li><span>Country: </span>' +  
        '<% _.each(singleMovie.countries, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.countries[i] %></a>' +
        '<% }) %> </li></ul>' +
    '<p><span>Experts overview:</span> <blockquote><%= singleMovie.overview %></blockquote> </p>' +
    '<ul><li><span>Genres: </span>' + 
    '<% _.each(singleMovie.genres, function(el, i){ %>' +
        '<a href="#"> <%= singleMovie.genres[i].name %> </a> ' +
        '<% }) %> </li>' +
    '<li><span>Company: </span>' + 
        '<% _.each(singleMovie.companies, function(el, i){ %>' + 
        '<a href="#"><%= singleMovie.companies[i] %></a>' +
        '<% }) %> </li>' +
    '<li><span>Budget: </span>$ <%= singleMovie.budget %> </li>' +
    '<li><span>Revenue: </span>$ <%= singleMovie.revenue %> </li>' +
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
        url:'http://api.themoviedb.org/3/movie/240832-lucy?api_key=7a135ff2c408f8e138e4645f83b30222&append_to_response=similar,images,trailers,credits',
        dataType: "json",
        success: function(data) {
            if(data.similar.results.length>10) {data.similar.results.splice(10)};
            if(data.credits.cast.length>10) {data.credits.cast.splice(10)}
            renderSingleMoviePage(data);//object that has all nesessary fields

            $('#mainContent').find(':first-child').remove();
    
            $('#mainContent').append(_.template(singleMovieTemplate,renderSingleMoviePage(data)));
        }
    })




}
