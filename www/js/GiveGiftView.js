var GiveGiftView = function (id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            self.$el.html(self.template({friend_id: id, pk: pk, gift: data[0].fields}));
            return this;
        });
    };
    this.initialize();
}
