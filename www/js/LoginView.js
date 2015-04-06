var LoginView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        // Send a GET request to heroku to wake up the dyno and avoid delays on the handset on other screens.
        $.ajax({
            url: backend_url + 'wakeup/',
            type: 'get',
            success: function(data) {
                console.log('Success');
            },
            error: function() {
                console.log('Error');
            }
        });
    };

    this.render = function() {
        this.$el.html(this.template());
        return this;
    };
    this.initialize();

}
