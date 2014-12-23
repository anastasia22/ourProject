 //adds all events handlers to menu buttons
(function(){

	$('.logo-backgr').css({cursor : 'pointer'});
	$('.logo-backgr').on('click',function() {
		if($('#favSection')) {
			hideFavBlock();
		}
		$('#searchWrapper').remove();
		$('#mainContent').children().remove();
		window.location='#menuHome';
	});
	$('#mainMenu').on('click',menuEvents);
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

function searchBy() {
	$('.search-button').on('click',function() {
		$('#mainContent').find(':first-child').remove();

		if($('input[name=factor]:checked').val() == 'Title'){
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			window.location='#movies+' + $('#searchField').val();
		} else {
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			window.location='#actors+' + $('#searchField').val();
		}
	});
}

function menuEvents(event) {
	var target=event.target || event.srcElement;
	var menu={'menuHome' : homeTemplate, 'menuMovies' : defaultMovies,'menuHelp' : getHelp,
	'subMenuPop':mostPopular,'subMenu2013':mostPopular2013,'subMenuKids':popular4Kids,'subMenuComedy':mostPopularComedies,
		'subMenuHorror' : bestHorrors,'subMenuFantasy' : bestFantasy};

	for (var temp in menu) {
		if(temp == target.id) {
			if(document.URL.split('#')[1] == temp) {
				window.location.reload();
			}
			$('#mainContent').find(':first-child').remove();
			window.location='#' + temp;
		}
	}
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

	$(".singleMovieBlock").on('click',function() {
		window.location='#movie+'+this.id;
	});

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

function singleActorBlockEvents() {
	var infoBlock;
	$("#Actors .singleActorBlock").hover(function() {
			infoBlock=$(this).find(':last-child')[0];

			$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

		},
		function(){
			$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
				function(){
					$(this).css({visibility: "hidden",height : '100px'});

				});
		});

	$("#Actors .singleActorBlock,#singleMovie .singleActorBlock").on('click',function() {
		window.location ='#actor+' + this.id;
	});
}

function faBlockEvents() {
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
				});
		});

	$(".favMovieImg,.favInfoBlock ").on('click', function () {
		window.location='#movie+'+ ($(this).parent().attr('fav-id'));
		return;
	});

	$('.favDelBtn').on('click', function () {
		delFavMovie($(this).parent().attr('fav-id'));
		$(this.parentNode).animate({
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
	//func that sets search-events for elements of movie-page
	(function () {
		function searchRate(){
			var rate = $(this).children('span').text();
			window.location = '#' + 'movies-with-rates+' + rate;
		};
	    function searchYear(){
			var year = $(this).children('span').text();
			window.location = '#' + 'movies-with-year+' + year;
		};
		function searchGenre(){
			var genreName = $(this).children('span').text();
			var genreId = $(this).children('span').data('genre');
			window.location = '#' + 'movies-with-genre+' + genreId + '+' + genreName;
		};
		function showMovie(){
			var movieId = $(this).data('id');
			window.location = '#' + 'movie+' + movieId;
		};
		$('#singleMovie').on('click', '.search-rate', searchRate);
	    $('#singleMovie').on('click', '.search-year', searchYear);
	    $('#singleMovie').on('click', '.search-genre', searchGenre);
	    $('#singleMovie').on('click', '.similar', showMovie);
	})();

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
	    if (direction == 'previous' && imagesRight > step) {
	        nextArrow.removeClass('next-unable').addClass('next-able');
	        img_cont.stop().animate({"right": "-=" + step + "px" }, "slow","linear")
	    } else if (direction == 'previous' && imagesRight <= step && imagesRight > 0) {
	        prevArrow.removeClass('prev-able').addClass('prev-unable');
	        img_cont.stop().animate({"right": "-=" + imagesRight + "px" }, "slow","linear")
	    };
	    if (direction =='next' && lastStep > step) {
	        prevArrow.removeClass('prev-unable').addClass('prev-able');
	        img_cont.stop().animate({"right": "+=" + step + "px"}, "slow", "linear")
	    } else if (direction =='next' && lastStep <= step) {
	        nextArrow.removeClass('next-able').addClass('next-unable');
	        img_cont.stop().animate({"right": "+=" + lastStep + "px"}, "slow", "linear")
	    };
	    return;
	}

};  

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

