# Project1
Campground Finder (Group Project 1)

## Table of Contents

* [Usage](#usage)
* [Acceptance Criteria](#Acceptance_Criteria)
* [Project Notes](#Project_Notes)
* [Project Description](#Project_Description)
* [Resources](#Resources)
* [Deliverable](#deliverable)
* [Site Links](#Site_Links)
* [Roadmap](#Roadmap)
* [Authors](#Authors)
* [Badges](#Badges)

## Usage
```
AS A traveler
I WANT to see various campground sites near me.
I WANT to see local weather conditions.
I WANT to calculate distance from current to campground.
SO THAT I can plan a trip accordingly.

```

## Acceptance_Criteria

```
GIVEN Camp Finding Application
WHEN I search for a city display campground locations
THEN I am presented with a list of campground locations with in a predetermined radius.
WHEN I click "get Details" button I am taken to a new page.
THEN I am presented with additional campground details, directions and local weather forecast. 
WHEN I click "Back to Home" button I am returned to the home page.
THEN I can enter another city to search or choose a different campground. 

```

## Project_Notes

```
We started the initial project by everyone voting on an app to create,and decided as a team, to Feature the National Parks Service api for the pages main content , API for daily weather and forecast, and Google Maps Library using Distance matrix,Geocoding, and Javascript api's. We all performed stand ups daily dividing the tasks between the front end (Luke Paschka & Isaiah Andrews) and the back end (Levi Schwartzberg & Kelsie Lewis).
Everyone had access to the GitHub Repo to push and pull updated code as needed.
Everyone contributed immensely to the day to day workings of the group project, project leader is designated to Luke. Luke enthusiastically took on his role as Project manager. He set up group repo quickly, and arranged group meetings without hesitation,and he further managed group dynamics throughout. He contributed a lot of the intial html work and front end development, implementing a working bootstrap base for all the apis, along with his own weather api to the project. He consistently worked on improvements based on the needs of the group, and remained focused on getting all project details in line.
Kelsie took the lead in providing a working proof concept on day one,it featured 3 api's on the Google Maps Platform (distance matrix,geocoding,and maps javascript api), also implementing geolocation api, and weather api with current temp and 5 day forecast. After her initial contribution, Kelsie added extra api to get additional driving and biking  directions within the map. Kelsie also took an active role as a group liason,making sure the group was communicating needs to eachother in a consistent manner. Kelsie remained updated on current project progress, and consistently worked with members of her group, front end and back end, to offer suggestions about general page needs, and added some fine detail elements to page to make it more appealing. 
Levi was critical to back end development of then groups featured National parks api, and took the lead on getting all the api's to function well with eachother. He worked daily with other group members,offering them working tips and suggestions to help with front end issues, back end issues, repo questions,and many more.. Levi's knowledge base was very helpful to all aspects of the project, and his mentorship in some areas was crucial for getting the project working smoothly.
Isaiah offered to help with a lot of the fine tuning details of the project. He worked with image placement details and multiple styling aspects. With a front end focus in the beginning of project development, he quickly shifted to getting the project details squared away as group needs changed. Isiah helped often, by offering to to take the lead on any project needs not already addressed. Iasaih's contributions of creating an eye catching base for the groups presentation, and finalizing the last details made him an integral part of the group.

```

## Project_Description

```
Camp Finder is an app for people who love camping and getting outdoors. Camp Finder uses information from National Parks based on the nearest city location. 
This application will provide users with information about the closest state parks located nearest to the chosen city. Includes directions and local weather for the area.

```

## Resources

API <br />
Moment: https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js <br />
Google Maps: https://maps.googleapis.com/maps/api/js?key=AIzaSyARjVRs7-VKWm3Vrqio8iobfuDOx8IdWVE&callback=initMap&libraries=&v=weekly <br />
Weather: https://api.openweathermap.org/data/2.5/onecall <br />
National Parks Servicve: https://developer.nps.gov/api/v1/campgrounds


## Deliverable
Home Page:
![Screenshot](./assets/images/Screen_Capture_P1.PNG)

Main Page:
![Screenshot](./assets/images/Screenshot2_CampFinder.png)


## Site_Links

GitHub: https://github.com/lpaschka37/Project1<br />
Live Link:  https://lpaschka37.github.io/Project1/

## Roadmap

```
Roadmap
Future ideas for app improvements:


Add addional search criteria features, such as parks by activity, or offer users addional options to narrow park search.
Allow for more returned results to paginate if results reach designated page limit.
Allow previous search to remain on page after returing from redirect.


```


## Authors

Luke Paschka: https://github.com/lpaschka37 <br />
Kelsie Lewis: https://github.com/kelsie51 <br />
Levi Schwartzberg: https://github.com/Levischwartzberg <br />
Isaiah Andrews: https://github.com/IAndrew2



```
Copyright 2021 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## Badges

![Built with Javascript badge](https://img.shields.io/badge/Built_with-Javascript-green)
![Built with JQUERY badge](https://img.shields.io/badge/Built_with-jQuery-orange)
![Built with Bootstrap badge](https://img.shields.io/badge/Built_with-Bootstrap-red)
![Built with Moment.js badge](https://img.shields.io/badge/Built_with-Moment.js-yellow)
