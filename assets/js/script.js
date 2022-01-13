// === DOM Elements === \\


// === Global Variables === \\
let googleApiUrl = "https://www.google.com/maps/embed/v1/place?key="
let gooogleApiKey = "AIzaSyDMVp6faydAIqb_c4tsvCUatzjBl-8_opI"
let googleApiCoords = "&q="

// === API's === \\


// yelp API
const yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
const yelpApiKey = "YIugvR9QAxBbpeAbvG2mMthMtBYNpyF8T9RTWBTcVBqcCnf_H17UqVYCmU3KFC-PEQFFU90FZnTGhVs0UOS0YdEcU6iiwFPWERnkKd_8RXtkzsqs1aIbSMund0_gYXYx";
// vvv these are default parameters that will be dynamically updated via user input on the html page.
let yelpApiLocation = "fairfax";
let yelpApiCategory = "zoos";

// ! To gain access to data, go to herokuapp and request access
fetchBusiness = () => {
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
        renderCards(data);
    })
};

// === Functions === \\
// loops through an array and returns a card for each business up to 4
renderCards = (data) => {
    let cardRow = document.querySelector('#card-container')
    cardRow.textContent = '';
    
    for (let i = 0; i < 4; i++) {
        let random = randomNumber(data.businesses.length);
        let businessName = data.businesses[random].name;
        let businessRating = data.businesses[random].rating;
        let businessReviews = data.businesses[random].review_count;
        let businessImageLink = data.businesses[random].image_url;
        let businessUrl = data.businesses[random].url;
        let businessCoords = data.businesses[random].coordinates;
        let businessCategory = data.businesses[random].categories[0].title;
        let businessPrice = data.businesses[random].price;
    
    
        // TODO: add image link
        let card = `<div class="card flex-container flex-dir-row">
                        <img class="card-image" src="${businessImageLink}" alt="placeholder">
                        <div class="flex-container flex-dir-column">
                            <div class="card-divider">
                                <a class="card-link" href="${businessUrl}">
                                <h4 class="card-title">${businessName}</h4>
                                </a>    
                            </div>
                            <div class="card-content">
                                <p>
                                <span class="card-star-rating">${returnStars(businessRating)}</span><span class="card-review-count">${businessReviews}</span>
                                <a class="card-yelp-link" href="${businessUrl}">
                                    <img src="https://s3-media0.fl.yelpcdn.com/assets/public/cookbook.yji-7ef71bf77a3395dd1b44f31e354a2dbd.svg" alt="yelp logo">
                                </a>
                                </p>
                                <p><span class="card-category">${businessCategory}</span> <span class="card-price">${checkPrice(businessPrice)}</span></p>
                                <p class="card-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At dolorum ut laborum cumque dicta nisi culpa, cupiditate, voluptatibus ullam, autem repudiandae laudantium aperiam. Aliquid.</p>
                                <div>
                                <button class="button" onclick="location.href='${businessUrl}';">Visit Business</button>
                                </div>
                            </div>
                        </div>
                    </div>`
    
        cardRow.insertAdjacentHTML("beforeend", card);
    }


}

// returns a string of stars based on rating of business
returnStars = (rating) => {
    let stars = '';
    let ratingScore = Math.floor(rating);
    for (let i = 0; i < ratingScore; i++) {
        stars += '⭐';
    }
    return stars;
}

checkPrice = (price) => {
    if (price === undefined) {
        price = '';
    }
    return price;
}

randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

// === Init === \\
init = () => {
    
};

// === Event Listeners === \\




init();