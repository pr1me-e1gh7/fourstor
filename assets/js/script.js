// === DOM Elements === \\


// === Global Variables === \\
let googleApiUrl = "https://www.google.com/maps/embed/v1/place?key="
let googleApiKey = "AIzaSyDMVp6faydAIqb_c4tsvCUatzjBl-8_opI"
let googleApiCoords = "&q="

// === API's === \\


// yelp API
const yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
const yelpApiKey = "YIugvR9QAxBbpeAbvG2mMthMtBYNpyF8T9RTWBTcVBqcCnf_H17UqVYCmU3KFC-PEQFFU90FZnTGhVs0UOS0YdEcU6iiwFPWERnkKd_8RXtkzsqs1aIbSMund0_gYXYx";
// vvv these are default parameters that will be dynamically updated via user input on the html page.
let yelpApiLocation = "fairfax";
let yelpApiCategory = "zoos";

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
        renderCards(data);
    })

// === Functions === \\
// loops through an array and returns a card for each business up to 4
renderCards = (data) => {
    let cardRow = document.querySelector('#card-container')

    for (let i = 0; i < 4; i++) {
        let businessName = data.businesses[i].name;
        let businessRating = data.businesses[i].rating;
        let businessReviews = data.businesses[i].review_count;
        let businessImageLink = data.businesses[i].image_url;
        let businessUrl = data.businesses[i].url;
        let businessCoords = data.businesses[i].coordinates;
        let businessCategory = data.businesses[i].categories[0].title;
        let businessPrice = data.businesses[i].price;
    
    
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

            let googleCard = `<iframe
                                width="600"
                                height="700"
                                style="border:0"
                                loading="lazy"
                                allowfullscreen
                                src="https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${googleName(businessName)}&q=${googleCoords(businessCoords)}">
                            </iframe>`
    
                            console.log(googleCard)
        cardRow.insertAdjacentHTML("beforeend", card);
        cardRow.insertAdjacentHTML("beforeend", googleCard);
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

// ==> This function gets the business name and replaces any blank spaces with + for the google link <==
googleName = (name) => {
    let newName = name.replace(/\s+/g, '+').toLowerCase()
    let newerName = newName.replace(/'/g,'')
    console.log(newerName)
    return newerName
}

// ==> This gets the Long and Lat from the yelp review and turns it into a usable string <==
googleCoords = (newCoords) => {
    let lat = newCoords.latitude
    let long = newCoords.longitude
    console.log(`${lat},${long}`)
    return `${lat},${long}`
}


// === Init === \\
init = () => {
    
};

// === Event Listeners === \\




init();