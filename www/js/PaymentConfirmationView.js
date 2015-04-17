var PaymentConfirmationView = function () {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        contribution = window.localStorage.getItem("contribution");
        contribution = JSON.parse(contribution)[0];
        self.$el.html(self.template({contribution: contribution.fields}));
        return this;
    };
    this.initialize();

}
