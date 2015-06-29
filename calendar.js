var DayModel = Backbone.Model.extend({
	defaults : {"day" : 0, "event": ""}, //value will represent the date of a month
	replace : function(number, str_event){
		this.set({"day" : number, "event": str_event});
		this.save();
	}
});

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
		var str = this.$el.find("input").val();
		var day = this.model.get("day");
		this.model.replace(day, str);
	}
});

var DayCollection = Backbone.Collection.extend({
	model : DayModel,
	url : "/dates",
	initialize: function(){
		this.fetch();
	}
});

var DayCollectionView = Backbone.View.extend({
	render : function(){
		var add_day_btn = '<button type="submit" id="add_day">Add Day</button><button type"submit" id="add_month">Add Month</button>';
		this.$el.html(add_day_btn);
	},
	initialize: function(){
		this.listenTo(this.collection, 'add', this.add_day_view);
	},
	events : {
		'click #add_day' : 'add_day_collection',
		'click #add_month' : 'add_month_collection'
	},
	add_day_collection : function(){
		this.collection.create({day:this.collection.length+1});
	},
	add_day_view : function(new_model){
		var view = new DayView({model: new_model});
		view.render();
		$("#calendarDiv").append(view.$el);
	},
	add_month_collection : function(){
		var month_length = 31;
		for(var i = 0; i<month_length; i++){
			this.add_day_collection();
		}
	}
});

var dayCollection, dayCollectionView;
$(function(){
	dayCollection = new DayCollection();
	dayCollectionView = new DayCollectionView({collection : dayCollection});
	dayCollectionView.render();
	$("#calendarDiv").append(dayCollectionView.$el);
});

// var view;
// $(function(){
// //	view = new RedirectView();
// 	var router = new MyRouter();
// 	Backbone.history.start();
// });