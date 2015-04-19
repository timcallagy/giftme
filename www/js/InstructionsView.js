var InstructionsView = function () {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        self.$el.html(self.template());
    };
    this.initialize();
}
