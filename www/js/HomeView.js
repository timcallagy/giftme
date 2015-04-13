var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        accessToken = window.localStorage.getItem("accessToken");
        userID = window.localStorage.getItem("id");
        if (typeof facebookConnectPlugin != 'undefined'){
            facebookConnectPlugin.api('/me', [],
                    function(response) {

                        $.ajax({
                            url: backend_url + "get_notifications/" + userID + "/",
                        type: 'post',
                        data: {'accessToken': accessToken, 'userID': userID},
                        success: function(data) {
                            data = JSON.parse(data);
                            console.log(data);
                            userPic = 'http://graph.facebook.com/' + response.id + '/picture?type=small';
                            window.localStorage.setItem("id", response.id);
                            window.localStorage.setItem("my_name", response.first_name + " " + response.last_name);
                            self.$el.html(self.template({'profile': response, 'notifications':data}));
                            return self;
                        },
                        error: function() {
                            console.log('Error');
                        }
                        });
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
