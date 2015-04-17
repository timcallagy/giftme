var PayPageView = function (service, id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            var amount = window.localStorage.getItem("amount");
            var message = window.localStorage.getItem("gift-message");
            self.$el.html(self.template({friend_id: id, pk: pk, gift: data[0].fields, amount: amount, 'gift-message': message}));
            return this;
        });
    };
    this.initialize();
}
