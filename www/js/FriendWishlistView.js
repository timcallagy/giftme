var FriendWishlistView = function (id) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        Handlebars.registerHelper("check_if_zero", function(crowdfunded, options){
            if (crowdfunded === 0) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    };

    this.render = function() {
        var friend;
        friends = window.localStorage.getItem("friends");
        friends = JSON.parse(friends);
        for (var f in friends) {
            if (friends[f].id == id){
                friend = friends[f];
            }
        }

        url = "https://giftmeserver.herokuapp.com/get_friends_gifts/";
        //url = "http://127.0.0.1:8000/get_friends_gifts/";
        $.get(url + id + "/", function( data ) {
            data = JSON.parse(data);
            self.$el.html(self.template({gifts: data, id: id, friend: friend}));
            return this;
        });
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }
}
