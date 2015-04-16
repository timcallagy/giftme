var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        //navigation_stack.push();
        alert(window.location);
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
        alert(window.location);
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
                            contributions_to = JSON.parse(data.contributions_to);
                            contributions_from = JSON.parse(data.contributions_from);
                            gifts = JSON.parse(data.gifts);
                            birthdays = JSON.parse(data.birthdays);
                            recent_friends = JSON.parse(data.recent_friends);

                            userPic = 'http://graph.facebook.com/' + response.id + '/picture?type=small';
                            window.localStorage.setItem("id", response.id);
                            window.localStorage.setItem("my_name", response.first_name + " " + response.last_name);
                            self.$el.html(self.template({'profile': response, 'contributions_to': contributions_to, 'contributions_from': contributions_from, 'recent_friends': recent_friends, 'gifts': gifts, 'birthdays': birthdays}));
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
