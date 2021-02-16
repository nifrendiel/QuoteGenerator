// Id Constants
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
 if(!loader.hidden) {
     quoteContainer.hidden = false;
     loader.hidden = true;
 }
}

// API CALLS //

// Get Quote from API forsimatic: https://forismatic.com/en/api/
// TODO: create a dropdown menu to choose the language of the quote (lang=data)
async function getQuote() {
    showLoadingSpinner();
    // proxyUrl will help with CORS errors 
    const proxyUrl = 'https://damp-oasis-47838.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unknown' instead
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader -> show quote
        hideLoadingSpinner();
    } catch (error) {
        // if no quote, get a new one until you get a quote
        getQuote();
        console.log('whoops, no quote! Searching for a new quote. error : ', error);
    }
}

// Tweet Quote
// Get Twitter function from Twitter API: https://twitter.com/intent/tweet
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // opens new page to twitter so you can instantly tweet the quote
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();
