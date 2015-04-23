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

        /*
        var buyNowBtn = document.getElementById("paypal-btn");

        buyNowBtn.onclick = function(e) {
            console.log('GIFTME - buy now clicked');
            // single payment
            PayPalMobile.renderSinglePaymentUI(ppApp.createPayment(), ppApp.onSuccesfulPayment, ppApp.onUserCanceled);
        };
        */
        $('#paypal-btn').on('click', function(){
            $(this).data('clicked', true);
        });

    },
    onPayPalMobileInit : function() {
            console.log('GIFTME - Preparing to Render');
        // must be called
        // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
        PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", ppApp.configuration(), ppApp.onPrepareRender);
    },
    onUserCanceled : function(result) {
        console.log(result);
    }
};
if ($('#paypal-btn').data('clicked')) {
    console.log('triggered');
    PayPalMobile.renderSinglePaymentUI(ppApp.createPayment(), ppApp.onSuccesfulPayment, ppApp.onUserCanceled);
}
