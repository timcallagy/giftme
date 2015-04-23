var GiveGiftView = function (id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            self.$el.html(self.template({friend_id: id, pk: pk, gift: data[0].fields}));
        var buyNowBtn = document.getElementById("paypal-btn");

        buyNowBtn.onclick = function(e) {
            console.log('GIFTME - buy now clicked');
            // single payment
            PayPalMobile.renderSinglePaymentUI(ppApp.createPayment(), ppApp.onSuccesfulPayment, ppApp.onUserCanceled);
        };
            return this;
        });
    };
    this.initialize();
}
