var PayPageView = function (service, id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        url = "https://giftmeserver.herokuapp.com/get_gift/";
        //url = "http://127.0.0.1:8000/get_gift/";
        $.get(url + pk + "/", function( data ) {
            data = JSON.parse(data);
            friends = window.localStorage.getItem("friends");
            friends = JSON.parse(friends);
            for (var f in friends) {
                if (friends[f].id == data[0].fields.owner_id){
                    friend = friends[f];
                }
            }
            self.$el.html(self.template({id: id, pk: pk, gift: data[0].fields, friend: friend}));
            return this;
        });
    };
    this.initialize();

}
