$(function() { 
    var state = true, frm;
    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#mainMenu');
    
    
    
    
    $('#callSearch').click(function() {
    if (state) {
        $('#searchWrapper').animate({
            'height': '100px',
            'opacity': '1',
            'margin-bottom': '10px'
        }, 500);
    } else {
         $('#searchWrapper').animate({
            'height': '0px',
            'opacity': '0',
             'margin-bottom': '0px'
        }, 500);
    }
    state = !state;
    });
});
















