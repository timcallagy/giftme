var PayPageView = function (service, id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            //friends = window.localStorage.getItem("friends");
            //friends = JSON.parse(friends);
            //for (var f in friends) {
            //    if (friends[f].id == data[0].fields.owner_id){
            //        friend = friends[f];
            //    }
            //}
            self.$el.html(self.template({friend_id: id, pk: pk, gift: data[0].fields}));
            return this;
        });
    };
    this.initialize();
}
