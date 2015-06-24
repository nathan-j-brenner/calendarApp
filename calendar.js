//model for day
var DayModel = Backbone.Model.extend({
	defaults : {"value" : 0}, //value will represent the date of a month
	replace : function(number){
		this.set("value" : number);
	}
});

//view for day
var DayView = Backbone.View.extend({
	render	: function(){
		var default_day_value = this.model.get("value");
		var day_value = default_day_value + 1;
		this.$el.html('<p>' + day_value + '</p>');
		console.log('render completed');
	}
});

//collection for days
var DayCollection = Backbone.Collection.extend({
	model : DayModel
});

//view for day collection
var DayCollectionView = Backbone.View.extend({
	render : function(){
		var add_day_btn = '<button id="add_day">Add</button>';
		var day_div = ''
		this.$el.html(add_day_btn);
	},
	initialize: function(){
		this.listenTo(this.collection, 'add', this.add_day_view);
		//listenTo(collection, event, callback)
	},
	events : {
		'click #add_day' : 'add_day'
	},
	add_day_model : function(){
		this.collection.add({});
	},
	add_day_view : function(){
		var default_day_value = this.model.get("value");
		var day_value = default_day_value + 1;
		new_day_model.set("value", day_value);
		var view = new DayView({model: new_day_model});
		view.render();
		this.$("#calendarDiv").append(view.$el);
	}
})

var day_model1, day_view1;
$(document).ready(function(){
	day_model1 = new DayModel();
	day_view1 = new DayView({model: day_model1});
	day_view1.render();
	$("#calendarDiv").append(day_view1.$el);
});