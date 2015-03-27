var LoginView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        // Send a GET request to heroku to wake up the dyno and avoid delays on the handset on other screens.
        url = 'https://giftmeserver.herokuapp.com/wakeup/';
        //url = 'http://127.0.0.1:8000/wakeup/';
        $.ajax({
            url: url,
            type: 'get',
            success: function(data) {
                console.log('Success');
            },
            error: function() {
                console.log('Error');
            }
        });
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
