/**
 * Created by Daryl on 28.11.2014.
 */

function eventHandler(event) {
    var button = $('#favoritesButton');

    if(checkFavorites()){
        button.toggleClass('menuButtonHovered');
        hideFavBlock();
    }else {
        button.toggleClass('menuButtonHovered');
        addFavBlock();
    }

}

//check is there a favorites block on the page
function checkFavorites() {
    if(document.getElementById('favSection')) {
        return true;
    }else {
        return false;
    }
}

//adds favorite block
function addFavBlock() {
    var movies = {
        1 : 'First title',
        2 : 'Second tile',
        3 : 'Third tile'
    };
    var moviesIcons='';
     _.each(movies,function(num, key){ moviesIcons+='<div class=\"movieIcon\">' + num + '</div>'});

    var favBlock = _.template('<div id=\"favSection\">' + moviesIcons + '</div>');
    /*shortens main block */
    $('#mainContent').animate({'width':'80%','float':'left'}, 300);
    /*adds favorites block*/
    window.setTimeout(function(){
        $( favBlock({}) ).insertBefore( "#footer" ).animate({'opacity': '1'}, 400);
    }, 200);   
}

//delete favorites block
function hideFavBlock() {
    /*restores main block */
    window.setTimeout(function() {
        $('#mainContent').animate({'width':'100%','float':'none'});
    }, 300);
    /*delete favorites block*/
    $('#favSection').animate({'opacity': '0'}, 400);
    window.setTimeout(function() {
         $('#favSection').remove();
    }, 300);

}