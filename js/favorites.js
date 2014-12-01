/**
 * Created by Daryl on 28.11.2014.
 */

function eventHandler(event) {
    var button = document.getElementById('favoritesButton');

    if(checkFavorites()){
        button.style.backgroundImage='url(images/favIcon1.jpg)';
        hideFavBlock();
    }else {
        button.style.backgroundImage='url(images/favIcon2.jpg)';
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
    $('#mainContent').css({'width':'80%','float':'left'});
    /*adds favorites block*/
    $( favBlock({}) ).insertBefore( "#footer" );
}

//delete favorites block
function hideFavBlock() {
    /*restores main block */
    $('#mainContent').css({'width':'100%','float':'none'});
    /*delete favorites block*/
    document.body.removeChild(document.getElementById('favSection'));

}