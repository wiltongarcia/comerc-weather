var app = {
    location: 'São Paulo, SP'
};

app.initialize = function () {
    $('#clock').clock({'calendar':'false', 'format':24});
};


app.initialize();
