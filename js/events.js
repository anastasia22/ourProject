/**
 * Created by Daryl on 03.12.2014.
 */
 //adds all events handlers to menu buttons
(function(){
	$('#mainMenu').on('click',handlEvent);
	$('#callSearch').on('click',function() {
		if(!document.getElementById('searchWrapper')) {
			addSearchPanel();
			$('#searchWrapper').animate({height: '150px', opacity: 1}, 400);
		}else {
			$('#searchWrapper').animate({height: '0px', opacity: 0}, 400,function(){
				$('#searchWrapper').remove();
			});

		}
	});
})();
function searchBy() {
	$('.search-button').on('click',function() {
		$('#mainContent').find(':first-child').remove();
		if($('input[name=factor]:checked').val() == 'Title'){
			searchByTitle();
		} else {
			searchByActor();
		}
	});
}
// menu event handlers
function handlEvent(event) {
	var target=event.target || event.srcElement;
	var menu={'menuHome' : homeTemplate, 'menuMovies' : defaultMovies,'menuHelp' : getHelp,
	'subMenuPop':mostPopular,'subMenu2013':mostPopular2013,'subMenuKids':popular4Kids,'subMenuComedy':mostPopularComedies};

	for (var temp in menu) {
		if(temp == target.id) {
			$('#mainContent').find(':first-child').remove();
			window.location='#' + temp;
			//menu[temp]();
		}
	}

}



//single movie block slide out handler
function addEvents() {
	var infoBlock;

	$(".singleMovieBlock").on('click',function() {
		window.location='#movie+'+this.id;
		/*showOneMovie(this.id);
		$(window).scrollTop(0);*/
	});

	$(".singleMovieBlock").hover(function() {
		infoBlock=$(this).find(':last-child')[0];

		$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

	},
	function(){
		$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
		 	function(){		 
		 	$(this).css({visibility: "hidden",height : '100px'});

		 })
	});
	
}

function addEventsToActors() {
	var infoBlock;
	$(".singleActorBlock").hover(function() {
			infoBlock=$(this).find(':last-child')[0];

			$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

		},
		function(){
			$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
				function(){
					$(this).css({visibility: "hidden",height : '100px'});

				});
		});

	$(".singleActorBlock").on('click',function() {

		createBlock();
		$('body').css('overflow','hidden');
		//$('body').css('position','fixed');
		$('#offOnBtn').on('click',deleteBlock);
		window.location ='#actor+' + this.id;

		$('#Actor').append('<div id="loaderImage"></div>');
		new imageLoader(cImageSrc, 'startAnimation()');
	});
}

//slider for singleMoviePage

function createCarousel(){
	var images=$('.img-container').find('.screenshot');
    var imageContainer = $('.img-container');
    var prevArrow = $('.prev-ar');
	var nextArrow = $('.next-ar');
	function scrollCarousel(){
	    var imagesWidth = parseInt($('.img-container').css('width'));
	    var sliderWidth = parseInt($('.slider').css('width'));
	    var imagesRight = parseInt($('.img-container').css('right'));
	    var step = images.outerWidth(true);
	    var direction=$(this).data('direction');
	    var diffWidth = imagesWidth - sliderWidth;
	    var lastStep = diffWidth - imagesRight;
	    if (direction == 'previous' && imagesRight > step) {
	        nextArrow.removeClass('next-unable').addClass('next-able');
	        imageContainer.stop().animate({"right": "-=" + step + "px" }, "slow","linear")
	    } else if (direction == 'previous' && imagesRight <= step && imagesRight > 0) {
	        prevArrow.removeClass('prev-able').addClass('prev-unable');
	        imageContainer.stop().animate({"right": "-=" + imagesRight + "px" }, "slow","linear")
	    };
	    if (direction =='next' && lastStep > step) {
	        prevArrow.removeClass('prev-unable').addClass('prev-able');
	        imageContainer.stop().animate({"right": "+=" + step + "px"}, "slow", "linear")
	    } else if (direction =='next' && lastStep <= step) {
	        nextArrow.removeClass('next-able').addClass('next-unable');
	        imageContainer.stop().animate({"right": "+=" + lastStep + "px"}, "slow", "linear")
	    };
	    return
	}
    var totalLength = (parseInt(images.css('width')) + parseInt(images.css('margin-left')) + parseInt(images.css('margin-right'))) * images.length;
    imageContainer.css({'width': totalLength,'right':0});
    $('.carousel').on('click','.control', scrollCarousel);

};  

//toggle for help page
function toggleHelp(){
	$('#Help').on('click', '.question', function(){
		$(this).next().slideToggle("fast")
	});
}



function showLightRoom(numb){
	function createModal() {
		var mask = $('#mask');
		var modwin = $('#modwin');
	    var winH = $(window).height();
	    var winW = $(window).width();
	    modwin.css('top', winH/2-modwin.height()/2);
	    modwin.css('left', winW/2-modwin.width()/2);
	    mask.fadeIn(400);    
	    mask.fadeTo("slow",0.9);    
	    modwin.fadeIn(2000); 
	    mask.click(function () {
	        mask.hide();
	        modwin.hide();
    	});   
	}
	createModal() 
	var imageContainer = $('.limg-container');
	var images=$('.limg-container').find('.lscreenshot');
	var step = images.outerWidth(true);
	var totalLength = parseInt(images.css('width')) * images.length;
	imageContainer.css({'width': totalLength,'right': numb*step});
	$('#modwin').on('click','.lcontrol',scrollSlider);
	$('#modwin').on('click','.lscreenshot',scrollSlider);

    		function scrollSlider(){
				var prevArrow = $('#modwin').find($('.prev-ar'));
				var nextArrow = $('#modwin').find($('.next-ar'));
			    var imagesWidth = parseInt($('.limg-container').css('width'));
			    var sliderWidth = parseInt($('.lslider').css('width'));
			    var imagesRight = parseInt($('.limg-container').css('right'));
			    
			    var direction=$(this).data('direction');
			    var difference = imagesWidth - imagesRight ;
			    if (direction == 'previous' && step <= imagesRight) {
			    	nextArrow.removeClass('next-unable').addClass('next-able');
			        imageContainer.stop().animate({"right": "-=" + step + "px" }, "slow","linear");
			    } else if (direction == 'previous' && imagesRight == 0 ){
			    	prevArrow.removeClass('prev-able').addClass('prev-unable');
			    };
			    if (direction == 'next' && step < difference) {
			        prevArrow.removeClass('prev-unable').addClass('prev-able');
			        imageContainer.stop().animate({"right": "+=" + step + "px"}, "slow", "linear");
			        console.log(imagesRight)
			    } else if (direction =='next' && step == difference){
			    	nextArrow.removeClass('next-able').addClass('next-unable');
			    };
			    return
			};        

}

// events to scroll top btn

function toTopBtnEvents() {
	$('#scrollTopBtn').on('click',function(){
		$(window).scrollTop(0);
		window.location='#' + document.URL.split('#')[1];
		this.remove();
	});
}

