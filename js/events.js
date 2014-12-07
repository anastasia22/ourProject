/**
 * Created by Daryl on 03.12.2014.
 */
 //adds all events handlers to menu buttons
(function(){
	$('#mainMenu').on('click',handlEvent);
})();

// menu event handlers
function handlEvent(event) {
	var target=event.target || event.srcElement;
	var menu={'menuHome' : homeTemplate, 'menuMovies' : defaultMovies,'menuHelp' : helpTemplate,
	'subMenuPop':mostPopular,'subMenu2013':mostPopular2013,'subMenuKids':popular4Kids,'subMenuComedy':mostPopularComedies};

	for (var temp in menu) {
		if(temp == target.id) {
			$('#mainContent').find(':first-child').remove();
			menu[temp]();
		}
	}

}



//single movie block slide out handler
function addEvents() {
	$(".singleMovieBlock").on('click',function() {
		singleMoviePage(this.id);
	});

	$(".singleMovieBlock").hover(function() {
		$(this).find(':last-child').stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);
	},
	function(){
		 $(this).find(':last-child').stop(false,false).animate({height: '0px'}, 700,
		 	function(){		 
		 	$(this).css({visibility: "hidden",height : '100px'});
		 })
	});
	
}