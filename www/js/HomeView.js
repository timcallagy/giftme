var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push('start');
        navigation_stack.push('#home/');
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
        if (userID) {
            $.ajax({
                url: backend_url + "get_notifications/" + userID + "/",
                type: 'post',
                data: {'accessToken': accessToken, 'userID': userID},
                success: function(data) {
                    my_name = window.localStorage.getItem("my_name");
                    render_with_data(data, my_name);
                    /*
                       data = JSON.parse(data);
                       contributions_to = JSON.parse(data.contributions_to);
                       contributions_from = JSON.parse(data.contributions_from);
                       gifts = JSON.parse(data.gifts);
                       birthdays = JSON.parse(data.birthdays);
                       recent_friends = JSON.parse(data.recent_friends);
                       var my_name = window.localStorage.getItem("my_name");
                       self.$el.html(self.template({'my_name': my_name, 'contributions_to': contributions_to, 'contributions_from': contributions_from, 'recent_friends': recent_friends, 'gifts': gifts, 'birthdays': birthdays, 'my_id': userID}));
                       return self;
                       */
                },
                error: function() {
                    console.log('Error');
                }
            });

        } else {
            console.log("USERID DOESN'T exist");
            if (typeof facebookConnectPlugin != 'undefined'){
                facebookConnectPlugin.api('/me', [],
                        function(response) {

                            $.ajax({
                                url: backend_url + "get_notifications/" + userID + "/",
                            type: 'post',
                            data: {'accessToken': accessToken, 'userID': userID},
                            success: function(data) {
                                my_name = response.first_name + " " + response.last_name;
                                render_with_data(data, my_name);
                                window.localStorage.setItem("id", response.id);
                                window.localStorage.setItem("my_name", my_name);
                                /*
                                   data = JSON.parse(data);
                                   contributions_to = JSON.parse(data.contributions_to);
                                   contributions_from = JSON.parse(data.contributions_from);
                                   gifts = JSON.parse(data.gifts);
                                   birthdays = JSON.parse(data.birthdays);
                                   recent_friends = JSON.parse(data.recent_friends);
                                   window.localStorage.setItem("id", response.id);
                                   window.localStorage.setItem("my_name", response.first_name + " " + response.last_name);
                                   self.$el.html(self.template({'profile': response, 'contributions_to': contributions_to, 'contributions_from': contributions_from, 'recent_friends': recent_friends, 'gifts': gifts, 'birthdays': birthdays}));
                                   return self;
                                   */
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
        }

        function render_with_data(data, my_name) {
            data = JSON.parse(data);
            contributions_to = JSON.parse(data.contributions_to);
            contributions_from = JSON.parse(data.contributions_from);
            gifts = JSON.parse(data.gifts);
            birthdays = JSON.parse(data.birthdays);
            recent_friends = JSON.parse(data.recent_friends);
            self.$el.html(self.template({'my_name': my_name, 'contributions_to': contributions_to, 'contributions_from': contributions_from, 'recent_friends': recent_friends, 'gifts': gifts, 'birthdays': birthdays, 'my_id': userID}));
            return self;

        }
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }

}
