var WishlistView = function (service) {

    self = this;
    var runningInCordova;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
        id = window.localStorage.getItem("id");
        if (runningInCordova) {
            url = "https://giftmeserver.herokuapp.com/get_gifts/";
        } else {
            url = "http://127.0.0.1:8000/get_gifts/";
            //url = "https://giftmeserver.herokuapp.com/get_gifts/";
        }
        $.get(url + id + "/", function( data ) {
            data = JSON.parse(data);
            self.$el.html(self.template(data));
            return this;
        });
    }
    this.initialize();

    document.addEventListener("deviceready", function () {
        runningInCordova = true;
    }, false);

}
