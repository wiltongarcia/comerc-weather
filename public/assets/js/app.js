app.weather = function () {
    $("#container-degress").hide();
    $("#container-news").hide();
    $("#container-image").show();
    if (app.newsInterval) {
        window.clearInterval(app.newsInterval);
    }
    $.ajax({
        method: 'GET',
        url: '/api/weather',
        data: { 'location': app.location},
        dataType: 'json',
        success: app.news
    });
};

app.news = function (data) {
    app.weatherData = data;
    $.ajax({
        method: 'GET',
        url: '/api/news',
        dataType: 'json',
        success: app.loadNews
    });
};

app.loadNews = function (data) {
    $('#container-news').html('');
    for (var i = 0, l = data.news.length; i < l; i++) {
        $('#container-news').append($('<div class="item"><h3>' + data.news[i].title + '</h3><p>' + data.news[i].description + '</p></div>'));
    };
    window.setTimeout( app.show, 300);
};


app.show = function () {
    data = app.weatherData;
    $('#degress').html(app.weatherData.temp + '&deg;')
    $('#temp-image').attr('src', 'http://l.yimg.com/a/i/us/we/52/' + app.weatherData.code + '.gif')
    $("#container-image").hide();
    $("#container-degress").show();
    app.newsInterval = window.setInterval(
        (function (){ 
            var i = 0, l = $('#container-news .item').length;
            $("#container-news").show();
            $('#container-news .item').hide();
            $($('#container-news .item')[i++]).show();
            return function (){
                $('#container-news .item').hide();
                $($('#container-news .item')[i]).animate({
                      opacity: "show"
                }, 800, function () {
                    $($('#container-news .item')[i++]).show();
                    if (i>=l) {
                        i = 0;
                    }
                });
            }
        })()    
    , 5000);
};

app.initialize = function () {
    $('#clock').clock({'calendar':'false', 'format':24, 'timestamp':servertime});
    app.weather();
    window.setInterval(app.weather, 900000);
};


app.initialize();
