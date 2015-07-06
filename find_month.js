var month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "October", "November", "December"];
var month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var month = 0;

function find_month(day){
  if(day<31){
    for(var i = 0; i<month_days.length; i++){
      if(day>month_days[i]){ //if day 31 is more than the number of days in january
			  day -= month_days[i]; // day = 31 - 31 = 0
		  	month+=1;
		  }
	  }
  }
	for(var i = 0; i<month_list.length; i++){
		if(month===i){
			month = month_list[i];
		}
	}
	console.log("month: " + month + ", day: " + day);  
}
