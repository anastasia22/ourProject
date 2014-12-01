/**
 * Created by Daryl on 28.11.2014.
 */
/*templates for all sections HOME HELP MOVIES . every menu button has its own template*/
var apiKey = '7a135ff2c408f8e138e4645f83b30222';
var baseUrl = 'http://api.themoviedb.org/3';
var posterUrl = 'http://image.tmdb.org/t/p/w300/'
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

    var newsBlocks='<section id="Home">';

// create news block with pic and news
    _.each(newsPictures,function(value,key){newsBlocks += '<div class="newsBlocks">' + value + shortInfo[key] + '</div>'});
    newsBlocks += '</section>';
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

function singleMoviePage(){
    $.ajax({
        type: "GET",
        //url: baseUrl + "/movie/" + id + '?api_key=' + apiKey,
        url:'http://api.themoviedb.org/3/movie/13-forrest-gump?api_key=7a135ff2c408f8e138e4645f83b30222',
        dataType: "json",
        success: function(data) {
          renderSingleMoviePage(data) 
        }
    })

    function renderSingleMoviePage(data) {

    }
        
}


//h1- original title
//q - tagline
//img - poster *
//li - rating - stars
//span*3 year, runtime, Country
//p - owerwiew 
//company, budget, revenue, (a - genres), (a -actors) 
//button -watch trailer*
//a>img - screenshots, popup
//a - similar movies
