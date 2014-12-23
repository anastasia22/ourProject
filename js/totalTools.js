
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

function onToTopBtn() {
    $(document).on('mousewheel',function(event) {
        if($(window).scrollTop() >= $(window).height() * 2) {
            if(!document.getElementById('scrollTopBtn')) {
                $('body').append('<div id="scrollTopBtn" class="toTopBtn"><p class="scrolP">TO TOP</p></div>');
                toTopBtnEvents();
            }
        }
        if($(window).scrollTop() <= $(window).height() * 2) {
            if(document.getElementById('scrollTopBtn')) {
                $('#scrollTopBtn').remove();
            }
        }
    });
}


function checkOnLoad() {
    if(!document.URL.split('#')[1]) {
        window.location = '#menuHome';
    }
}



var cSpeed=9;
var cWidth=100;
var cHeight=100;
var cTotalFrames=12;
var cFrameWidth=200;
var cImageSrc='images/preload.gif';

var cImageTimeout=false;
var cIndex=0;
var cXpos=0;
var cPreloaderTimeout=false;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){

    document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
    document.getElementById('loaderImage').style.width=cWidth+'px';
    document.getElementById('loaderImage').style.height=cHeight+'px';

    //FPS = Math.round(100/(maxSpeed+2-speed));
    FPS = Math.round(100/cSpeed);
    SECONDS_BETWEEN_FRAMES = 1 / FPS;

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);

}

function continueAnimation(){

    cXpos += cFrameWidth;
    //increase the index so we know which frame of our animation we are currently on
    cIndex += 1;

    //if our cIndex is higher than our total number of frames, we're at the end and should restart
    if (cIndex >= cTotalFrames) {
        cXpos =0;
        cIndex=0;
    }

    if(document.getElementById('loaderImage'))
        document.getElementById('loaderImage').style.backgroundPosition=(-cXpos) + 'px 0';

    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES * 1000);
}

function stopAnimation(){//stops animation
    clearTimeout(cPreloaderTimeout);
    cPreloaderTimeout=false;
}

function imageLoader(s, fun)//Pre-loads the sprites image
{
    clearTimeout(cImageTimeout);
    cImageTimeout=0;
    genImage = new Image();
    genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
    /*genImage.onerror=*//*customAlert('Could not load the image.');*//*new Function('alert(\'Could not load the image\')');*/
    genImage.src=s;
}