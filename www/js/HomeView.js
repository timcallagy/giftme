var HomeView = function (service) {

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };


    this.render = function() {
        this.$el.html(this.template());
        return this;
    };
    this.initialize();

$("[id^=logout]").click(function(){
    openFB.logout(
        function() {
            alert('Logout successful');
            /*alert('Logout successful');
              $('#userName').hide();
              $('#userPic').hide();
              $('#login').show();
              $('#actions').hide();
              $('#logout').hide();
              */
            var href = $('#gologout').attr('href');
            window.location.href = href;
        },
        errorHandler);
});

}
