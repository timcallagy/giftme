(function () {

    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());

    var slider = new PageSlider($('body'));

    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();

        },
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        // These lines fix the iOS7 status bar problem
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();    

        // This makes the app react faster to clicks
        FastClick.attach(document.body);

        if (navigator.notification) {
            window.alert = function (message) {
                navigator.notification.alert(
                        message,    // message
                        null,       // callback
                        "Workshop", // title
                        'OK'        // buttonName
                        );
            };
        }


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getInfo: function() {
        openFB.api({
            path: '/me',
        success: function(data) {
            console.log(JSON.stringify(data));
            document.getElementById("userName").innerHTML = data.name;
            document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
        },
        error: errorHandler});
    }

};

app.initialize();

router.addRoute('', function() {
    slider.slidePage(new LoginView().render().$el);
});
router.start();

router.addRoute('home', function() {
    slider.slidePage(new HomeView().render().$el);
});
router.start();

openFB.init({appId: '1533444716908405'});

$("[id^=login]").click(function(){
    openFB.login(
        function(response) {
            if(response.status === 'connected') {
                openFB.api({
                    path: '/me',
                    success: function(data) {
                        console.log(JSON.stringify(data));
                        /*$('#login').hide();
                          $('#logo').hide();
                          $('#userName').show();
                          document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                          $('#userPic').show();
                          $('#actions').show();
                          $('#logout').show();
                          */
                        var href = $('#gohome').attr('href');
                        window.location.href = href;
                        getInfo();
                    },
                    error: errorHandler});
            } else {
                alert('Facebook login failed: ' + response.error);
            }
        }, {scope: 'email,read_stream,publish_stream, user_friends'});
});

$("[id^=logout]").click(function(){
    openFB.logout(
        function() {
            /*alert('Logout successful');
              $('#userName').hide();
              $('#userPic').hide();
              $('#login').show();
              $('#actions').hide();
              $('#logout').hide();
              */
            var href = $('#gologout').attr('href');
            window.location.href = href;
        },
        errorHandler);
});



function getContacts() {
    var options = new ContactFindOptions();
    options.filter = "Tim";
    var fields = ["displayName", "name", "phoneNumbers"];
    navigator.contacts.find(fields, onSuccess, onError, options);

    function onSuccess(contacts){
        names = "";
        for (var i = 0; i < contacts.length; i++) {
            names = names + contacts[i].displayName + ": " + contacts[i].phoneNumbers[0].value;
        }
        alert(names);
    }
    function onError(){
        alert('error!');
    }
}


function getInfo() {
    openFB.api({
        path: '/me',
    success: function(data) {
        console.log(JSON.stringify(data));
        document.getElementById("userName").innerHTML = data.name;
        document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
    },
    error: errorHandler});
}


function errorHandler(error) {
    alert(error.message);
}

}());
