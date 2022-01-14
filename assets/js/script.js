// === DOM Elements === \\
let mainEl = document.querySelector('main');
let animBackground = document.querySelector('.wrapper');

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
        renderSearchPage(data)
    })
};

// === Functions === \\

renderSearchPage = (data) => {
    let searchPage = document.querySelector('#search-page-container');
    let cardContainer = document.querySelector('#card-container');
    let mapContainer = document.querySelector('#map-container')

    mainEl.textContent = '';
    animBackground.textContent = '';

    // renders search cards
    renderCards(data);
    renderMapCard(data);
    
}

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
        let card = `<div class="card search-card flex-container flex-dir-row" data-index="${random}">
                        <img class="card-image" src="${businessImageLink}" alt="placeholder">
                        <div class="flex-container flex-dir-column">
                            <div class="card-divider align-justify">
                                <a class="card-link" href="${businessUrl}">
                                <h4 class="card-title">${businessName}</h4>
                                </a>    
                                <button class="button button-like text-center">
                                    <i class="fa fa-heart"></i>
                                </button> 
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

            //  ? can this be deleted 
            // let googleCard = `<iframe
            //                     width="600"
            //                     height="700"
            //                     style="border:0"
            //                     loading="lazy"
            //                     allowfullscreen
            //                     src="https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${googleName(businessName)}&q=${googleCoords(businessCoords)}">
            //                 </iframe>`
    
        // console.log(googleCard)

        cardRow.insertAdjacentHTML("beforeend", card);
        // cardRow.insertAdjacentHTML("beforeend", googleCard);s
    }

    let cardEl = document.querySelectorAll('.search-card')

    for (let i = 0; i < cardEl.length; i++) {
        cardEl[i].addEventListener('click', function() {
            let index = this.dataset.index;
            renderMapCard(data, index);
        })
    }

    let likeEl = document.querySelectorAll('.button-like')

    for (let i = 0; i < likeEl.length; i++) {
    likeEl[i].addEventListener('click', function(e) {
        
        if (e.target.nodeName == "BUTTON") {
            if(e.target.classList.contains("liked")) {
                e.target.classList.remove("liked")
            }
            else {
                e.target.classList.add("liked")
            }
        }
        else {
            if(e.target.parentNode.classList.contains("liked")) {
                e.target.parentNode.classList.remove("liked")
            }
            else {
                e.target.parentNode.classList.add("liked")
            }
        }
    })}
    
}

renderMapCard = (data, index) => {
    let cardIndex = index;
    
    if (cardIndex === undefined || cardIndex === null) {
        cardIndex = document.querySelector('#card-container').firstChild.dataset.index;
    }
    console.log('index is', index);
    let mapRow = document.querySelector('#map-container')
    let businessName = data.businesses[cardIndex].name;
    let businessAddressOne = data.businesses[cardIndex].location.display_address[0];
    let businessAddressTwo = data.businesses[cardIndex].location.display_address[1];
    let businessPhone = data.businesses[cardIndex].display_phone;
    let businessCoords = data.businesses[cardIndex].coordinates;

    mapRow.textContent = '';

    let card = `<div class="card map-card">
                    <div class="card-divider">
                    <h4 class="card-title">${businessName}</h4>
                    </div>
                    <div class="card-content grid-x">
                    <div class="cell small-6 address">
                        <h5>Address</h5>
                        <p>${businessAddressOne} <br>${businessAddressTwo}</p>
                    </div>
                    <div class="cell small-6 phone">
                        <h5>Phone</h5>
                        <p>${businessPhone}</p>
                    </div>
                    
                    </div>
                    <iframe
                        width="100%"
                        height="700"
                        style="border:0"
                        loading="lazy"
                        allowfullscreen
                        src="https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${businessName}&q=${businessCoords.latitude},${businessCoords.longitude}">
                    </iframe>
                </div>`

    mapRow.insertAdjacentHTML("beforeend", card);
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
    // console.log(`${lat},${long}`)
    return `${lat},${long}`
}

randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

// ==> like change state function <== \\


// $(function() {
//   $('.button-like')
//     .bind('click', function(event) {
//       $(".button-like").toggleClass("liked");
//     })
// });

// === Init === \\
init = () => {
    
};

// === Event Listeners === \\




init();