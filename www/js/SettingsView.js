var SettingsView = function () {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        Handlebars.registerHelper("activate_if_equal", function(num1, num2, options){
            if (num1 === num2) {
                return new Handlebars.SafeString('selected');
            }
        });
    };

    this.render = function() {
        id = window.localStorage.getItem("id");
        $.get(backend_url + "settings/" + id + "/", function( data ) {
            data = JSON.parse(data);
            var days = [];
            for(x=1;x<=31;x++){
                days.push(x);
            }
            var birthday = new Date(data[0].fields.birthday);
            self.$el.html(self.template({fields: data[0].fields, days: days, birthday_day: birthday.getDate(), birthday_month: birthday.getMonth+1}));
            return this;
        });
            self.$el.html(self.template());
    };
    this.initialize();
}
