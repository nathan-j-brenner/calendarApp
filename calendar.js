//model for day
var DayModel = Backbone.Model.extend({
	defaults : {"day" : 0, "event": ""}, //value will represent the date of a month
	// initialize : function(){
	// 	this.fetch();
	// },
	// replace_number : function(number){
	// 	this.set({"day" : number});
	// 	this.save();
	// },
	// replace_event : function(str_event){
	// 	this.set({'event': str_event});
	// 	this.save();
	// },
	replace : function(number, str_event){
		this.set({"day" : number, "event": str_event});
		this.save();
	}
});

//view for day
var DayView = Backbone.View.extend({
	render	: function(){
		var day_value = this.model.get("day");
		var event_value = this.model.get("event");
		var event_btn = '<button type="submit" id="add_event">Add Event</button>'
		var input = '<input type="text" class="event"></input>';
		this.$el.html('<div class="day"><p id="date">' + day_value + '</p>' + '<br><p>' + event_value + '<p>' + '<br>' + input + event_btn + '</div>');
	},
	initialize: function(){
		this.model.on("change", this.render, this);
	},
	replace_number : function(){
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
		var day = this.model.get("day");
		this.model.replace(day, str);
		// this.model.replace_event(str);
		// console.log(this.models[1].attributes);
		// console.log(this.model.attributes);
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

//view for day collection
var DayCollectionView = Backbone.View.extend({
	render : function(){
		// var day_value = this.model.get("value");
		// var current_day = '<p>' + day_value + '</p>';
		var add_day_btn = '<button type="submit" id="add_day">Add Day</button>';
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
		this.collection.create({day:this.collection.length+1});
	},
	add_day_view : function(new_model){
		var default_day_value, day_value;
		// console.log(this.collection.models[0].attributes.value);
		// if(this.collection.models[0].attributes.value < 3){
		// 	for(var i = 0; i<3; i++){
		// 		default_day_value = this.collection.models[this.collection.models.length-2].get("value");
		// 		day_value = default_day_value + 1;
		// 		new_model.set("value", day_value);
		// 		var view = new DayView({model: new_model});
		// 		// view.render();
		// 		// $("#calendarDiv").append(view.$el);
		// 		console.log("test");
		// 	}
		// } else{
			// day_value = this.collection.models.length;
			// default_day_value = this.collection.models[this.collection.models.length-2].get("day");
			// day_value = default_day_value + 1;
			console.log('ran add day value');
			// new_model.set("day", day_value);
			var view = new DayView({model: new_model});
			view.render();
			$("#calendarDiv").append(view.$el);
		// }
	}
})

var dayCollection, dayCollectionView;
$(document).ready(function(){
	dayCollection = new DayCollection();
	dayCollectionView = new DayCollectionView({collection : dayCollection});
	dayCollectionView.render();
	$("#calendarDiv").append(dayCollectionView.$el);
});