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
/*    var movies = {
        1 : 'First title',
        2 : 'Second tile',
        3 : 'Third tile'
    };*/
/*
    var moviesIcons='';
     _.each(movies,function(num, key){ moviesIcons+='<div class=\"movieIcon\">' + num + '</div>'});
*/

    var favBlock = _.template('<div id=\"favSection\">'+ '</div>');

    /*shortens main block */
    $('#mainContent').animate({'width':'75%','float':'left'}, 300);
    /*adds favorites block*/
    window.setTimeout(function(){
        
      //append favBlock due to header and searchWrapper common height
    $( favBlock({}) ).insertAfter( "#searchWrapper" ).animate({'opacity': '1', 'top': headerPlusSearchHeight()}, 400,function() {

        makeDroppable();
        favMovies();
    });
        
    }, 200);


}

//get a common height of header and searchWrapper
function headerPlusSearchHeight(height) {
    var searchHeight, headerHeight, favouritesTopStyle;
        searchHeight = document.getElementById('searchWrapper').offsetHeight;        
        headerHeight = document.getElementById('header').offsetHeight;
        favouritesTopStyle = '' + (searchHeight + headerHeight);
    
    return favouritesTopStyle;
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

//make fav block fixed when scroll
$(document).on('scroll', function(e) {
    var isFavorites = checkFavorites();
    var searchHeight = $('#searchWrapper').height();
    var headerHeight = $('#header').height();
    var commonHeight = searchHeight + headerHeight;

    if (isFavorites) {
         if ($(document).scrollTop() > commonHeight) {  
            $('#favSection').addClass('fix-fav')
            .css({top: '0px'});
          } else if($('#favSection').hasClass('fix-fav')) {
            $('#favSection').removeClass('fix-fav')
            .css({top: commonHeight + 'px'});                          
          }
        //make box smaller to fit footer  FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        var docScrollTop = $(document).scrollTop();
        var winHeight = window.innerHeight;
        var scrollToFooter = $(document).height() - $('#footer').height() - window.innerHeight;
        if (docScrollTop >= scrollToFooter) {
            var newHeight = winHeight - (docScrollTop - scrollToFooter);
            $('#favSection').css({height: newHeight + 'px'});
        }
    } else {
        return;
    }
    
    
});







