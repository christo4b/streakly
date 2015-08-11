// Uncomment the following line and put in your firebase app name: 

var fb = new Firebase("https://streakly.firebaseio.com/");

//.on will take the event of 'value' and use the handler of the function
//the .val() will return all of the values from the snapshot from FB
//appData will store all of the values of the snapshot into an array called appData
//Then we'll use a forEach method on appData and call the makeBlock function for each element

var appData;
var whenDataLoaded = $.Deferred();


fb.on('value', function(snapshot) {
	$('.block').remove();

	if (snapshot && snapshot.val() && typeof snapshot.val() === 'object') {
		appData = snapshot.val();

		appData = _.uniq(appData, function(date) {
			return date.newDate;
		});
		
		appData.forEach(function (item, index, yesNo) {
				makeBlock(item, yesNo);	 
		});

	} else {
		appData = [];
	}
	whenDataLoaded.resolve();
});


function makeBlock(currentDay) {

	var momentObj = moment(currentDay.newDate, 'MM/DD/YYYY');
	var dayOfMonth = momentObj.date();
	var monthName = momentObj.format('MMMM');
	var year = momentObj.format('YYYY');
	
	if (currentDay.yesNo == "yes") {

		$('<div></div>')
			.append('<div>' + monthName + '</div>')
			.append('<div class="day-of-month">' + dayOfMonth + '</div>')
	        .append('<div class="year">' + year + '</div>')
	        .addClass('block yes-block')
		    .appendTo('body');
		} else {
			$('<div></div>')
			.append('<div>' + monthName + '</div>')
			.append('<div class="day-of-month">' + dayOfMonth + '</div>')
	        .append('<div class="year">' + year + '</div>')
	        .addClass('block no-block')
		    .appendTo('body');
		}

	};


function saveDate(newDate, yesNo) {
	whenDataLoaded.done(function() {
		if (appData) {
			appData.push({newDate, yesNo});
		} else {
			appData = [newDate];
		}
		fb.set(appData);
	});
}


$('.yes').click(function(event) {
	event.preventDefault();
	saveDate(moment().format('MM/DD/YYYY'), "yes");
});

$('.no').click(function(event) {
	event.preventDefault();
	saveDate(moment().format('MM/DD/YYYY'), "no");
});

function clearDate() {
	fb.set([]);
};










