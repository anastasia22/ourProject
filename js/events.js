 //adds all events handlers to menu buttons
(function(){
	//main logo events
	$('.logo-backgr').on('click',function() {
		if ($('#favSection')) {
			hideFavBlock();
		}
		$('#searchWrapper').remove();
		$('#favoritesButton').removeClass('menuButtonHovered');
		$('#callSearch').removeClass('menuButtonHovered');
		$('#mainContent').children().remove();
		if(document.URL.split('#')[1] == 'news') {
			window.location.reload();
		}
		window.location='#news';

	});
	$('#mainMenu').on('click',menuEvents);
	$('#favoritesButton').on('click',appearFavorites);
    
	$('#callSearch').on('click',function() {
		if(!document.getElementById('searchWrapper')) {
			addSearchPanel();
			var autoHeight=$('#searchWrapper').height();
			$('#searchWrapper').css({height: '0px',opacity : 0}).animate({height: autoHeight,opacity: 1}, 300,function(){
				$('#searchWrapper').css('height','auto');
				favSectionTop();
			});
            $('#callSearch').toggleClass('menuButtonHovered');
		}else {
			$('#searchWrapper').animate({height: 'toggle',opacity: 0}, 'slow',function(){
				$('#searchWrapper').remove();
				favSectionTop();
			});
            $('#callSearch').toggleClass('menuButtonHovered');
		}
	});
})();

function menuEvents(event) {
	var target = event.target || event.srcElement;
		if(document.URL == target.href) {
			window.location.reload();
		}
}

function searchBy() {
	$('.search-button').on('click',function() {
		$('#mainContent').find(':first-child').remove();

		if($('input[name=factor]:checked').val() == 'Title'){
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			window.location='#movies/' + $('#searchField').val();
		} else {
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			window.location='#actors+' + $('#searchField').val();
		}
	});
}


//event for changing poster sizes when animate
function setImgHeightEvent(){
		var widthImg = $(".singleMovieBlock img").width();
		$(".singleMovieBlock .imgWrap").height(widthImg*1.53);
};


//single movie block slide out handler
function singleMoveBlockEvents() {
	var infoBlock;
	setImgHeightEvent();
	$(window).resize(setImgHeightEvent);

	$(".singleMovieBlock").hover(function() {
		//infoBlock=$(this).find(':last-child')[0];
		infoBlock=$(this).find('.infoBlock');

		$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);
	},
	function(){
		$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
		 	function(){		 
		 	$(this).css({visibility: "hidden",height : '100px'});
		 })
	});
}

function faBlockEvents() {
	var infoBlock;

	$(".favMovieBlock").hover(function () {
			infoBlock = $(this).find('.favInfoBlock');
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
				});
		});

	$('.favDelBtn').on('click', function () {
		delFavMovie($(this).parent().attr('fav-id'));
		$(this.parentNode).animate({//should replace parentNode into parent()!!!!!!!!!!!!!
			opacity: 0,
			height: '20px'
		}, 600, function () {
			this.remove();
		});
		return;
	});
}

//events and functions for singleMoviePage
function addEventsToMovie(){
	//setting width for small carousel container
	var smImageContainer = $('.smCarousel').find($('.img-container'));
	var smImages = smImageContainer.find('.screenshot');
    var smTotalLength = (parseInt(smImages.css('width')) + parseInt(smImages.css('margin-left')) + parseInt(smImages.css('margin-right'))) * smImages.length;
    smImageContainer.css({'width': smTotalLength,'right':0});
    smImages.on('click', createLargeCarousel);
    $('.carousel').on('click','.control', scrollCarousel);
    
    //func that shows modal large carousel
	function createLargeCarousel(){
		//setting position and width, events for large carousel
		var numb = $(this).data('numb');
		var lgImageContainer = $('.lgCarousel').find($('.img-container'));
		var lgImages = lgImageContainer.find('.lgScreenshot');
		var lgStep = lgImages.outerWidth();
		var lgTotalLength = parseInt(lgImages.css('width')) * lgImages.length;
		lgImageContainer.css({'width': lgTotalLength,'right': numb*lgStep});
		lgImages.on('click', scrollCarousel);
		createModal();
	}
    //func for creating and inserting modal window and mask
	function createModal() {
		var mask = $('#mask');
		var modwin = $('#modwin');
		var winH = $(window).height();
	    var winW = $(window).width();
	    modwin.css('top', winH/2-modwin.height()/2);
	    modwin.css('left', winW/2-modwin.width()/2);
	    mask.fadeIn(400);    
	    mask.fadeTo("slow",0.8);    
	    modwin.fadeIn(2000); 
	    mask.on('click', function () {
	        mask.hide();
	        modwin.hide();
    	}); 

	}
    //func for sliding carousel
	function scrollCarousel(){
		var slider = $(this).closest('.carousel').find('.slider');
		var img_cont = $(this).closest('.carousel').find('.img-container');
		var images = img_cont.find('.screenshot');
		var prevArrow = $(this).closest('.carousel').find($('.prev-ar'));
		var nextArrow = $(this).closest('.carousel').find($('.next-ar'));
	    var imagesWidth = parseInt(img_cont.css('width'));
	    var sliderWidth = parseInt(slider.css('width'));
	    var imagesRight = parseInt(img_cont.css('right'));
	    var step = images.outerWidth(true);
	    var direction=$(this).data('direction');
	    var diffWidth = imagesWidth - sliderWidth;
	    var lastStep = diffWidth - imagesRight;
	    console.log(imagesRight,step,lastStep);
	    if (direction == 'previous' && imagesRight > step) {
	        nextArrow.removeClass('next-unable').addClass('next-able');
	        img_cont.stop(true, true).animate({"right": "-=" + step + "px" }, "slow","linear")
	    } else if (direction == 'previous' && imagesRight <= step && imagesRight > 0) {
	        prevArrow.removeClass('prev-able').addClass('prev-unable');
	        img_cont.stop(true, true).animate({"right": "-=" + imagesRight + "px" }, "slow","linear")
	    };
	    if (direction =='next' && lastStep > step) {
	        prevArrow.removeClass('prev-unable').addClass('prev-able');
	        img_cont.stop(true, true).animate({"right": "+=" + step + "px"}, "slow", "linear")
	    } else if (direction =='next' && lastStep <= step) {
	        nextArrow.removeClass('next-able').addClass('next-unable');
	        img_cont.stop(true, true).animate({"right": "+=" + lastStep + "px"}, "slow", "linear")
	    };
	    return;
	}

};  
localStorage.clear();
//toggle for help page
function HelpBlockEvents(){
	$('#Help').on('click', '.question', function(){
		$(this).next().slideToggle("fast")
	});
}


// events to scroll top btn
function toTopBtnEvents() {
	$('#scrollTopBtn').on('click',function() {
		$(window).scrollTop(0);
		window.location = '#' + document.URL.split('#')[1];
		this.remove();
	});
}

function loadContent(){
	$(window).on('scroll', function(){
		onToTopBtn();
		var containerId = $('#mainContent').find(':first-child').attr('id')
	if ($(window).scrollTop() >= ($(document).height() - $(window).height() - 200)&&procesing ) {
			if (containerId == 'News') {
				getNews($('#News').data('page'))
			} else if (containerId == 'Movies') {
				if ($('#Movies').data('page') == $('#Movies').data('total')) {
		            	customAlert('This is the last page.');
		        } else {
		        		defaultMovies($('#Movies').data('type'),$('#Movies').data('page') + 1, $('#Movies').data('query'))
		        }
		    } else if (containerId == 'Actors') {
		    	if ($('#Actors').data('page') == $('#Actors').data('total')) {
		            	customAlert('This is the last page.');
		        } else {
		    		defaultMovies($('#Actors').data('type'), $('#Actors').data('page') + 1, $('#Actors').data('query'))
		    	}
		    }
		} 	
	
	});
}

