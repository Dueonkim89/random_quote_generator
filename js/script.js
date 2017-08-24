//global quotes array
var quotes = [
{ quote: "You can do anything but not everything", source: "David Allen", citation: "Making It All Work", 
year: 2009, category: 'inspiration' },
{ quote: "Si vis pacem, para bellum", source: 'Publius Flavius Vegetius Renatus', citation: "De Rie Militari",
year: '4th Century', category: 'philosophy' },
{ quote: 'Veni, Vidi, Vici', source: 'Julius Caesar', year: '47 BC', category: 'politics' },
{ quote: 'Far and away the best prize that life offers is the chance to work hard at work worth doing', 
source: 'Theodore Roosevelt', citation: 'A Square Deal', year: '1903', category: 'politics' },
{ quote: 'Success is the progressive realization of a worthy ideal', source: 'Earl Nightingale', 
citation: "The Strangest Secret", year: 1956, category: 'inspiration' },
{ quote: "The soul becomes dyed with the colour of its thoughts", source: 'Marcus Aurelius', 
citation: "Meditations", year: '2nd Century', category: 'philosophy' },
{ quote: "I can accept failure. Everyone fails at something. But I can't accept not trying.", source: 'Michael Jordan', 
citation: 'The Pursuit of Excellence', year: 1994, category: 'inspiration' }
];

//array to log previous random numbers
var randomNumberList = [];

// undefined variable to store the delayed quotes
var delayedQuotes;

//array to push the delayed auto-generated quotes
var numberOfDelays = [];

//array for background colors
var backGroundColorList = [ '#36b55c', '#8A2BE2', '#DC143C', '#FF1493', '#000', '#1E90FF', '#BDB76B' ];

//count variable
var count = 0;

// variables for the DOM, we will be constructing.
var quote = document.getElementsByClassName('quote')[0];
var source = document.getElementsByClassName('source')[0];


//function to return an original quote. (no duplicates unless count is over 6)
function getRandomQuote(count) {
	return quotes[randomNumberList[count]];
}

function printQuote(count) {
	var referenceNumber = getRandomQuote(count);
	// set bodybackground color based off number
	document.body.style.backgroundColor = backGroundColorList[randomNumberList[count]];
	//set the quote up.
	quote.innerText = referenceNumber.quote;
	source.innerText = '-' + referenceNumber.source + ',';
	var year = document.createElement("span"); 
	year.className = 'year';
	source.appendChild(year);
	year.innerText = ' ' + referenceNumber.year;	
	if (referenceNumber.citation !== undefined ) {
		var citation = document.createElement("span"); 
		citation.className = 'citation';	
		citation.innerText = ' ' + referenceNumber.citation + ',';
		source.insertBefore(citation, year);
	}	
}

//auto generate quotes after 5 secs.
function autoGenerate(count) {
	count += 1;
	//named function declaration for the set time out. 5 sec delay per quote.
	function setDelay(count, autoTimer) {
		delayedQuotes = setTimeout(function(){
							printQuote(count);
						}, 5000 * autoTimer);	
		numberOfDelays.push(delayedQuotes);					
	}
	
	//if count less than 7
	if (count < 7) {
		//for loop until we get to 6. increment the autoTimer and the count
		for (count, autoTimer = 1; count < 7; count++, autoTimer++) {
			setDelay(count, autoTimer);
		}
		// change global var count to 7. This is to make distinction between count parameter and global var count.
		window.count = 7;	
	// else 20 random quotes.	
	} else {
		for (i = 0, autoTimer = 1; i < 20; i++, autoTimer++) {
			setDelay(Math.floor((Math.random() * quotes.length)), autoTimer); 
		}
	}
}


//window load event, draw numbers ASAP.
window.onload = function drawNumbers() {
	while (randomNumberList.length < 7) {
		var number = Math.floor((Math.random() * quotes.length));
		if (randomNumberList.indexOf(number) > -1) {
			continue;	//much better than a recursive function. uses ALOT LESS CALL STACK!
		} else {
			randomNumberList.push(number);
		}
	}
	// KEEP IT DRY!!, count starts at 0. 
	printQuote(count);
};

//delegate event handler to respond to the different button click events.
document.addEventListener("click", function(event) {
	var loadQuoteButton = document.getElementById('loadQuote');
	if (event.target.id === 'disableAutomate') {
		//cancel all the set time outs if disabled button clicked.
		for (var i = 0; i < numberOfDelays.length; i++) {
				clearTimeout(numberOfDelays[i]);
		}
		numberOfDelays.length = 0;				
		//sync button settings
		loadQuoteButton.style.display = '';
		document.getElementById('disableAutomate').innerText = 'Auto-Generate Quote';
		document.getElementById('disableAutomate').id = 'automateQuote';			
	} else if (event.target.id === 'automateQuote') {
		//sync button settings
		loadQuoteButton.style.display = 'none';
		document.getElementById('automateQuote').innerText = 'Disable Auto-Generate';
		document.getElementById('automateQuote').id = 'disableAutomate';	
		//invoke the autoGenerate function.
		autoGenerate(count);
	} else if (event.target.id === 'loadQuote') {
		count += 1;
		//ternary operator, if count greater or equal to 7, run random number, else run order of count
		count >= 7 ? printQuote(Math.floor((Math.random() * quotes.length))) : printQuote(count);
	}
});
