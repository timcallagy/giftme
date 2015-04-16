var ContributionsView = function (pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_contributions/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            var gift;
            gifts = window.localStorage.getItem("gifts");
            gifts = JSON.parse(gifts);
            for (var g in gifts) {
                if (gifts[g].pk == pk){
                    gift = gifts[g];
                }
            }
            self.$el.html(self.template({contributions: data, gift:gift}));
            return this;
        });
    }
    this.initialize();
}
