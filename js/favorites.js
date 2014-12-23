
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

    var favBlock = '<div id=\"favSection\"></div>';

    /*shortens main block */
    $('#mainContent').animate({'width':'75%','float':'left'}, 300, setImgHeightEvent);
    /*adds favorites block*/

    window.setTimeout(function(){
      //append favBlock due to header and searchWrapper common height !!!! 'top': headerPlusSearchHeight()

    $(favBlock).insertAfter( "#header" ).animate({'opacity': '1', 'top': headerPlusSearchHeight()}, 400,function() {
            makeDroppable();
            favMovies();
            });
        }, 200);


}

//get a common height of header and searchWrapper
function headerPlusSearchHeight(height) {
    var searchHeight, headerHeight, favouritesTopStyle;
        if (document.getElementById('searchWrapper')) {
            searchHeight = document.getElementById('searchWrapper').offsetHeight;
        } else {
            searchHeight = 0;
        }
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
    window.setTimeout(setImgHeightEvent, 1000);
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
        //make box smaller to fit footer
        var docScrollTop = $(document).scrollTop();
        var winHeight = window.innerHeight;
        var scrollToFooter = $(document).height() - $('#footer').height() - window.innerHeight;
        if (docScrollTop >= scrollToFooter) {
            var newHeight = winHeight - (docScrollTop - scrollToFooter);
            $('#favSection').css({height: newHeight + 'px'});
        } else if (docScrollTop < scrollToFooter) {
            $('#favSection').css({height: '100%'});
        }
    } else {
        return;
    }
});

//correct a top position of favSection due to searchWpapper height
function favSectionTop() {
    var totalHight, headerHeight = document.getElementById('header').offsetHeight;
    var srch = document.getElementById('searchWrapper');
    var adv = document.getElementById('advancedWrapper');
    if (adv !== null) {
        totalHight = headerHeight + adv.offsetHeight + 'px';
    } else if (srch !== null) {
        totalHight = headerHeight + srch.offsetHeight + 'px';
    } else if (adv == null && srch == null) {
        totalHight = headerHeight + 'px';
    }
    if ($('#favSection')) {
        $('#favSection').animate({
            'top': totalHight
        }, 300);
    }
}




