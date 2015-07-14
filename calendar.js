_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
}

var DayModel = Backbone.Model.extend({
	defaults : {"day" : 0, "date" : "", "event": ""}, //value will represent the date of a month
	replace : function(number, str_event){
		this.find_date(number);
		this.set({"day" : number, "date": day_num_date, "event": str_event});
		this.save();
	},
	find_date: function(num){
		var month = "";
		var date = "";
		if(day_num<32){
			month = "January";
			date = day_num;
		} else if (day_num<60){
			month = "February";
			date = day_num - 31;// day_number - last months days
		} else if(day_num<91){
			month = "March";
			date = day_num - 59;
		} else if(day_num<121){
			month = "April";
			date = day_num - 90;
		}else if(day_num<152){
			month = "May";
			date = day_num - 120;
		}else if(day_num<182){
			month = "June";
			date = day_num - 151;
		}else if(day_num<213){
			month = "July";
			date = day_num - 181;
		}else if(day_num<244){
			month = "August";
			date = day_num - 212;
		}else if(day_num<274){
			month = "September";
			date = day_num - 243;
		}else if(day_num<305){
			month = "October";
			date = day_num - 273;
		}else if(day_num<335){
			month = "November";
			date = day_num - 304;
		} else if (day_num<365){
			month = "December";
			date = day_num - 334;
		}
		var day_num_date = "Date : " + month + " " + date + ", 2015.";
		var err = "That day is not in 2015";
		console.log(err || day_num_date);
	},
	replace : function(number, str_event){
		this.set({"day" : number, "date": "", "event": str_event});
		this.save();
	}
});

var DayView = Backbone.View.extend({
	// el: '#dayDiv',
	render	: function(){
		// var template = _.template('<div class="day"><p id="date">{{day_value}}</p><br><p>{{event_value}}<p><br><input type="text" class="event"></input><button type="submit" id="add_event">Add Event</button></div>');
		var template = _.template('<p id="date">{{day_value}}</p><br><p>{{event_value}}<p><br><input type="text" class="event"></input><button type="submit" id="add_event">Add Event</button>');
		this.$el.addClass("day").html(
			template(
				{
					day_value : this.model.get("day"), 
					event_value: this.model.get("event")
				}
			)
		);
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
	el: '#calendarDiv',
	render : function(){
		var template = _.template('<div><button type="submit" id="add_day">Add Day</button><button type"submit" id="add_month">Add Month</button></div>');
		this.$el.html(template());
		// var add_day_btn = '<button type="submit" id="add_day">Add Day</button>';
		// var add_month_btn = '<button type"submit" id="add_month">Add Month</button>';
		// this.$el.html(add_day_btn + add_month_btn);
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

var MyRouter = Backbone.Router.extend({
	routes: {
		'': 'dayCollection',
		'day' : 'dayView',
		'dayCollection': 'dayCollection'
	},
	display: function(){
		this.view.render();
	},
	day: function(){
		this.view = new DayView();
	},
	dayCollection: function(){
		this.view = new DayCollectionView({collection: dayCollection});
	}
});

// var view;
// $(function(){
// //	view = new RedirectView();
// 	var router = new MyRouter();
// 	Backbone.history.start();
// });