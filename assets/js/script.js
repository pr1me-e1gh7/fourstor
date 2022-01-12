// === DOM Elements === \\



// === Global Variables === \\



// === API's === \\

// yelp API
const yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
const yelpApiKey = "mdfoGE2ADA2HAGF1jXqSPCUPMlv8hHM45fs7eLpYp5yFwNZDlmtE6Swj0GX7k1jvwo1MYecnKRHZ9_nXhScJgG7dhGjyjMS-HfMpLh62OdG4X3hO7YA0FS6d5fXeYXYx";
// vvv these are default parameters that will be dynamically updated via user input on the html page.
let yelpApiLocation = "Orlando";
let yelpApiCategory = "coffee";
// TODO: find a way to limit number of businesses to <5

// ! To gain access to data, go to herokuapp and request access
fetch (`https://cors-anywhere.herokuapp.com/${yelpApiUrl}location=${yelpApiLocation}&categories=${yelpApiCategory}`, {
    headers: {
        'Authorization': `Bearer ${yelpApiKey}`,
        'Cache-Control': 'no-cache', 
    }
})
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })

// === Functions === \\



// === Init === \\
init = () => {
    
};

// === Event Listeners === \\




init();