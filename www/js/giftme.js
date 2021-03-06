// If we are running in the live environment, use these variables.
if (!window.cordova) {
    var backend_url = 'http://127.0.0.1:8000/';
    Stripe.setPublishableKey('pk_test_iQi63h5Zd5LyKJGOMGUYxRvp');
    // else, use these variables.
} else {
    var backend_url = 'https://giftmeserver.herokuapp.com/'; 
        Stripe.setPublishableKey('pk_live_rzB00nH8Ua6HTGoh77BGXtuy');
}

var navigation_stack = new Array();

var counter = 0;

// Called when Facebook Login button on Login page is clicked.
function facebook_login(){
    $("#login-btn").attr("disabled", true);
    var checkFB = function(){
        if (typeof facebookConnectPlugin != 'undefined'){
            facebookConnectPlugin.login( ["email", "user_friends"],
                    function (response) { 
                        window.location="#home/";
                        authResponse = response.authResponse;
                        window.localStorage.setItem("accessToken", authResponse.accessToken);
                        window.localStorage.setItem("userID", authResponse.userID);
                        $.ajax({
                            url: backend_url + 'login/',
                            type: 'post',
                            dataType: 'json',
                            data: {'accessToken': authResponse.accessToken, 'expiresIn': authResponse.expiresIn, 'userID': authResponse.userID}, 
                            success: function() {
                            },
                            error: function() {
                                $("#login-btn").attr("disabled", false);
                            }
                        });
                    },
                    function (response) { 
                        $("#login-btn").attr("disabled", false);
                        window.location="#login/";
                    });
        } else {
            $("#login-btn").attr("disabled", false);
            console.log('FB NOT READY');
            setTimeout(checkFB, 500);
        }
    }
    checkFB();
}

// This button is for adding gifts.
// This function must be structured this way to allow the button to fire multiple click events.
$(function() {
    return $("body").on("click", "#add-gift-btn", function() {
        $('[id^=error]').hide();
        name = $('#gift-name').val();
        price = $('#gift-price').val();
        url = $('#gift-url').val();
        description = $('#gift-description').val();
        if (description.length > 5000){
            $('#error-description-error').show();
        }
        owner_id = $('#gift-owner-id').val();
        accessToken = window.localStorage.getItem("accessToken");
        userID = window.localStorage.getItem("userID");
        userName = window.localStorage.getItem("my_name");
        if (!name) {$('#error-name').show();return;}
        if (!price) {$('#error-price').show();return;}
        if (!url) {$('#error-url').show();return;}
        $.ajax({
            url: backend_url + 'add_gift/',
            type: 'post',
            dataType: 'json',
            data: {name: name, url: url, price: price, owner_id: owner_id, accessToken: accessToken, userID: userID, userName: userName, description: description},
            success: function(data) {
                // data == false if the gift was not successfully added.
                if (data == false ) {
                    $('#error-add').show();
                } else {
                    $('#error-add').hide();
                    $('#error-url').hide();
                    $('#error-price').hide();
                    window.location = "#wishlist/";
                }
            },
            error: function(response) {
                if (response.responseText == "Invalid URL") {
                    $('#error-add').hide();
                    $('#error-url').show();
                    $('#error-price').hide();
                    $('#error-not-amazon').hide();
                } else if (response.responseText == "Invalid amount") {
                    $('#error-add').hide();
                    $('#error-url').hide();
                    $('#error-price').show();
                    $('#error-not-amazon').hide();
                } else if (response.responseText == "Not Amazon") {
                    $('#error-add').hide();
                    $('#error-url').hide();
                    $('#error-price').hide();
                    $('#error-not-amazon').show();
                } else {
                    $('#error-add').show();
                    $('#error-url').hide();
                    $('#error-price').hide();
                    $('#error-not-amazon').hide();
                }
            }
        });
    });
});

// This is for the Delete button on wishlists.
function delete_gift(pk) {
    gift = $("#gift-" + pk);
    accessToken = window.localStorage.getItem("accessToken");
    userID = window.localStorage.getItem("id");
    $.ajax({
        url: backend_url + "delete_gift/" + pk + "/",
        type: 'post',
        data: {'accessToken': accessToken, 'userID': userID},
        success: function() {
            gift.remove();
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

// This is for the Credit Card button on the Give Gift page.
$(function() {
    return $("body").on("click", "#creditcard-btn", function() {
        $("#creditcard-btn").attr("disabled", true);
        $('#gift-message-error').hide();
        var friend_id = $('#friend-id').val();
        var gift_pk = $('#gift-pk').val();
        var amount = $('#amount').val();
        var message = $('#gift-message').val();
        if (message.length > 5000){
            $('#gift-message-error').show();
        }
        window.localStorage.setItem("amount", amount);
        window.localStorage.setItem("gift-message", message);
        $("#creditcard-btn").attr("disabled", false);
        window.location = "#pay-page/" + friend_id + "/" + gift_pk + "/";
    });
});

// This is for the Pay button on the Credit Card payment page.
$(function() {
    return $("body").on("click", "#pay-btn", function() {
        $("#pay-btn").attr("disabled", true);
        $('#payment-error').hide();
        $('#payment-failed-msg').hide();
        $('#pay-btn').hide();
        $('#processing-btn').show();

        var amount = $('#amount').val();
        var message = $('#gift-message').val();
        var provider = 'stripe';
        var card_number = $('#card-number').val();
        var card_cvc = $('#card-cvc').val();
        var expiry_month = $('#expiry-month').val();
        var expiry_year = $('#expiry-year').val();

        Stripe.card.createToken({
            number: card_number,
            cvc: card_cvc,
            exp_month: expiry_month,
            exp_year: expiry_year
        }, stripeResponseHandler);

        function stripeResponseHandler(status, response) {
            $("#pay-btn").attr("disabled", false);
            if (response.error) {
                $('#pay-btn').show();
                $('#processing-btn').hide();
                $('#payment-failed-msg').show();
                $('#payment-error').html(response.error.message);
                $('#payment-error').show();
            } else {
                var token = response.id;
                var contributor_id = localStorage.getItem("id");
                var accessToken = localStorage.getItem("accessToken");
                var contributor_name = localStorage.getItem("my_name");
                var contributed_to_name = $('#friend-name-payPage').val();
                var gift_pk = $('#gift-pk').val();
                var friend_id = $('#friend-id-payPage').val();
                $.ajax({
                    url: backend_url + 'pay_new/' + gift_pk + '/',
                    type: 'post',
                    dataType: 'json',
                    data: {token: token, amount: amount, message: message, contributor_id: contributor_id, accessToken: accessToken, timestamp: Date.now(), provider: provider},
                    success: function(data) {
                        if (data.indexOf('Error') > -1) {
                            $('#payment-failed-msg').show();
                            $('#payment-error').html("Something went wrong at GiftMe");
                            $('#payment-error').show();
                            $('#pay-btn').show();
                            $('#processing-btn').hide();
                            console.log('Error');
                        } else {
                            window.localStorage.setItem("contribution", JSON.stringify(data));
                            window.location = "#payment-confirmation/";
                        }
                    },
                    error: function() {
                        $('#payment-failed-msg').show();
                        $('#payment-error').html("Something went wrong at GiftMe");
                        $('#payment-error').show();
                        $('#pay-btn').show();
                        $('#processing-btn').hide();
                        console.log('Error');
                    }
                });
            }
        }
    });
});

// This sends a WhatsApp message (when user clicks Invite and selects WhatsApp).
function send_whatsapp(message) {
    window.plugins.socialsharing.shareViaWhatsApp(message, null /* img */, 'https://play.google.com/store/apps/details?id=co.giftmeapp.gift_me' /* url */, function() {
            console.log('share ok')
            }, 
            function(errormsg){
                alert(errormsg)
            });
}

// This shares on Facebook (when a user clicks Invite and selects WhatsApp, but also when a user clicks the Facebook Share button).
function send_facebook(message, url, type) {
    var id = window.localStorage.getItem("id");
    if (!url) {
        var url = 'https://play.google.com/store/apps/details?id=co.giftmeapp.gift_me';
    }
    window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(message, null /* img */, url, 'Use Paste to add the default GiftMe message', function() {
        console.log('share ok')
    }, 
    function(errormsg){
        alert(errormsg)
    });
    $.ajax({
        url: backend_url + 'notification_of_facebook_share/',
        type: 'post',
        dataType: 'json',
        data: {userID: id, shareType: type},
        success: function(data) {
            console.log('success - notification sent')
        },
        error: function(data) {
            console.log('error - notification not sent')
        }
    });
}

// This controls the Settings save functionality.
$(function() {
    return $("body").on("click", "#settings-btn", function() {
        $("#settings-btn").attr("disabled", true);
        $("#settings-error-msg").hide();
        var birthday_day = $("#birthday-day").val(); 
        var birthday_month = $("#birthday-month").val(); 
        var id = window.localStorage.getItem("id");
        var accessToken = localStorage.getItem("accessToken");
        if ($("#email-notifications").hasClass("active")) {
            var receiveEmails = 'true';
        } else {
            var receiveEmails = 'false';
        }
        $.ajax({
            url: backend_url + 'user_settings/' + id + '/',
            type: 'post',
            dataType: 'json',
            data: {userID: id, accessToken: accessToken, receiveEmails: receiveEmails, birthday_day: birthday_day, birthday_month: birthday_month},
            success: function(data) {
                $("#settings-btn").attr("disabled", false);
                window.location = "#home/";
            },
            error: function(data) {
                $("#settings-btn").attr("disabled", false);
                $("#settings-error-msg").show();
            }
        });
    });
});

// This prevents the app from accidentally exiting when the user presses the back button on the home page. 
$(document).on('backbutton', function(e){
    e.preventDefault();
    current_loc = navigation_stack.pop();
    dest = navigation_stack.pop();
    if (dest === "start") {
        var retVal = confirm("Exit GiftMe?");
        if (retVal === true){
            window.location = "#home/";
            navigator.app.exitApp();
        } else {
            navigation_stack.push('start');
            navigation_stack.push('#home/');
        }
    } else {
        window.location = dest;
    }
});

// This temporarily disables the buttons and links on the app that are behind the popover when the popover is showing. Otherwise users click outside the popover to close it, but instead are accidentally brought to some page (and the popover is still open).
$('body').on('click', function (e) {
    $('#menu-invite').each(function () {
        if ($('#friendsPopover').is(":visible")){
            if (e.target.id == "send-sms" || e.target.id == "send-whatsapp" || e.target.id == "send-email" || e.target.id == "send-FBTimeline" || e.target.id == "send-FBMessage"){
            } else {
                e.preventDefault();
            }
        }
    });
    $('#friendsWishlist-invite').each(function () {
        if ($('#friendsWishlistPopover').is(":visible")){
            if (e.target.id == "send-sms" || e.target.id == "send-whatsapp" || e.target.id == "send-email"){
            } else {
                e.preventDefault();
            }
        }
    });
});

function logout() {
    if (typeof facebookConnectPlugin != 'undefined'){
        facebookConnectPlugin.logout(
                function (response) {
                    console.log("logged out - success");
                    window.location = "#login/";
                    navigator.app.exitApp();
                },
                function (response) { 
                    console.log("logged out - failure");
                });
    } else {
        console.log('FB NOT READY');
    }

}
