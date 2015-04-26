var ppApp= {

    initPaymentUI : function () {
        console.log('GIFTME - paypal init');
        var clientIDs = {
            "PayPalEnvironmentProduction": "ASeDrb7vkylgoUWMJnH-dtWWiTnK71g6M6FdYozmZpKZRx5YDXYQfc0F2tuClD2zG7bF8Qc7BYiLGnwJ",
            "PayPalEnvironmentSandbox": "AU7A9JUVu3utWFPTs4UdAKc9a7c5YOGRwDah8TE-fIeZAZym5IgxmOoV1cy7t59bwrP05j2H4pgayRoX"
        };
        PayPalMobile.init(clientIDs, ppApp.onPayPalMobileInit);
    },

    onSuccesfulPayment : function(payment) {
        console.log("payment success: " + JSON.stringify(payment, null, 4));
        $("#pay-btn").attr("disabled", false);
        console.log('PAYMENT response id: ' + payment.response.id);
        var token = payment.response.id;
        var contributor_id = localStorage.getItem("id");
        var accessToken = localStorage.getItem("accessToken");
        var gift_pk = $('#gift-pk').val();
        var friend_id = $('#friend-id-payPage').val();
        var message = $('#gift-message').val();
        var provider = 'paypal';
        $.ajax({
            url: backend_url + 'pay_new/' + gift_pk + '/',
            type: 'post',
            dataType: 'json',
           // data: {token: token, amount: amount, message: message, contributor_id: contributor_id, accessToken: accessToken, timestamp: Date.now(), provider: provider},
            data: {amount: amount, message: message, contributor_id: contributor_id, accessToken: accessToken, timestamp: Date.now(), provider: provider},
            success: function(response) {
                window.localStorage.setItem("contribution", JSON.stringify(response));
                window.location = "#payment-confirmation/";
            },
            error: function() {
                /*
                $('#payment-failed-msg').show();
                $('#payment-error').html("Something went wrong at GiftMe");
                $('#payment-error').show();
                $('#pay-btn').show();
                $('#processing-btn').hide();
                */
                console.log('Error');
            }
        });
    },
    onAuthorizationCallback : function(authorization) {
        console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    configuration : function () {
        console.log('GIFTME - config');
        // for more options see `paypal-mobile-js-helper.js`
        var config = new PayPalConfiguration({merchantName: "GiftMe", merchantPrivacyPolicyURL: "http://giftmeserver.herokuapp.com/privacy_policy/", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
        return config;
    },
    onPrepareRender : function() {
        console.log('GIFTME - on prepare render');
    },
    onPayPalMobileInit : function() {
        console.log('GIFTME - Preparing to Render');
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", ppApp.configuration(), ppApp.onPrepareRender);
        //PayPalMobile.prepareToRender("PayPalEnvironmentProduction", ppApp.configuration(), ppApp.onPrepareRender);
    },
    onUserCanceled : function(result) {
        console.log(result);
    }
};
