var SettingsView = function () {

    self = this;

    this.initialize = function() {
        this.$el = $('<div/>');
    };

    this.render = function() {
//        id = window.localStorage.getItem("id");
  //      $.get(backend_url + "settings/" + id + "/", function( data ) {
    //        data = JSON.parse(data);
      //      console.log(data);
        //    self.$el.html(self.template({data: data.fields}));
          //  return this;
      //  });
            self.$el.html(self.template());
    };
    this.initialize();
}
