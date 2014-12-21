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

function onToTopBtn() {
    $(document).on('mousewheel',function() {
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

var MarkHamill={picture : 'news/Mark_Hamill.jpg', header : 'Mark Hamill Makes Surprise Appearance at Star Wars Live Reading',article : 'Mark Hamill sent Star Wars fans into a frenzy when he was revealed as the secret cast member ' +
'at the live reading of The Empire Strikes Back on Thursday night (18Dec14).' +
'Director and Live Read series organizer Jason Reitman had previously announced that Breaking Bad star Aaron Paul ' +
'would be playing Luke Skywalker and J.K. Simmons would portray Darth Vader at the performance in Los Angeles. ' +
'Reitman had kept the remainder of the cast a secret, and fans leaped to their feet and screamed when he introduced ' +
'Hamill, the original Luke Skywalker, onto the stage to play two roles - the evil Emperor Palpatine and Jedi warrior' +
' Obi Wan-Kenobi.' +
'The cast was rounded out by Jessica Alba as Princess Leia, Ellen Page as Han Solo, The Office star Rainn Wilson ' +
'as Chewbacca, and Stephen Merchant as C-3PO. Reitman contributed whistling and beeping noises as the R2-D2 droid.' +
'In the Live Read series, the cast is not allowed to prepare ahead of the performance and the actors first read the script onstage.'};

var NataliePortman = {picture : 'news/Natalie_Portman.jpg',header : 'Natalie Portman: \'Stars Wars hurt my career\'',article : 'Natalie Portman is' +
' convinced her performance in the Star Wars prequel trilogy damaged her career.'+
    'The Black Swan actress portrayed Padme Amidala, the love interest of Anakin Skywalker, in the prequel films from ' +
'1999 to 2005, but she struggled to find acting jobs afterwards as no director wanted to work with her.'+
        'Late filmmaker Mike Nichols, who died in November (14), had worked with Portman on stage play The Seagull and ' +
'tried to help her out by recommending her to his fellow directors, but they kept passing her off to colleagues.'+
        'Portman tells NY Magazine, "Star Wars had come out around the time of Seagull, and everyone thought I was a horrible ' +
'actress... I was in the biggest-grossing movie of the decade, and no director wanted to work with me.'+
        "Mike wrote a letter to Anthony Minghella and said, 'Put her in Cold Mountain, I vouch for her'. And then Anthony passed" +
'" me on to Tom Tykwer, who passed me on to the Wachowskis."' +
    'The Wachowski directing siblings cast her in 2006 thriller V for Vendetta.'+
        'Portman was nominated for an Academy Award in 2005 for her role in Nichols\' film Closer. She won the prize in 2011 for Black Swan.'};













var cSpeed=9;
var cWidth=100;
var cHeight=100;
var cTotalFrames=12;
var cFrameWidth=200;
var cImageSrc='images/712.gif';

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