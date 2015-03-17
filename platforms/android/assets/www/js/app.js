// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    WishlistView.prototype.template = Handlebars.compile($("#wishlist-tpl").html());
    FriendsView.prototype.template = Handlebars.compile($("#friends-tpl").html());
    FriendWishlistView.prototype.template = Handlebars.compile($("#friend-wishlist-tpl").html());
    AddItemView.prototype.template = Handlebars.compile($("#add-item-tpl").html());
    var slider = new PageSlider($('body'));
    var service = new GiftService();
    service.initialize().done(function () {
        console.log("Service initialized");
        router.addRoute('', function() {
            slider.slidePage(new LoginView().render().$el);
        });
        router.addRoute('home/', function() {
              homeView = new HomeView();
              homeView.render();
              slider.slidePage(homeView.$el);
        });
        router.addRoute('wishlist/', function() {
            slider.slidePage(new WishlistView(service).render().$el);
        });
        router.addRoute('friends/', function() {
            slider.slidePage(new FriendsView(service).render().$el);
        });
        router.addRoute('friend-wishlist/:id/', function(id) {
            slider.slidePage(new FriendWishlistView(service, id).render().$el);
        });
        router.addRoute('addItem/', function() {
            slider.slidePage(new AddItemView(service).render().$el);
        });

        router.start();
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

    Handlebars.registerHelper('trueFalse', function(v1, options) {
          if(v1 == "false" ) {
              console.log("1");
                console.log(options.inverse(this));
              return options.fn(this);
          }
              console.log("2");
                console.log(options.inverse(this));
          return options.inverse(this);
    });

}());
