var ContributionsView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
        id = window.localStorage.getItem("id");
        url = "https://giftmeserver.herokuapp.com/get_contributions/";
        //url = "http://127.0.0.1:8000/get_contributions/";
        $.get(url + id + "/", function( data ) {
            data = JSON.parse(data);
            self.$el.html(self.template(data));
            return this;
        });
    }
    this.initialize();
}
