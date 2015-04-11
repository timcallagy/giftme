var LoginView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        this.$el.html(this.template());
        return this;
    };
    this.initialize();

}
