var LoginView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        openFB.init({appId: '1533444716908405'});
        openFB.api({
            path: '/me',
            success: function(data) {
                window.location="#home/";
            },
            error: function(data) {
                self.render();
            }
        });
    };


    this.render = function() {
        this.$el.html(this.template());
        return this;
    };
    this.initialize();

}
