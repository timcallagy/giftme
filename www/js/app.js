// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    WishlistView.prototype.template = Handlebars.compile($("#wishlist-tpl").html());
    FriendsView.prototype.template = Handlebars.compile($("#friends-tpl").html());
    FriendWishlistView.prototype.template = Handlebars.compile($("#friend-wishlist-tpl").html());
    AddGiftView.prototype.template = Handlebars.compile($("#add-item-tpl").html());
    PayPageView.prototype.template = Handlebars.compile($("#pay-page-tpl").html());

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
            wishlistView = new WishlistView();
            wishlistView.render();
            slider.slidePage(wishlistView.$el);
            // slider.slidePage(new WishlistView(service).render().$el);
        });
        router.addRoute('friends/', function() {
            slider.slidePage(new FriendsView(service).render().$el);
        });
        router.addRoute('friend-wishlist/:id/', function(id) {
            friendWishlistView = new FriendWishlistView(service, id);
            friendWishlistView.render();
            slider.slidePage(friendWishlistView.$el);
            //slider.slidePage(new FriendWishlistView(service, id).render().$el);
        });
        router.addRoute('addGift/', function() {
            addGiftView = new AddGiftView();
            addGiftView.render();
            slider.slidePage(addGiftView.$el);
        });
        // pk is the gift's id in the database.
        router.addRoute('pay-page/:id/:pk/', function(id, pk) {
            payPageView = new PayPageView(service, id, pk);
            payPageView.render();
            slider.slidePage(payPageView.$el);
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
        
        window.alert(window.stripe);

    }, false);

    // This function must be structured this way to allow the button to fire multiple click events.
    $(function() {
        return $("body").on("click", "#add-gift-btn", function() {
            form = $('#add-gift-form').serialize();
            url = 'https://giftmeserver.herokuapp.com/add_gift/';
            //url = 'http://127.0.0.1:8000/add_gift/';
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form,
                success: function(data) {
                    // data == false if the gift was not successfully added.
                    if (data == false ) {
                        $('#price-error').show();
                    } else {
                        $('#price-error').hide();
                        // Reload so that the form can be submitted again.
                        addGiftView = new AddGiftView();
                        addGiftView.render();
                        slider.slidePage(addGiftView.$el);
                        window.location.redirect = "#wishlist/";
                        href = window.location.href;
                        window.location.href = href.slice(0, href.indexOf("#")) + "#wishlist/";
                        window.location.reload();
                    }
                },
                error: function() {
                    console.log('Error');
                }
            });
        });
    });
}());

function delete_gift(pk) {
    gift = $("#gift-" + pk);
    form = $("#delete-gift" + pk + "-form");
    url = "https://giftmeserver.herokuapp.com/delete_gift/";
    //url = "http://127.0.0.1:8000/delete_gift/";
    $.ajax({
        url: url + pk + "/",
        type: 'post',
        data: form,
        success: function() {
            gift.hide();
            console.log('Success');
            console.log(gift);
        },
        error: function() {
            gift.hide();
            console.log('Error');
            console.log(gift);
        }
    });
}

var handler = StripeCheckout.configure({
    key: 'pk_test_iQi63h5Zd5LyKJGOMGUYxRvp',
    image: 'img/logo.png',
    token: function(token) {
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
        console.log(token);
    }
});

$('#pay-btn').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'GiftMe',
      description: 'Some gift',
      currency: "eur",
      amount: 20
    });
    e.preventDefault();
});

$(window).on('popstate', function() {
    handler.close();
});
