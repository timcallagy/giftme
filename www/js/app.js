// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    WishlistView.prototype.template = Handlebars.compile($("#wishlist-tpl").html());
    ContributionsView.prototype.template = Handlebars.compile($("#contributions-tpl").html());
    FriendsView.prototype.template = Handlebars.compile($("#friends-tpl").html());
    FriendWishlistView.prototype.template = Handlebars.compile($("#friend-wishlist-tpl").html());
    AddGiftView.prototype.template = Handlebars.compile($("#add-item-tpl").html());
    GiveGiftView.prototype.template = Handlebars.compile($("#give-gift-tpl").html());
    PayPageView.prototype.template = Handlebars.compile($("#pay-page-tpl").html());
    PaymentConfirmationView.prototype.template = Handlebars.compile($("#payment-confirmation-tpl").html());
    ErrorView.prototype.template = Handlebars.compile($("#error-tpl").html());
    SettingsView.prototype.template = Handlebars.compile($("#settings-tpl").html());
    Handlebars.registerPartial("bottom-menu", $("#bottom-menu").html());

    var slider = new PageSlider($('body'));
    var service = new GiftService();

    service.initialize().done(function () {
        console.log("Service initialized");
        router.addRoute('login/', function() {
            slider.slidePage(new LoginView().render().$el);
        });
        router.addRoute('home/', function() {
            homeView = new HomeView();
            homeView.render();
            slider.slidePage(homeView.$el);
            $("[id^=menu]").removeClass("active");
            $("#menu-home").addClass("active");
        });
        router.addRoute('wishlist/', function() {
            wishlistView = new WishlistView();
            wishlistView.render();
            slider.slidePage(wishlistView.$el);
        });
        router.addRoute('contributions/:pk/', function(pk) {
            contributionsView = new ContributionsView(pk);
            contributionsView.render();
            slider.slidePage(contributionsView.$el);
        });
        router.addRoute('friends/', function() {
            friendsView = new FriendsView();
            friendsView.render();
            slider.slidePage(friendsView.$el);
            $("[id^=menu]").removeClass("active");
            $("#menu-friends").addClass("active");
        });
        router.addRoute('friend-wishlist/:id/', function(id) {
            friendWishlistView = new FriendWishlistView(id);
            friendWishlistView.render();
            slider.slidePage(friendWishlistView.$el);
        });
        router.addRoute('addGift/', function() {
            addGiftView = new AddGiftView();
            addGiftView.render();
            slider.slidePage(addGiftView.$el);
        });
        // pk is the gift's id in the database.
        router.addRoute('give-gift/:id/:pk/', function(id, pk) {
            giveGiftView = new GiveGiftView(id, pk);
            giveGiftView.render();
            slider.slidePage(giveGiftView.$el);
        });
        // pk is the gift's id in the database.
        router.addRoute('pay-page/:id/:pk/', function(id, pk) {
            payPageView = new PayPageView(service, id, pk);
            payPageView.render();
            slider.slidePage(payPageView.$el);
        });
        // pk is the gift's id in the database.
        router.addRoute('payment-confirmation/', function() {
            paymentConfirmationView = new PaymentConfirmationView();
            paymentConfirmationView.render();
            slider.slidePage(paymentConfirmationView.$el);
        });
        router.addRoute('error/', function() {
            slider.slidePage(new ErrorView().render().$el);
        });
        router.addRoute('settings/', function() {
            settingsView = new SettingsView();
            settingsView.render();
            slider.slidePage(settingsView.$el);
        });

        router.start();

        if (!window.cordova) {
            var init = function () {
                if (typeof facebookConnectPlugin != 'undefined'){
                    facebookConnectPlugin.browserInit('1533444716908405');
                } else {
                    setTimeout(init, 500);
                }
            }
            setTimeout(init, 3000);
        }
        var getStatus = function () {
            if (typeof facebookConnectPlugin != 'undefined'){
                facebookConnectPlugin.getLoginStatus(
                        function (response) {
                            $.ajax({
                                url: backend_url + 'wakeup/',
                                type: 'post',
                                data: {'clientVersion': '0.0.21'}, 
                                success: function(data) {
                                    console.log('Received response from version check.');
                                    if ( data == 'Success' ) {
                                        console.log('Version is supported.') 
                                if (response.status == "unknown") {
                                    loginView = new LoginView();
                                    loginView.render();
                                    slider.slidePage(loginView.$el);
                                } else {
                                    homeView = new HomeView();
                                    homeView.render();
                                    slider.slidePage(homeView.$el);
                                    authResponse = response.authResponse;
                                    window.localStorage.setItem("accessToken", authResponse.accessToken);
                                    window.localStorage.setItem("userID", authResponse.userID);
                                    $.ajax({
                                        url: backend_url + 'login/',
                                        type: 'post',
                                        dataType: 'json',
                                        data: {'accessToken': authResponse.accessToken, 'expiresIn': authResponse.expiresIn, 'userID': authResponse.userID}, 
                                        success: function() {
                                            console.log('success...');
                                        },
                                        error: function() {
                                            console.log('Error...');
                                        }
                                    });
                                }       
                                    }
                                    else {
                                        errorView = new ErrorView();
                                        errorView.render(data);
                                        slider.slidePage(errorView.$el);
                                        console.log(data);
                                        data = JSON.parse(data);
                                        $('#custom-error').html('&nbsp;' + data['message']);
                                        $('#error-url').html('&nbsp;<a href=\'' + data['url'] + '\'>' + data['url'] + '</a>');
                                    }
                                },
                                error: function(data) {
                                    console.log('Error');
                                    errorView = new ErrorView();
                                    errorView.render(data);
                                    slider.slidePage(errorView.$el);
                                    $('#custom-error').html('&nbsp;Server not responding.' + data);
                                }
                            });
                        },
                                 function (response) { 
                                     $.ajax({
                                         url: backend_url + 'wakeup/',
                                     type: 'post',
                                     data: {'clientVersion': '0.0.21'}, 
                                     success: function(data) {
                                         console.log('Received response from version check.');
                                         if ( data == 'Success' ) {
                                             console.log('Version is supported.') 
                                         loginView = new LoginView();
                                     loginView.render();
                                     slider.slidePage(loginView.$el);
                                         }
                                         else {
                                             errorView = new ErrorView();
                                             errorView.render(data);
                                             slider.slidePage(errorView.$el);
                                             console.log(data);
                                             data = JSON.parse(data);
                                             $('#custom-error').html('&nbsp;' + data['message']);
                                             $('#error-url').html('&nbsp;<a href=\'' + data['url'] + '\'>' + data['url'] + '</a>');
                                         }
                                     },
                                     error: function(data) {
                                         console.log('Error');
                                         errorView = new ErrorView();
                                         errorView.render(data);
                                         slider.slidePage(errorView.$el);
                                         $('#custom-error').html('&nbsp;Server not responding.' + data);
                                     }
                                     });

                                 }
                );
            } else {
                console.log('facebookConnectPlugin not ready');
                setTimeout(getStatus, 500);
            }
        }
        getStatus();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function() {
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
    }, false);

}());
