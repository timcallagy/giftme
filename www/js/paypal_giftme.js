var ppApp= {

    initPaymentUI : function () {
        console.log('GIFTME - paypal init');
        var clientIDs = {
            "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
            "PayPalEnvironmentSandbox": "AU7A9JUVu3utWFPTs4UdAKc9a7c5YOGRwDah8TE-fIeZAZym5IgxmOoV1cy7t59bwrP05j2H4pgayRoX"
        };
        PayPalMobile.init(clientIDs, ppApp.onPayPalMobileInit);
    },

    onSuccesfulPayment : function(payment) {
        console.log("payment success: " + JSON.stringify(payment, null, 4));
        $("#pay-btn").attr("disabled", false);
        var token = JSON.stringify(payment, null, 4);
        var contributor_id = localStorage.getItem("id");
        var accessToken = localStorage.getItem("accessToken");
        var contributor_name = localStorage.getItem("my_name");
        var contributed_to_name = $('#friend-name-payPage').val();
        var gift_pk = $('#gift-pk').val();
        var friend_id = $('#friend-id-payPage').val();
        $.ajax({
            url: backend_url + 'pay/' + gift_pk + '/',
            type: 'post',
            dataType: 'json',
            data: {token: token, amount: amount, message: message, card_number: card_number, card_cvc: card_cvc, expiry_month: expiry_month, expiry_year: expiry_year, contributor_id: contributor_id, contributor_name: encodeURI(contributor_name), contributed_to_name: encodeURI(contributed_to_name), accessToken: accessToken, timestamp: Date.now()},
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
    },
    onAuthorizationCallback : function(authorization) {
        console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
        // for simplicity use predefined amount
        // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
        var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
        var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
        return payment;
    },
    configuration : function () {
        console.log('GIFTME - config');
        // for more options see `paypal-mobile-js-helper.js`
        var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
        return config;
    },
    onPrepareRender : function() {
        console.log('GIFTME - on prepare render');
        // buttons defined in index.html
        //  <button id="buyNowBtn"> Buy Now !</button>
        //  <button id="buyInFutureBtn"> Pay in Future !</button>
        //  <button id="profileSharingBtn"> ProfileSharing !</button>

        var buyNowBtn = document.getElementById("paypal-btn");

        buyNowBtn.onclick = function(e) {
            console.log('GIFTME - buy now clicked');
            // single payment
            PayPalMobile.renderSinglePaymentUI(ppApp.createPayment(), ppApp.onSuccesfulPayment, ppApp.onUserCanceled);
        };
    },
    onPayPalMobileInit : function() {
        console.log('GIFTME - Preparing to Render');
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", ppApp.configuration(), ppApp.onPrepareRender);
    },
    onUserCanceled : function(result) {
        console.log(result);
    }
};
