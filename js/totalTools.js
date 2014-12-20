/**
 * Created by Daryl on 20.12.2014.
 */

function customAlert(massage) {
    var defMsg =' Attention!!!';

    if(document.getElementById('customAlert')){
        $('#customAlert').remove();
    }

    $('body').append('<div id="customAlert"><p>' + (massage || defMsg) + '</p></div>');
    $('#customAlert').animate({opacity : 1},1000,function() {
        setTimeout(function(){
            $('#customAlert').animate({opacity : 0},1000,function(){
                $('#customAlert').remove();
            });

        },1000);


    });

}