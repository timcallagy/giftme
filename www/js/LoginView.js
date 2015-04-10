var LoginView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        // Send a GET request to heroku to wake up the dyno and avoid delays on the handset on other screens.
        $.ajax({
            url: backend_url + 'wakeup/',
            type: 'post',
            data: {'clientVersion': '0.0.21'}, 
            success: function(data) {
                console.log('Success');
                if ( data == 'Success' ) {
                    /*alert('Version supported');*/
                }
                else {
                    alert(data); 
                    return false;
                }
                
            },
            error: function(data) {
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
