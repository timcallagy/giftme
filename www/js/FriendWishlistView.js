var FriendWishlistView = function (id) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
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
        $.get(backend_url + "get_friends_gifts/" + id + "/", function( data ) {
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
