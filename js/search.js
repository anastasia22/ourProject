//search visualisation
$(function () {
    var state = true,
        frm;
    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#header');

    frm = $('<form>');

    frm.append('<input id="searchField" type="text" placeholder="Search..." class="search-input"><input type="radio" name="factor" value="Title" class="search-radio" id="movieTitle" checked="checked"><label id="SOME" for="movieTitle">Movie title</label><input type="radio" name="factor" value="" class="search-radio" id="actors"><label for="actors">Actors</label><input type="radio" name="factor" value="" class="search-radio" id="advanced"><label for="advanced">Advanced</label><button class="search-button">GO!</button>');
    $('#searchWrapper').append(frm);
    $('form').submit(function (event) {
        event.preventDefault();
    });
    funC();
    var labels = document.getElementsByTagName('label');
    labels[0].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';
    labels[1].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';


    //Toggle visibility of search block
    $('#callSearch').click(function () {
        var expandedHight = 100, collapsedHeight = 0;
        if (state) {
            
            $('#searchWrapper').animate({
                'height': expandedHight + 'px',
                'opacity': '1'
            }, 300);
            favSectionTop(expandedHight);
        } else {
            $('#searchWrapper').animate({
                'height': collapsedHeight + 'px',
                'opacity': '0',
                'margin-bottom': '0px'
            }, 300);
            favSectionTop(collapsedHeight);
        }
        state = !state;
        
        //correct a top position of favSection due to searchWpapper height
        function favSectionTop(height) {
            var totalHight, headerHeight = document.getElementById('header').offsetHeight;
            totalHight = headerHeight + height + 'px';
            if ($('#favSection')) {
                $('#favSection').animate({
                    'top': totalHight
                }, 300);
            }
        }
    });
});


$('.search-radio-text').click(function () {

});