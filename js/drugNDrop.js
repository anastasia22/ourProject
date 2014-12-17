var dragMovie={};
function startDrag(event) {
    var sd = event.target.parentNode;
    dragMovie.id = sd.id;
    dragMovie.poster = sd.childNodes[0].src;
    dragMovie.title=sd.childNodes[1].firstChild.innerHTML;
}

function drop(event) {
    var favMovies=[];

    if(checkFav()) {

    } else {
        alert('already added');
        allowDrop(event);
        return;
    }

    if( !(localStorage.getItem('favMovies')) ) {
        favMovies.push(dragMovie);

        localStorage.setItem('favMovies',JSON.stringify(favMovies));
    } else {
        favMovies = JSON.parse(localStorage.getItem('favMovies'));
        favMovies.push(dragMovie);
        localStorage.setItem('favMovies',JSON.stringify(favMovies));
        console.log(localStorage.getItem('favMovies'));

    }
    addFavMovieBlock(dragMovie);
    allowDrop(event);

}

function favMovies() {
    if( !(localStorage.getItem('favMovies')) ) {
        return;
    }

    var favoriteMovies=JSON.parse(localStorage.getItem('favMovies'));

    for (var i=0; i < favoriteMovies.length; i++) {
        addFavMovieBlock(favoriteMovies[i]);
    }

}


function addFavMovieBlock(movie) {
    var str = '<div class="favMovieBlock" fav-id="' + movie.id + '">' +
        '<img class="favMovieImg" src="' + movie.poster + '">' +
        '<div class="favInfoBlock">' +
        '<p>' + movie.title + '</p>' +
        '</div></div>';

    $('#favSection').append(str);
    addHovEvent();
}

function allowDrop(event) {
    event.preventDefault();
}

function makeDraggable(elem) {

    $('.singleMovieBlock').attr({draggable : true, ondragstart : 'startDrag(event)'});

}

function makeDroppable() {
    var a=$('#favSection');
    $('#favSection').attr({ondrop : 'drop(event)', ondragover : 'allowDrop(event)'});
}







function addHovEvent() {
    var infoBlock;
    $(".favMovieBlock").hover(function() {
            infoBlock=$(this).find(':last-child')[0];

            $(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '50px'}, 700);

        },
        function(){
            $(infoBlock).stop(false,false).animate({height: '0px'}, 700,
                function(){
                    $(this).css({visibility: "hidden",height : '50px'});

                })
        });

    $(".favMovieBlock").on('click',function() {
        singleMoviePage(this.getAttribute('fav-id'));
    });
}





function checkFav() {
    var favorites = $('.favMovieBlock');

    for (var i=0; i < favorites.length; i++) {
        if(favorites[i].getAttribute('fav-id') == dragMovie.id) {
            return false;
        }
    }
    return true;
}