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
            gifts = JSON.parse(data);
            for (var g in gifts) {
                if (gifts[g].fields.price == gifts[g].fields.crowdfunded) {
                    gifts[g].fields.crowdfunding_complete = true;
                    console.log(gifts[g].fields);
                }
            }
            self.$el.html(self.template({gifts: gifts, id: id, friend: friend}));
            return this;
        });
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }
}
