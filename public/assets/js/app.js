var app = {
    location: 'São Paulo, SP'
};

app.weather = function () {
    $("#container-degress").hide();
    $("#container-image").show();
    $.ajax({
        method: 'GET',
        url: '/api/weather',
        data: { location: app.location},
        dataType: 'json',
        success: app.showWeather
    });
};

app.showWeather = function (data) {
    $('#degress').html(data.temp + '&deg;')
    $('#temp-image').attr('src', 'http://l.yimg.com/a/i/us/we/52/' + data.code + '.gif')
    $("#container-image").hide();
    $("#container-degress").show();
}



app.initialize = function () {
    $('#clock').clock({'calendar':'false', 'format':24});
    app.weather();
};


app.initialize();
