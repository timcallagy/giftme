var FriendWishlistView = function (service, id, first_name) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        var friends;
        openFB.api({
            path: '/me/friends', 
            success: function(data) {
                friends = data.data;
                for (var f in friends) {
                    console.log(friends[f]);
                    if (friends[f].id == id){
                        friend = friends[f];
                        service.allGifts().done(function(gifts) {
                            console.log(friend);
                            self.$el.html(self.template({gifts: gifts, id: id, friend: friend}));
                        });
                    }
                }    
            }, 
            error: errorHandler});
        return this;
    };

    this.initialize();

    function errorHandler(error) {
        alert(error.message);
    }
}
