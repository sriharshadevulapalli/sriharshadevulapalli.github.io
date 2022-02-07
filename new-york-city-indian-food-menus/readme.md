# A look at the Indian Restaurant Scene in NYC

This repository contains the code for this [story](https://sriharshadevulapalli.github.io/new-york-city-indian-food-menus/index.html). The goal of this exercise was to find out what are the most popular and highly rated Indian restaurants in the region. It was also to find out the distribution of Indian restaurants and what kinds of food do restaurants offer based on data from the Yelp API and website. 

## Findings

Here is the distribution of Indian restaurants. 
 ![Map of Indian Restaurants in NYC region](/map_of_indian_restaurants_in_nyc.png)

## Data collection process

I used the Python Yelp API package to get the list of Indian restaurants. The API provided names, number of reviews, and rating counts. It did not however provide a list of menus. For that I wrote a selenium script that went to each page and extracted the menu items. I then plotted some basic charts with this. 

## Where I grew most in this project

I realized websites like Yelp are very insecure about scrapers. Using BS4 and requests is a sureshot way to get blocked by them. I'm still blocked by yelp. Selenium is a smarter way to get information without being blocked. 

## Limitations

This relies on Yelp alone, which might not be entirely representative. 
