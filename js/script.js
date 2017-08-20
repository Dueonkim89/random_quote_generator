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

//boolean value for duplicate
var duplicate = false;

//array for background colors
var backGroundColorList = [ '#36b55c', '#8A2BE2', '#DC143C', '#008B8B', '#D3D3D3', '#1E90FF', '#BDB76B' ];

//function to return an original quote. (no duplicates)
function getRandomQuote() {
	var number = Math.floor((Math.random() * quotes.length));
	for (i = 0; i <randomNumberList.length; i++) {
		if (randomNumberList[i] === number) {
			duplicate = true;
		}
	}
	if (duplicate) {
		return getRandomQuote();
	} else {
		randomNumberList.push(number);
		return number;
	}
}






// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

document.getElementById('automateQuote').addEventListener("click", printQuote, false);