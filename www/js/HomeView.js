var HomeView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        //this.render();
    };


    this.render = function() {
        openFB.init({appId: '1533444716908405'});
        name = "";
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        openFB.api({
                            path: '/me',
                            success: function(data) {
                                userPic = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
                                self.$el.html(self.template(data));
                                return self;
                            },
                            error: errorHandler});
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email,read_stream,publish_stream, user_friends'});

    };
    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }


}
