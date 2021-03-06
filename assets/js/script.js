// === DOM Elements === \\
let mainEl = document.querySelector('main');
let animBackground = document.querySelector('.wrapper');
let foodBtn = document.querySelector('#food-btn');
let funBtn = document.querySelector('#fun-btn');
let shopBtn = document.querySelector('#shop-btn');
let cardContainer = document.querySelector('#card-container')
let mapContainer = document.querySelector('#map-container')
let servicesBtn = document.querySelector('#services-btn');
let searchInput = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search-btn');
let locationBtn = document.querySelector('#location-btn')
let modal = document.querySelector("#location-modal")
let modalClose = document.getElementsByClassName("close")[0];
let locationSubmitBtn = document.querySelector('#location-submit-btn')
let locationInput = document.querySelector('#location-input')

// === Global Variables === \\
let localLocation = localStorage.getItem('userLocation')
let availableTags = ['active','aquariums','arts','axethrowing','auto','bagels','bakeries','baseballfields','basketballcourts','beaches','beautysvc','bicycles','bikerentals','bowling','breweries','cabinetry','carpenters','childcare','coffee','contractors','donuts','education','electricians','eventservices','farmersmarket','financialservices','fishing','fitness','food','foodtrucks','gardeners','golf','gyms','gymnastics','handyman','health','hiking','homecleaning','homeservices','horsebackriding','hotelstravel','icecream','jetskis','karate','kickboxing','landscaping','lasertag','localflavor','localservices','makerspaces','martialarts','massmedia','movietheaters','muaythai','museums','musicinstrumentservices','nightlife','nonprofit','paintball','painters','pets','plumbing','professional','publicart','publicservicesgovt','realestate','religiousorgs','restaurants','shopping','streetvendors','taekwondo','tea','tennis','yoga'];

// handles the autocomplete functionality of the search input
$( function() {
    $( "#search-input" ).autocomplete({
        source: function(request, response) {
            var results = $.ui.autocomplete.filter(availableTags, request.term);
            // limits number of autocomplete responses to 12
            response(results.slice(0, 12));
        }
    });
});

// === API's === \\
// google API
const googleApiUrl = "https://www.google.com/maps/embed/v1/place?key="
const googleApiKey = "AIzaSyDMVp6faydAIqb_c4tsvCUatzjBl-8_opI"
const googleApiCoords = "&q="

// yelp API
const yelpApiUrl = "https://api.yelp.com/v3/businesses/search?";
const yelpApiKey = "YIugvR9QAxBbpeAbvG2mMthMtBYNpyF8T9RTWBTcVBqcCnf_H17UqVYCmU3KFC-PEQFFU90FZnTGhVs0UOS0YdEcU6iiwFPWERnkKd_8RXtkzsqs1aIbSMund0_gYXYx";

fetchBusiness = (category) => {
    let yelpApiCategory = category;

    fetch (`https://floating-headland-95050.herokuapp.com/${yelpApiUrl}location=${localLocation}&categories=${yelpApiCategory}&limit=40`, {
        headers: {
            'Authorization': `Bearer ${yelpApiKey}`,
            'Cache-Control': 'no-cache', 
        }
    })
        .then(response => response.json())
        .then(data => renderSearchPage(data))
};

// === Functions === \\

renderSearchPage = (data) => {
    // clears the page
    mainEl.textContent = '';
    animBackground.textContent = '';
    cardContainer.textContent = '';
    mapContainer.textContent = '';

    // checks to see if the category returns any results
    if (data.total === 0) {
        let errorDiv = document.createElement('div');
        let errorText = document.createElement('h2');
        let errorSubtext = document.createElement('p');

        errorText.textContent = 'Oops! It seems that your search doesn\'t have any results';
        errorSubtext.textContent = 'Try a different category term.';

        errorText.classList.add('error-title');
        errorSubtext.classList.add('error-subtitle')

        errorDiv.appendChild(errorText);
        errorDiv.appendChild(errorSubtext);

        mainEl.appendChild(errorDiv);

        return;
    }

    // renders search cards and map card
    renderCards(data);
    renderMapCard(data);

    // creates a "re-roll" button with some classes
    let refreshBtn = document.createElement('button');
    
    refreshBtn.classList.add('button');
    refreshBtn.classList.add('refresh-btn')
    refreshBtn.textContent = 'Give me 4 more!';
    refreshBtn.addEventListener('click', function () {
        renderSearchPage(data);
    })
    
    cardContainer.appendChild(refreshBtn);
}

// loops through an array and returns a card for each business up to 4
renderCards = (data) => {
    for (let i = 0; i < 4; i++) {
        let random = randomNumber(data.businesses.length);

        let businessName = data.businesses[random].name;
        let businessRating = data.businesses[random].rating;
        let businessReviews = data.businesses[random].review_count;
        let businessImageLink = data.businesses[random].image_url;
        let businessUrl = data.businesses[random].url;
        let businessCategory = data.businesses[random].categories[0].title;
        let businessPrice = data.businesses[random].price;

        let card = `<div class="card search-card flex-container flex-dir-row" data-index="${random}">
                        <img class="card-image" src="${businessImageLink}" alt="Uh oh! Looks like this business doesn't have a photo">
                        <div class="flex-container flex-dir-column card-info">
                            <div class="card-divider align-justify">
                                <a class="card-link" href="${businessUrl}">
                                <h4 class="card-title">${businessName}</h4>
                                </a>    
                                <button class="button button-like text-center" data-index="${random}">
                                    <i class="fa fa-heart" data-index="${random}"></i>
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
                                <div>
                                <button class="button" onclick="location.href='${businessUrl}';">Visit Business</button>
                                </div>
                            </div>
                        </div>
                    </div>`

        cardContainer.insertAdjacentHTML("beforeend", card);
    }

    // handles map card
    let cardEl = document.querySelectorAll('.search-card')

    for (let i = 0; i < cardEl.length; i++) {
        cardEl[i].addEventListener('click', function (e) {
            // ignore if like button is clicked
            if (e.target.nodeName == "BUTTON" || e.target.nodeName == "I") {
                return;
            }
            let index = this.dataset.index;
            renderMapCard(data, index);
        })
    }

    // handles map button
    let likeEl = document.querySelectorAll('.button-like')

    for (let i = 0; i < likeEl.length; i++) {
        likeEl[i].addEventListener('click', function (e) {
            if (e.target.nodeName == "BUTTON") {
                if (e.target.classList.contains("liked")) {
                    e.target.classList.remove("liked")
                }
                else {
                    e.target.classList.add("liked")
                }
            }
            else {
                if (e.target.parentNode.classList.contains("liked")) {
                    e.target.parentNode.classList.remove("liked")
                }
                else {
                    e.target.parentNode.classList.add("liked")
                }
            }
            let index = this.dataset.index;
            // * save for later
            // saveBusiness(data, index);
        })
    }

}

// * save for later 
// saveBusiness = (data, index) => {
// }

renderMapCard = (data, index) => {
    let cardIndex = index;

    if (cardIndex === undefined || cardIndex === null) {
        cardIndex = document.querySelector('#card-container').firstChild.dataset.index;
    }

    let mapRow = document.querySelector('#map-container')
    let businessName = data.businesses[cardIndex].name;
    let businessNameAlias = data.businesses[cardIndex].alias;
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
                        src="https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${businessNameAlias}&q=${businessCoords.latitude},${businessCoords.longitude}">
                    </iframe>
                </div>`

    mapRow.insertAdjacentHTML("beforeend", card);
}

// returns a string of stars based on rating of business
returnStars = (rating) => {
    let stars = '';
    let ratingScore = Math.floor(rating);
    for (let i = 0; i < ratingScore; i++) {
        stars += '???';
    }
    return stars;
}

// checks to see if a price is given
checkPrice = (price) => {
    if (price === undefined) {
        price = '';
    }
    return price;
}

// ==> This function gets the business name and replaces any blank spaces with + for the google link <==
googleName = (name) => {
    let newName = name.replace(/\s+/g, '+').toLowerCase()
    let newerName = newName.replace(/'/g, '')
    return newerName
}

// ==> This gets the Long and Lat from the yelp review and turns it into a usable string <==
googleCoords = (newCoords) => {
    let lat = newCoords.latitude
    let long = newCoords.longitude
    return `${lat},${long}`
}

randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

// === Init === \\
init = () => {
    if (localLocation == null) {
        modal.style.visibility = "visible"  
    }
 };

// === Event Listeners === \\

//checks if user input matches predefined categories
searchInput.addEventListener('input', function() {
    searchBtn.classList.remove('disabled');
    searchBtn.disabled = false;
})

searchBtn.addEventListener('click', function(e) {

    e.preventDefault();

    if (!availableTags.includes(searchInput.value)) {
        // stop function from running and give feedback
        searchBtn.classList.add('disabled');
        searchBtn.disabled = true;
        searchInput.value = '';
        searchInput.placeholder = 'Enter a valid category';
        searchInput.classList.add('invalid');
        return;
    }

    searchInput.placeholder = 'Category';
    searchInput.classList.remove('invalid');

    let searchValue = searchInput.value.trim().split(' ').join('').toLowerCase();
    searchInput.value = '';
    fetchBusiness(searchValue);
});

foodBtn.addEventListener('click', function () {
    fetchBusiness('food');
});

funBtn.addEventListener('click', function () {
    fetchBusiness('active');
});

shopBtn.addEventListener('click', function () {
    fetchBusiness('shopping');
});

servicesBtn.addEventListener('click', function () {
    fetchBusiness('homeservices');
});

locationBtn.addEventListener ('click', function(){
    modal.style.visibility = "visible"
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.visibility = "hidden";
    }
}

modalClose.onclick = function() {
    modal.style.visibility = "hidden";
}
 
locationSubmitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let locationValue = locationInput.value.trim().split(' ').join('').toLowerCase();
    locationInput.value = '';
    localStorage.setItem("userLocation", locationValue);
    localLocation = localStorage.getItem("userLocation");
    modal.style.visibility = "hidden";
    location.reload();
})

init();