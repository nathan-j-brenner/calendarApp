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
		this.$el.html('<p id="date">' + day_value + '</p><br><input type="text"></input>'+ event_btn);
		// console.log('day render completed');
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
		var add_day_btn = '<button id="add_day">Add</button>';
		this.$el.html(add_day_btn);
	},
	initialize: function(){
		this.listenTo(this.collection, 'add', this.add_day_view);
		//listenTo(collection, event, callback)
	},
	events : {
		'click #add_day' : 'add_day_model'
	},
	add_day_model : function(){
		this.collection.add({});
	},
	add_day_view : function(new_model){
		// console.log('add day view');
		// console.log(this.collection.models[0]);
		// console.log(this.collection.models[0].get("value"));
		// console.log(this.collection.models.length)
		this.collection.create({id : idCount});
		idCount= idCount + 1;
		var default_day_value = this.collection.models[this.collection.models.length-2].get("value");
		// if(this.collection.models.length===2){
		// 	console.log("collection is 2");
		// }
		var day_value = default_day_value + 1;
		new_model.set("value", day_value);
		// new_model.set("value", idCount); //this will create an incrementing list, but when page is refreshed, they change values
		var view = new DayView({model: new_model});
		view.render(); //if this line is commented out, then only one get is called.  The number for value is the same, but changes when you refresh the page
		$("#calendarDiv").append(view.$el);
		// console.log("new model added");
	}
})

// var day_model1, day_view1, dayCollection, dayCollectionView;
var dayCollection, dayCollectionView;
$(document).ready(function(){
	dayCollection = new DayCollection();
	dayCollectionView = new DayCollectionView({collection : dayCollection});
	dayCollectionView.render();
	$("#calendarDiv").append(dayCollectionView.$el);
});