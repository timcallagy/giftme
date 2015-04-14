var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        Handlebars.registerHelper("him_her", function(val, options){
            if (val === 'male') {
                return new Handlebars.SafeString('him');
            } else if (val === 'female') {
                return new Handlebars.SafeString('her');
            } else {
                return new Handlebars.SafeString('them');
            }

        });
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
                            contributions = JSON.parse(data.contributions);
                            recent_friends = JSON.parse(data.recent_friends);

                            userPic = 'http://graph.facebook.com/' + response.id + '/picture?type=small';
                            window.localStorage.setItem("id", response.id);
                            window.localStorage.setItem("my_name", response.first_name + " " + response.last_name);
                            self.$el.html(self.template({'profile': response, 'contributions': contributions, 'recent_friends': recent_friends}));
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
