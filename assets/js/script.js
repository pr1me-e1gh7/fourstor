// === DOM Elements === \\



// === Global Variables === \\
let googleApiUrl = "https://www.google.com/maps/embed/v1/place?key="
let gooogleApiKey = "AIzaSyDMVp6faydAIqb_c4tsvCUatzjBl-8_opI"
let googleApiCoords = "&q="

// === API's === \\

// yelp API
const yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
const yelpApiKeyAlex = "mdfoGE2ADA2HAGF1jXqSPCUPMlv8hHM45fs7eLpYp5yFwNZDlmtE6Swj0GX7k1jvwo1MYecnKRHZ9_nXhScJgG7dhGjyjMS-HfMpLh62OdG4X3hO7YA0FS6d5fXeYXYx";
const yelpApiKeyThiago;
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
        let businessName = data.businesses[0].name;
        let businessRating = data.businesses[0].rating;
        let businessReviews = data.businesses[0].review_count;
        let businessImageLink = data.businesses[0].image_url;
        let businessUrl = data.businesses[0].url;
        let businessCoords = data.businesses[0].coordinates;

        renderGoogleMap(businessCoords)

        console.log(businessImageLink);
        console.log(businessReviews);
        console.log(businessRating);
        console.log(businessName);
        console.log(businessUrl);
        console.log(businessCoords);
    })

// === Functions === \\
renderGoogleMap = (googleLocation) => {
    let long = googleLocation.longitude;
    console.log('this is in the function', long);
}


// === Init === \\
init = () => {
    
};

// === Event Listeners === \\




init();