var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };
    this.render = function() {
        openFB.init({appId: '1533444716908405'});
        openFB.api({
            path: '/me',
            success: function(data) {
                userPic = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                window.localStorage.setItem("id", data.id);
                window.localStorage.setItem("my_name", data.first_name + " " + data.last_name);
                self.$el.html(self.template(data));
                return self;
            },
            error: function(data) {
                openFB.login(
                    function(response) {
                        if(response.status === 'connected') {
                            window.localStorage.setItem("access_token", response.authResponse.token);
                            openFB.api({
                                path: '/me',
                                success: function(data) {
                                    userPic = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                                    window.localStorage.setItem("id", data.id);
                                    window.localStorage.setItem("my_name", data.first_name + " " + data.last_name);
                                    self.$el.html(self.template(data));
                                    return self;
                                },
                                error: errorHandler});
                        } else {
                            alert('Facebook login failed: ' + response.error);
                        }
                    }, {scope: 'email,user_friends'});
            }
        });
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }


}
