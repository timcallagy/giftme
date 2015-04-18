var PayPageView = function (service, id, pk) {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
        navigation_stack.push(window.location.hash);
    };

    this.render = function() {
        $.get(backend_url + "get_gift/" + pk + "/", function( data ) {
            data = JSON.parse(data);
            var amount = window.localStorage.getItem("amount");
            var message = window.localStorage.getItem("gift-message");
            var months = [{num: '1', name:'January'}, {num: '2', name:'February'}, {num: '3', name:'March'}, {num: '4', name:'April'}, {num: '5', name:'May'}, {num: '6', name:'June'}, {num: '7', name:'July'}, {num: '8', name:'August'}, {num: '9', name:'September'}, {num: '10', name:'October'}, {num: '11', name:'November'}, {num: '12', name:'December'}];
            var years = [{num: '2015', name:'2015'}, {num: '2016', name:'2016'}, {num: '2017', name:'2017'}, {num: '2018', name:'2018'}, {num: '2019', name:'2019'}, {num: '2020', name:'2020'}, {num: '2021', name:'2021'}, {num: '2022', name:'2022'}, {num: '2023', name:'2023'}, {num: '2024', name:'2024'}]
            self.$el.html(self.template({friend_id: id, pk: pk, gift: data[0].fields, amount: amount, 'gift-message': message, 'months': months, 'years': years}));
            return this;
        });
    };
    this.initialize();
}
