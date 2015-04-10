var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        if (typeof facebookConnectPlugin != 'undefined'){
            facebookConnectPlugin.api('/me', [],
                    function(response) {
                        userPic = 'http://graph.facebook.com/' + response.id + '/picture?type=small';
                        window.localStorage.setItem("id", response.id);
                        window.localStorage.setItem("my_name", response.first_name + " " + response.last_name);
                        self.$el.html(self.template(response));
                        return self;
                    },
                    function(response) {
                        console.log(response);
                    }
                    );
        } else {
            console.log('facebookConnectPlugin not ready');
            setTimeout(self.render, 500);
        }
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }

}
