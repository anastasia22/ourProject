var dragMovie={};
function startDrag(event) {
    var sd = event.target.parentNode;
    dragMovie.id = sd.id;
    dragMovie.poster = sd.childNodes[0].src;
    dragMovie.title=sd.childNodes[1].firstChild.innerHTML;
}

function drop(event) {
    if(checkFav()) {

    } else {
        alert('already added');
        allowDrop(event);
        return;
    }
    var str = '<div class="favMovieBlock" fav-id="' + dragMovie.id + '">' +
        '<img class="favMovieImg" src="' + dragMovie.poster + '">' +
         '<div class="favInfoBlock">' +
         '<p>' + dragMovie.title + '</p>' +
        '</div></div>';
    allowDrop(event);
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

            $(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

        },
        function(){
            $(infoBlock).stop(false,false).animate({height: '0px'}, 700,
                function(){
                    $(this).css({visibility: "hidden",height : '100px'});

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