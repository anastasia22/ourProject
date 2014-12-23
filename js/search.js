//search visualisation
function addSearchPanel() {
    var frm = '';

    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#header');

    frm = '<form><input id="searchField" type="text" placeholder="Search..." class="search-input">' +
        '<div class="label-wrapper"><input type="radio" name="factor" value="Title" class="search-radio" id="movieTitle" checked="checked">' +
        '<label class="search-radio-label border-right" id="SOME" for="movieTitle">Movie title</label>' +

    '<input type="radio" name="factor" class="search-radio" id="actors">' +
        '<label class="search-radio-label border-right" for="actors">Actors</label>' +

    '<input type="radio" name="factor" class="search-radio" id="advanced">' +
        '<label class="search-radio-label" id="advSearch" for="advanced">Advanced</label></div>' +

    '<button class="search-button">FIND</button><div class="clear-fix" style="clear: both;"></div></form>';

    $('#searchWrapper').append(frm);
    $('form').submit(function (event) {
        event.preventDefault();
    });
    searchBy();
    //advanced search event
    $('input[name="factor"]:radio').click(function () {
        controlAdvanced();
    });


}



//toggle div for adv search and move properly fav section
function controlAdvanced() {
    if ($('#advanced').prop('checked') == true) {
        return (function () {
            $('#searchWrapper').find(':first-child').animate({
                opacity: 0
            }, 300, function () {
                $('#searchWrapper').find(':first-child').remove();
                addAdvanced();
            });


        })();
    } else {
        return (function () {
            $('#advancedWrapper').animate({
                opacity: '0'
            }, 500, function () {
                $('#advancedWrapper').remove();
            });

        })();
    }
}


function addAdvanced() {

    var searchwrap = document.getElementById('searchWrapper');
    var advwrap = document.getElementById('advancedWrapper');

    if ($.contains(searchwrap, advwrap)) {
        return false;
    } else {
            getGenres();
    }
}



function paintAdvanced(data) {
    var genres;
    var actors = {
        500: 'Tom Cruise',
        31: 'Tom Hanks',
        85: 'Johny Depp',
        1158: 'Al Pacino',
        819: 'Edward Norton',
        56731: 'Jessica Alba',
        38406: 'Paris Hilton',
        4173: 'Anthony Hopkins',
        206: 'Jim Carrey',
        10297: 'Matthew McConaughey',
        51329: 'Bradley Cooper',
        190: 'Clinton Eastwood',
        6968: 'Hugh Jackman',
        9642: 'Jude Law',
        2461: 'Mel Gibson',
        2231: 'Samuel L. Jackson',
        5292: 'Denzel Washington',
        524: 'Natalie Portman',
        976: 'Jason Statham',
        3131: 'Antonio Banderas',
        287: 'Brad Pitt',
        1892: 'Matt Damon',
        6193: 'Leonardo DiCaprio',
        6949: 'John Malkovich',
        11856: 'Daniel Day-Lewis',
        1532: 'Bill Murray',
        2228: 'Sean Penn',
        3223: 'Robert Downey Jr.',
        3084: 'Marlon Brando',
        4483: 'Dustin Hoffman',
        1979: 'Kevin Spacey',
        204: 'Kate Winslet',
        139: 'Uma Thurman',
        1245: 'Scarlett Johansson',
        11701: 'Angelina Jolie',
        16644: 'Dolph Lundgren',
        8891: 'John Travolta',
        18897: 'Jackie Chan',
        12835: 'Vin Diesel',
        2888: 'Will Smith',
        62: 'Bruce Willis',
        2963: 'Nicolas Cage',
        4491: 'Jennifer Aniston',
        16483: 'Sylvester Stallone',
        17276: 'Gerard Butler',
        13240: 'Mark Wahlberg',
        8167: 'Paul Walker',
        6384: 'Keanu Reeves',
        6885: 'Charlize Theron',
        3896: 'Liam Neeson',
        1003: 'Jean Reno',
        380: 'Robert De Niro',
        934: 'Russell Crowe',
        72466: 'Colin Farrell',
        1844: 'Til Schweiger',
        10980: 'Daniel Radcliffe',
        192: 'Morgan Freeman',
        1100: 'Arnold Schwarzenegger',
        109: 'Elijah Wood',
        57755: 'Woody Harrelson',
        63312: 'Yvonne Strahovski',
        19292: 'Adam Sandler',
        28782: 'Monica Bellucci',
        84497: 'Aaron Paul'
    };
    var list = '';

    // genres
    list += '<div class="search-genres"><div class="cat-label">Genres</div>';
    $.each(data.genres, function (num, el) {
        list += '<div class="genre"><input type="checkbox" id="' + el.id +
            '" value="' + el.name + '"><label for="' + el.id + '">' + el.name + '</label></div>';
    });
    list += '</div>';
    ///

    //actors
    list += '<div class="search-selects"><div class="cat-label">Actors</div>';
    list += '<select id="actorSelect" class="select"><option class="selActors" selected="selected">Select actor</option>';
    for (var actor in actors) {
        list += '<option class="selActors" id="' + actor + '">' + actors[actor] + '</option>';
    }
    list += '</select>';
    //////



    // relise year
    list += '<div class="cat-label">Year</div><select id="yearSelect" class="select"><option class="selAYear" selected="selected">Year</option>';
    var nextYear = (new Date().getFullYear()) + 1;
    for (var i = nextYear; i >= 1960; i--) {
        list += '<option class="selYear" id="' + i + '">' + i + '</option>'
    }
    list += '</select>';


    // sorting select
    list += '<div class="cat-label">Sort by</div><select id="voteSelect" class="select">' +
        '<option value="popularity.desc" name="sort">popularity 9 &#8680; 0</option>' +
        '<option value="popularity.asc" name="sort">popularity 0 &#8680; 9</option>' +
        '<option value="vote_average.desc" name="sort">vote average 9 &#8680; 0</option>' +
        '<option value="vote_average.asc" name="sort">vote average 0 &#8680; 9</option>' +
        '</select>';
    list += '</div>';
    /////



    $('#searchWrapper').find(':first-child').remove();

    list += '<div class="srch-buttons-wrapper"><button id="toSimple">BACK<br></button>' +
        '<button id="advSearchBtn" class="search-button">SEARCH</button></div>' +
        '<div style="clear: both; margin-top: 10px;"></div>';
    $('<div>', {
        id: 'advancedWrapper',
        style: 'clear: both;',
        html: list
    }).appendTo('#searchWrapper').css({
        opacity: 0
    }).animate({
        opacity: 1
    }, 200);
    searchBtnEvents();
    favSectionTop();
    // REMOVE ADVANCED AND CREATE SIMPLE SEARCH
    $('#toSimple').click(function () {
        $('#advancedWrapper').animate({
            height: 'toggle',
            opacity: '0'
        }, 'slow', function () {
            $('#advancedWrapper').remove();
            $('#searchWrapper').remove();
            addSearchPanel();
            $('#searchWrapper').css({
                opacity: '1'
            });
            favSectionTop();
        });
    });
}

function searchBtnEvents() {
    $('#advSearchBtn').on('click', function () {
        var checkBoxes = $('.genre');
        var checked = [];
        var selectedActor = $('#actorSelect option:selected').attr('id');
        var selectYear = $('#yearSelect option:selected').attr('id')
        var url = 'discover/movie';
        // checking genres
        for (var i = 0; i < checkBoxes.length; i++) {
            if ($(checkBoxes[i]).find(':first-child').prop('checked') == true) {
                checked.push($(checkBoxes[i]).find(':first-child').attr('id'));
            }
        }

        if (checked.length != 0) {
            url += '?with_genres=' + checked.join(',');
        }
        /////


        // checking actor
        if (selectedActor) {
            url += '&with_cast=' + selectedActor;
        }
        //
        //year
        if (selectYear) {
            url += '&primary_release_year=' + selectYear;
        }
        ///
        
        if(url == 'discover/movie') {
            customAlert('Nothing was chosen.');
            return;
        }
        
        url += '&sort_by=' + $('input[name=sort]:checked').val();

        $('#advancedWrapper').animate({
            height: 'toggle',
            opacity: '0'
        }, 500, function () {
            $('#advancedWrapper').remove();
            $('#searchWrapper').remove();
            $('#mainContent').find(':first-child').remove();
            sendRequest(url, 'Combined search.', 'movies');
        });
    });
}
