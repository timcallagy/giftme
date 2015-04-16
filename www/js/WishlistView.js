var WishlistView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        alert(window.location);
        Handlebars.registerHelper("check_if_zero", function(crowdfunded, options){
            if (crowdfunded === 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    };

    this.render = function() {
        alert(window.location);
        userID = window.localStorage.getItem("id");
        $.get(backend_url + "get_gifts/" + userID + "/", function( data ) {
            window.localStorage.setItem("gifts", data);
            data = JSON.parse(data);
            self.$el.html(self.template(data));
            return this;
        });
    }
    this.initialize();
}
