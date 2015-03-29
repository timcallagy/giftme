var PaymentConfirmationView = function () {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        contribution = window.localStorage.getItem("contribution");
        contribution = JSON.parse(contribution)[0];
        self.$el.html(self.template(contribution));
        return this;
    };
    this.initialize();

}
