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

//array for background colors
var backGroundColorList = [ '#36b55c', '#8A2BE2', '#DC143C', '#FF1493', '#000', '#1E90FF', '#BDB76B' ];

//count variable
var count = 0;

// variables for the DOM, we will be constructing.
var quote = document.getElementsByClassName('quote')[0];
var source = document.getElementsByClassName('source')[0];

//function to return an original quote. (no duplicates)
function getRandomQuote(count) {
	return quotes[randomNumberList[count]];
}

function printQuote(count) {
	var referenceNumber = getRandomQuote(count);
	// set bodybackground color based off number
	document.body.style.backgroundColor = backGroundColorList[randomNumberList[count]];
	//set the quote up.
	quote.innerText = quotes[randomNumberList[count]].quote;
	source.innerText = '-' + quotes[randomNumberList[count]].source + ',';
	var year = document.createElement("span"); 
	year.className = 'year';
	source.appendChild(year);
	year.innerText = ' ' + quotes[randomNumberList[count]].year;	
	if (quotes[randomNumberList[count]].citation !== undefined ) {
		var citation = document.createElement("span"); 
		citation.className = 'citation';	
		citation.innerText = ' ' + quotes[randomNumberList[count]].citation + ',';
		source.insertBefore(citation, year);
	}	
}

function autoGenerate() {
	//to be worked on.. use set time out
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
	// KEEP IT DRY!!
	printQuote(count);
}


//delegate event handler to respond to the different button click events.
document.addEventListener("click", function(event) {
	var loadQuoteButton = document.getElementById('loadQuote');
	if (event.target.id === 'disableAutomate') {
		//cancel set time out if disabled button clicked.
		
		loadQuoteButton.style.display = '';
		document.getElementById('disableAutomate').innerText = 'Auto-Generate Quote';
		document.getElementById('disableAutomate').id = 'automateQuote';			
	} else if (event.target.id === 'automateQuote') {
		loadQuoteButton.style.display = 'none';
		document.getElementById('automateQuote').innerText = 'Disable Auto-Generate';
		document.getElementById('automateQuote').id = 'disableAutomate';	
		//invoke the autoGenerate function.
		
	} else if (event.target.id === 'loadQuote') {
		count += 1;
		//ternary operator, if count greater or equal to 7, run random number, else run order of count
		count >= 7 ? printQuote(Math.floor((Math.random() * quotes.length))) : printQuote(count);
	}
});
