//model for day
var DayModel = Backbone.Model.extend({
	defaults : {"value" : 0, "event": ""}, //value will represent the date of a month
	initialize : function(){
		this.fetch();
	},
	replace : function(number){
		this.set({"value" : number});
		this.save();
	}
});

//view for day
var DayView = Backbone.View.extend({
	render	: function(){
		var day_value = this.model.get("value");
		var event_value = this.model.get("event");
		var event_btn = '<button id="add_event">Add Event</button>'
		var input = '<input type="text" class="event"></input>';
		var input_text = '';
		this.$el.html('<div class="day"><p id="date">' + day_value + '</p>' + '<br><p>' + input_text + '<p>' + '<br>' + input + event_btn + '</div>');
	},
	initialize: function(){
		this.model.on("change", this.render, this);
	},
	replace : function(){
		var default_day = this.$el.find("#date").val();
		var next_date = default_day + 1;
		this.model.replace(next_date);
	},
	events : {
		'click #add_event' : "create_new_event"
	},
	create_new_event : function(){
		//probably need to take this code and put in another collection
		var str = this.$el.find("input").val();
		this.model.replace(input_text);
	}
});

//collection for days
var DayCollection = Backbone.Collection.extend({
	model : DayModel,
	url : "/dates",
	initialize: function(){
		this.fetch();
	}
});

var idCount = 0;

//view for day collection
var DayCollectionView = Backbone.View.extend({
	render : function(){
		// var day_value = this.model.get("value");
		// var current_day = '<p>' + day_value + '</p>';
		var add_day_btn = '<button id="add_day">Add Day</button>';
		this.$el.html(add_day_btn);
	},
	initialize: function(){
		this.listenTo(this.collection, 'add', this.add_day_view);
	},
	events : {
		// 'click #add_day' : 'add_day_model'
		'click #add_day' : 'add_day_collection'
	},
	add_day_collection : function(){
		this.collection.create({id: idCount});
		idCount++;
	},
	add_day_view : function(new_model){
		var default_day_value = this.collection.models[this.collection.models.length-2].get("value");
		var day_value = default_day_value + 1;
		new_model.set("value", day_value);
		var view = new DayView({model: new_model});
		view.render();
		$("#calendarDiv").append(view.$el);
	}
})

var dayCollection, dayCollectionView;
$(document).ready(function(){
	dayCollection = new DayCollection();
	dayCollectionView = new DayCollectionView({collection : dayCollection});
	dayCollectionView.render();
	$("#calendarDiv").append(dayCollectionView.$el);
});