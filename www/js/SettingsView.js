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
            //var months = ['1':'January', '2':'February', '3':'March', '4':'April', '5':'May', '6':'June', '7':'July', '8':'August', '9':'September', '10':'October', '11':'November', '12':'December', ]
            var months = [{num: '1', name:'January'}, {num: '2', name:'February'}, {num: '3', name:'March'}, {num: '4', name:'April'}, {num: '5', name:'May'}, {num: '6', name:'June'}, {num: '7', name:'July'}, {num: '8', name:'August'}, {num: '9', name:'September'}, {num: '10', name:'October'}, {num: '11', name:'November'}, {num: '12', name:'December'}];
            var birthday = new Date(data[0].fields.birthday);
            var month = birthday.getMonth();
            month_plus1 = (month+1).toString();
            console.log(month_plus1);
            self.$el.html(self.template({fields: data[0].fields, days: days, months: months, birthday_day: birthday.getDate(), birthday_month: month_plus1}));
            return this;
        });
            self.$el.html(self.template());
    };
    this.initialize();
}
