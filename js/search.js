//search visualisation
$(function() { 
    var state = true, frm;
    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#header');
    
    frm = document.createElement('form');
    
    
    $('#searchWrapper').append(frm);
    
    //Toggle visibility of search block
    $('#callSearch').click(function() {
    if (state) {
        $('#searchWrapper').animate({
            'height': '100px',
            'opacity': '1',
            'margin-bottom': '10px'
        }, 300);
    } else {
         $('#searchWrapper').animate({
            'height': '0px',
            'opacity': '0',
             'margin-bottom': '0px'
        }, 300);
    }
    state = !state;
    });
});
















