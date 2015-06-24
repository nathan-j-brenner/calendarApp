//model for day
var DayModel = Backbone.Model.extend({
	defaults : {"value" : 0} //value will represent the date of a month
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


var day_model1, day_view1;
$(document).ready(function(){
	day_model1 = new DayModel();
	day_view1 = new DayView({model: day_model1});
	day_view1.render();
	$("#calendarDiv").append(day_view1.$el);
});