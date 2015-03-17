var AddItemView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
            var id = window.localStorage.getItem("id");
            self.$el.html(self.template(id));
            return self;
    };
    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }


}
