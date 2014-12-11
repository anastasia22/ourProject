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
    $('#mainContent').animate({'width':'75%','float':'left'}, 300);
    /*adds favorites block*/
    window.setTimeout(function(){
        
      //append favBlock due to header and searchWrapper common height
    $( favBlock({}) ).insertAfter( "#searchWrapper" ).animate({'opacity': '1', 'top': headerPlusSearchHeight()}, 400);
        
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
$('#favSection').on('scroll', function(e) {
    console.log(this.scrollTop);
      if (this.scrollTop > 200) {                       //WHY DON'T WORK?!?!?!?!?!
        $('#favSection').addClass('fix-fav');
      } else {
        $('#favSection').removeClass('fix-fav');
      }
});

function createCarousel(){
    var visibleImg = 2;
    var container=$('#img-container');
    var slider = $('#slider');
    var images=$('#img-container').find('.screenshot');
    var totalLength = images.outerWidth(true)*images.length;
    var visibleLength = images.outerWidth(true)*visibleImg;
    var step = visibleLength;
    container.css({'width': totalLength,'left': 0});
    slider.css('width', visibleLength);

    var direction;





    $('#carousel').on('click','.control', function(){
        direction=$(this).data('direction');
        if(direction == 'previous'){
            slider.animate({"scrollLeft": "-="+ step }, "slow")
        }else if (direction =='next') {
            slider.animate({"scrollLeft": "+=" + step }, "slow")
        } else {return}
    })

};    

