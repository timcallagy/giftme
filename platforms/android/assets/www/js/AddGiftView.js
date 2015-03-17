var AddGiftView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
            var id = window.localStorage.getItem("id");
            var csrf_token = window.localStorage.getItem("csrf_token");
            self.$el.html(self.template({id: id, csrf_token: csrf_token}));
            return self;
    };
    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }

}
