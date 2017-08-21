//global quotes array
var quotes = [
{ quote: "You can do anything but not everything.", source: "David Allen", citation: "Making It All Work", 
year: 2009, category: 'inspiration' },
{ quote: "Si vis pacem, para bellum.", source: 'Publius Flavius Vegetius Renatus', citation: "De Rie Militari",
year: '4th Century', category: 'philosophy' },
{ quote: 'Veni Vidi Vici.', source: 'Julius Caesar', year: '47 BC', category: 'politics' },
{ quote: 'Nothing in this world can take the place of persistence. Talent will not; nothing is more common than \
unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; \
the world is full of educated derelicts. Persistence and determination alone are omnipotent.', year: '20th Century', 
category: 'politics'
},
{ quote: 'Success is the progressive realization of a worthy ideal.', source: 'Earl Nightingale', 
citation: "The Strangest Secret", year: 1956, category: 'inspiration' },
{ quote: "The soul becomes dyed with the colour of its thoughts.", source: 'Marcus Aurelius', 
citation: "Meditations", year: '2nd Century', category: 'philosophy' },
{ quote: "I can accept failure. Everyone fails at something. But I can't accept not trying.", source: 'Michael Jordan', 
citation: 'The Pursuit of Excellence', year: 1994, category: 'inspiration' }
];

//array to log previous random numbers
var randomNumberList = [];

//array for background colors
var backGroundColorList = [ '#36b55c', '#8A2BE2', '#DC143C', '#FF1493', '#000', '#1E90FF', '#BDB76B' ];

//count variable
var count;


//function to return an original quote. (no duplicates)
function getRandomQuote(count) {
	return quotes[randomNumberList[count]];
}

function printQuote(count) {
	randomNumberList.length === 7 ? randomNumberList.length = 0 : false;
	var referenceNumber = getRandomQuote(count);
	// set bodybackground color based off number
	document.body.style.backgroundColor = backGroundColorList[randomNumberList[count]];
	
	//set the quote up.
	
	console.log(referenceNumber);
	console.log(randomNumberList);
}

function autoGenerate() {
	//to be worked on.. use set time out
}


//window load event, draw numbers ASAP.
window.onload = function drawNumbers() {
	console.log('loaded');
	while (randomNumberList.length < 7) {
		var number = Math.floor((Math.random() * quotes.length));
		if (randomNumberList.indexOf(number) > -1) {
			continue;	//much better than a recursive function. uses ALOT LESS CALL STACK!
		} else {
			randomNumberList.push(number);
		}
	}
	console.log(randomNumberList);
	document.body.style.backgroundColor = backGroundColorList[randomNumberList[0]];
	
}


// event listener to respond to the different button click events.

//delegate event handler 
document.addEventListener("click", function(event) {
	var loadQuoteButton = document.getElementById('loadQuote');
	if (event.target.id === 'disableAutomate') {
		//cancel set time out
		
		loadQuoteButton.style.display = '';
		document.getElementById('disableAutomate').innerText = 'Auto-Generate Quote';
		document.getElementById('disableAutomate').id = 'automateQuote';			
	} else if (event.target.id === 'automateQuote') {
		loadQuoteButton.style.display = 'none';
		document.getElementById('automateQuote').innerText = 'Disable Auto-Generate';
		document.getElementById('automateQuote').id = 'disableAutomate';	
		//invoke the autoGenerate function.
	} else if (event.target.id === 'loadQuote') {
		count = 1;
		printQuote(count);
		count ++;
	}
});
