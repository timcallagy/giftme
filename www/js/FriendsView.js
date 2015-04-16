var FriendsView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        if (typeof facebookConnectPlugin != 'undefined'){
            facebookConnectPlugin.api('/me/friends', [],
                    function(response) {
                        self.$el.html(self.template(response.data));
                        window.localStorage.setItem("friends", JSON.stringify(response.data));
                        return self;
                    },
                    function(response) {
                        console.log(response);
                    }
                    );
        } else {
            console.log('facebookConnectPlugin not ready');
            setTimeout(getStatus, 500);
        }
    };
    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }

}
