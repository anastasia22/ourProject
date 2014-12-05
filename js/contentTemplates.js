/**
 * Created by Daryl on 28.11.2014.
 */
/*templates for all sections HOME HELP MOVIES . every menu button has its own template*/
var apiKey = '7a135ff2c408f8e138e4645f83b30222';
var baseUrl = 'http://api.themoviedb.org/3';
var bigImageUrl = 'http://image.tmdb.org/t/p/w300/';
var mediumImageUrl = 'http://image.tmdb.org/t/p/w185/';
var smallImageUrl = 'http://image.tmdb.org/t/p/w185/';
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
    '<img class ="poster" src="<%= mediumImageUrl %>' + '<%= singleMovie.poster %>" >' +
    '<q> <%= singleMovie.tagline %> </q>' +
    '<ul> <li>Rates: <%= singleMovie.rating %> </li>' +
    '<li>Year: <%= singleMovie.year %> </li>' +
    '<li>Runtime:<%= singleMovie.runtime %> </li>' +
    '<li>Country:' +  
        '<% _.each(singleMovie.countries, function(el, i){ %>' + 
        '<%= singleMovie.countries[i] %>' +
        '<% }) %> </li></ul>' +
    '<p> <%= singleMovie.overview %> </p>' +
    '<ul><li> Genres:' + 
    '<% _.each(singleMovie.genres, function(el, i){ %>' +
        '<a> <%= singleMovie.genres[i].name %> </a> ' +
        '<% }) %> </li>' +
    '<li> Company:' + 
        '<% _.each(singleMovie.companies, function(el, i){ %>' + 
        '<%= singleMovie.companies[i] %>' +
        '<% }) %> </li>' +
    '<li>Budget:$ <%= singleMovie.budget %> </li>' +
    '<li>Revenue:$ <%= singleMovie.revenue %> </li>' +
    '<li> Actors: <ul>' + 
        '<% _.each(singleMovie.actors, function(el, i){ %>' +
        '<li> <img src="<%= smallImageUrl %>' + 
        '<%= singleMovie.actors[i].profile_path %>">' +
        '<span><%= singleMovie.actors[i].name %> as' +
        '<%= singleMovie.actors[i].character %> </span>' +
        '</li> <% }) %> </ul>'



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
            trailers: data.trailers.youtube,
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
        url:'http://api.themoviedb.org/3/movie/13-forrest-gump?api_key=7a135ff2c408f8e138e4645f83b30222&append_to_response=similar,images,trailers,credits',
        dataType: "json",
        success: function(data) {
            if(data.similar.results.length>10) {data.similar.results.splice(10)};
            if(data.credits.cast.length>5) {data.credits.cast.splice(5)}
            renderSingleMoviePage(data);//object that has all nesessary fields

            $('#mainContent').find(':first-child').remove();
    
            $('#mainContent').append(_.template(singleMovieTemplate,renderSingleMoviePage(data)));
        }
    })




}
