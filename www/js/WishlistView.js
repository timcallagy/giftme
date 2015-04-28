var WishlistView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
        Handlebars.registerHelper("check_if_zero", function(crowdfunded, options){
            if (crowdfunded === 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    };

    this.render = function() {
        userID = window.localStorage.getItem("id");
        $.get(backend_url + "get_gifts/" + userID + "/", function( data ) {
            window.localStorage.setItem("gifts", data);
            data = JSON.parse(data);
            self.$el.html(self.template({'gifts': data, 'userID': userID}));
            return this;
        });
    }
    this.initialize();
}
