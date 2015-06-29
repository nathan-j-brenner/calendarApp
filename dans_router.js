_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
}

var template = _.template('Click <a href="{{url}}">here</a> for the {{name}} view!');

//var href = template({url:'#', name:'other'})

var OneView = Backbone.View.extend({
	el: '#myApp',
	initialize: function() {
		this.render();
		//this.$el.appendTo('#myApp');
		//$('#myApp').html(this.$el);
	},
	render: function(data) {
		var name = data? data : 'other';
		this.$el.html(template({url:'#other',name:name}));
	}
})

var OtherView = Backbone.View.extend({
	el:'#myApp',
	initialize: function() {
		this.render();
		//this.$el.appendTo('#myApp');
		//$('#myApp').html(this.$el);
	},
	render: function(data) {
		var name = data || 'one';
		this.$el.html(template({url:'#one',name:name}));
	}
})

var MyRouter = Backbone.Router.extend({
	routes: {
		'': 'one',
		'one': 'one',
		'other': 'other',
		'special(/:data)':'display'
	},
	display: function(data) {
		this.view.render(data);
	},
	one: function() {
		// if (this.view)
		// 	this.view.remove();
		this.view = new OneView();
	},
	other: function() {
		// if (this.view)
		// 	this.view.remove();
		this.view = new OtherView();
	}
})

var view;
$(function() {
//	view = new RedirectView();
	var router = new MyRouter();
	Backbone.history.start();
})