//model for day
var DayModel = Backbone.Model.extend({
	defaults : {"value" : 0}, //value will represent the date of a month
	replace : function(number){
		this.set({"value" : number});
	}
});

//view for day
var DayView = Backbone.View.extend({
	render	: function(){
		var day_value = this.model.get("value");
		this.$el.html('<p id="date">' + day_value + '</p>');
		console.log('day render completed');
	},
	initialize: function(){
		this.model.on("change", this.render, this);
	},
	replace : function(){
		var default_day = this.$el.find("#date").val();
		var next_date = default_day + 1;
		this.model.replace(next_date);
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
		console.log("day collection rendered");
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

	var dayCollection = new DayCollection();
	var dayCollectionView = new DayCollectionView({collection : dayCollection});
	dayCollectionView.render();
	$("#calendarDiv").append(dayCollectionView.$el);







});