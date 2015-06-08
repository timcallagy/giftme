var GiveGiftView = function (id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            gift = data[0].fields;
            price = gift.price;
            crowdfunded = gift.crowdfunded;
            amount_options = [];
            console.log(gift);
            if (price == crowdfunded) {
                gift.crowdfunding_complete = true;
            } else {
                option_count = (price-crowdfunded)/5;
                for (i = 0; i < option_count; i++) {
                    amount_options[i] = (i+1)*5.00; 
                }
                // Check if the price is higher than the highest number in the list of amount options.
                // If yes, this means that contributors won't be able to fully buy the gift. 
                // So this if loop adds the another amount (allowing full buy out of the gift) to the amount options. 
                if (price < (amount_options[amount_options.length-1] + crowdfunded)) {
                    amount_overshoot = (amount_options[amount_options.length-1] + crowdfunded) - price;
                    amount_options[amount_options.length-1] = amount_options[amount_options.length-1] - amount_overshoot;
                }
                console.log(amount_options);
            }
            self.$el.html(self.template({gift_id: pk, gift: gift, amount: amount_options}));

            var buyNowBtn = document.getElementById("paypal-btn");
            buyNowBtn.onclick = function(e) {
                var amount = $('#amount').val();
                var paymentDetails = new PayPalPaymentDetails(amount, "0.00", "0.00");
                var payment = new PayPalPayment(amount, "USD", "GiftMe gift", "Sale", paymentDetails);
                PayPalMobile.renderSinglePaymentUI(payment, ppApp.onSuccesfulPayment, ppApp.onUserCanceled);
            };
            return this;
        });
    };
    this.initialize();
}
