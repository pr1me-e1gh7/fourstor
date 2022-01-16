# FourSTOR

📌 [Link to Live Application](https://pr1me-e1gh7.github.io/fourstor/)

## 🌎 Project Description & Overview
**FourSTOR** is a business search engine with the goal to give every business an equal shot at being discovered by the user. With this application, there is no priority given to larger companies, and no ads that push their business to the top. With this tool, we hope that you are able to discover some of the lesser-known small businesses near you!

**FourSTOR** is powered by the [Yelp! Fusion API](https://www.yelp.com/developers/documentation/v3/get_started) in conjunction with the [Google Maps API](https://developers.google.com/maps/documentation) to provide a quick glance at a business based on category and location. We chose the Yelp! Fusion API based on it's incredibly detailed information that can be provided on a business based on location, category, and price range. The Google Maps API proved to be the top map generation API with it's robust documentation and ease of use.

This project greatly evolved over it's creation, and there is plenty left to add on. The original intention was for the application to *only* return small businesses, but unfortunately there doesn't seem to be an API dedicated to this. To counteract this, we decided to remove bias and give everyone a **fair chance at being discovered**. We also ran into many challenges regarding saving these businesses and providing a way to access the businesses personal website. The Yelp! Fusion API does not provide a way to access their website other than traversing through the Yelp! website.

In the future, we would love to implement the ability to only include small businesses. This would involve the team creating a robust and ever-changing list of large businesses to exclude. Some other smaller features include:
- Autocomplete for user search.
- Favorites page and the ability to "save" or "favorite" a business.
- Gather user location automatically without a prompt.
- Have users sign in with a Google account to save information across devices, not just locally

## 📎 How to Use FourSTOR
1. Open the application and enter the location that you are in, or that you would like to find businesses in. This location is saved locally, but can be overwritten later.
2. You are presented with the main UI, giving you four icons that you can press for popular category choices: Food, Fun, Active, Services. Select a category, or navigate to the top left of the application and enter a custom category.
3. The page will wipe and provide you with 4 cards of businesses that are randomly selected. The cards provide you with the name, rating, review count, and a link to the Yelp! page for that business.
4. If you click on a business card that you are interested in, the card on the right will populate with that businesses address, phone number, and location on a map.
5. If you do not like any of the provided businesses, simply press the button at the bottom of the app that says "Give me 4 more!".