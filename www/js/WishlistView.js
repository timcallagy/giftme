var WishlistView = function (service) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };


    this.render = function() {
        service.allGifts().done(function(gifts) {
            self.$el.html(self.template(gifts));
        });
        //this.$el.html(this.template(service.allGifts().done(function(){
        //}));
        return this;
    };
    this.initialize();

}
