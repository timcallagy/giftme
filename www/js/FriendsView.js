var FriendsView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
        openFB.api({
                path: '/me/friends', 
                success: function(data) {
                    friends = data.data;
                    self.$el.html(self.template(friends));
                    window.localStorage.setItem("friends", JSON.stringify(data.data));
                    return self;
                }, 
                error: errorHandler});
        return this;
    };
    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }

}
