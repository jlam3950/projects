const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() *  apiQuotes.length)];
    // authorText.textContent = quote.author;
    // Check if author field is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API 
async function getQuotes(){//can run independently w/o interferring with the browser loading the page
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    } catch (error){
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); 
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
