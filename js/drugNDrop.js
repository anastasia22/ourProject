var dragMovie = {};

function startDrag(event) {
    var sd = event.target.parentNode;
    dragMovie.id = sd.id;
    dragMovie.poster = event.target.src;
    dragMovie.title = event.target.getAttribute('name');
}

function drop(event) {
    var favMovies = [];
    document.getElementById('favSection').style.border = 'none';
    $('#favSection').css({
        border: 'none'
    });

    if (checkFav()) {

    } else {
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
            $('#favSection').css({'border-left': '4px solid #08f'});
            window.setTimeout(function() {
                $('#favSection').css({'border-left': 'none'});
            }, 500);


    customAlert('Movie added to favorites.');
    addFavMovieBlock(dragMovie);
    allowDrop(event);
}

function favMovies() {
    if (!(localStorage.getItem('favMovies'))) {
        return;
    }

    var favoriteMovies = JSON.parse(localStorage.getItem('favMovies'));

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
    addHovEvent();
    
}

function allowDrop(event) {

    event.stopPropagation();
    event.preventDefault();

            

    return false;

}

function handleDragLeave(event) {
    $('#favSection').css({
        border: 'none'
    });
    event.stopPropagation();
    event.preventDefault();

    return false;
}



function makeDraggable(elem) {
    $('.singleMovieBlock').attr({
        draggable: true,
        ondragstart: 'startDrag(event)'
    });
}

function makeDroppable() {
    var a = $('#favSection');
    $('#favSection').attr({
        ondrop: 'drop(event)',
        ondragover: 'allowDrop(event)',
        ondragleave: 'handleDragLeave(event)'
    });
}

function addHovEvent() {
    var infoBlock;
    
    $(".favMovieBlock").hover(function () {
            infoBlock = $(this).find(':last-child')[0];

            $(infoBlock).stop(true, false).css({
                height: '0px',
                visibility: "visible"
            }).animate({
                height: '50px'
            }, 700);

        },
        function () {
            $(infoBlock).stop(false, false).animate({
                    height: '0px'
                }, 700,
                function () {
                    $(this).css({
                        visibility: "hidden",
                        height: '50px'
                    });

                })
        });

    $(".favMovieImg,.favInfoBlock ").on('click', function () {

        showOneMovie(this.parentNode.getAttribute('fav-id'));
        return;
    });

    $('.favDelBtn').on('click', function () {
        delFavMovie(this.parentNode.getAttribute('fav-id'));

        $(this.parentNode).animate({
            opacity: 0,
            height: '20px'
        }, 600, function () {
            this.remove();
        });
        return;
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