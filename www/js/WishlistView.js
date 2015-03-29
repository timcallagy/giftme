var WishlistView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        Handlebars.registerHelper("check_if_zero", function(crowdfunded, options){
            if (crowdfunded === 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    };

    this.render = function() {
        id = window.localStorage.getItem("id");
        url = "https://giftmeserver.herokuapp.com/get_gifts/";
        //url = "http://127.0.0.1:8000/get_gifts/";
        $.get(url + id + "/", function( data ) {
            window.localStorage.setItem("gifts", data);
            data = JSON.parse(data);
            self.$el.html(self.template(data));
            return this;
        });
    }
    this.initialize();
}
