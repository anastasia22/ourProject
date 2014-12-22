var dragMovie = {};

function startDrag(event) {
    var sd = $(event.target).closest(".singleMovieBlock");
    dragMovie.id = $(sd).attr("id");
    console.log(dragMovie.id);
    dragMovie.poster = event.target.src;
    dragMovie.title = event.target.getAttribute('name');
}

function drop(event) {
    var favMovies = [];
    $('#favSection').css('border','none');

    if (!checkFav()) {
        customAlert('This movie has been already added.');
        event.preventDefault();
        return false;
    }

    if (!(localStorage.getItem('favMovies'))) {
        favMovies.push(dragMovie);
        localStorage.setItem('favMovies', JSON.stringify(favMovies));
    } else {
        favMovies = JSON.parse(localStorage.getItem('favMovies'));
        favMovies.push(dragMovie);
        localStorage.setItem('favMovies', JSON.stringify(favMovies));
    }
    // BORDER FOR DROP
    $('#favSection').css({border: '2px dashed #FF8D00'});
    window.setTimeout(function() {
        $('#favSection').stop(true).css({border: 'none'});
    }, 500);

    customAlert('Movie added to favorites.');
    addFavMovieBlock(dragMovie);
    event.stopPropagation();
    event.preventDefault();
}

function allowDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    $('#favSection').css({border: '2px dashed #FF8D00'});
    return false;
}

function handleDragLeave(event) {
    $('#favSection').css({border: 'none'});
    event.stopPropagation();
    event.preventDefault();

    return false;
}

function favMovies() {
    var favoriteMovies;
    if (!(localStorage.getItem('favMovies'))) {
        return;
    }

    favoriteMovies = JSON.parse(localStorage.getItem('favMovies'));

    for (var i = 0; i < favoriteMovies.length; i++) {
        addFavMovieBlock(favoriteMovies[i]);
    }
}

function addFavMovieBlock(movie) {
    var str = '<div class="favMovieBlock" fav-id="' + movie.id + '">' +
        '<button class="favDelBtn"></button>' +
        '<img class="favMovieImg" src="' + movie.poster + '"  ondragover="allowDrop(event)" ondragleave="handleDragLeave(event)">' +
        '<div class="favInfoBlock">' +
        '<p>' + movie.title + '</p>' +
        '</div></div>';

    $('#favSection').append(str);
    faBlockEvents();
}

function makeDraggable() {
    $('.singleMovieBlock').attr({
        draggable: true,
        ondragstart: 'startDrag(event)'
    });
}

function makeDroppable() {
    $('#favSection').attr({
        ondrop: 'drop(event)',
        ondragover: 'allowDrop(event)',
        ondragleave: 'handleDragLeave(event)'
    });
}

function delFavMovie(blockID) {
    var allMovies = JSON.parse(localStorage.getItem('favMovies'));
    var temp = [];
    for (var i = 0; i < allMovies.length; i++) {
        if (allMovies[i].id == blockID) {
            continue;
        }
        temp.push(allMovies[i]);
    }

    localStorage.setItem('favMovies', JSON.stringify(temp));
}

function checkFav() {
    var favorites = $('.favMovieBlock');

    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].getAttribute('fav-id') == dragMovie.id) {
            return false;
        }
    }
    return true;
}