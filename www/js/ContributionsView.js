var ContributionsView = function (pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
        url = "https://giftmeserver.herokuapp.com/get_contributions/";
        //url = "http://127.0.0.1:8000/get_contributions/";
        $.get(url + pk + "/", function( data ) {
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
