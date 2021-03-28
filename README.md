# Project1
Campground Finder (Group Project 1)

## Table of Contents

* [Usage](#usage)
* [Acceptance Criteria](#Acceptance_Criteria)
* [Project Notes](#Project_Notes)
* [Project Description](#Project_Description)
* [Resources](#Resources)
* [Deliverable](#deliverable)
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
We started the initial project by voting on an app to create, and decided to use NPS API mixed with Weather and Google Maps apis.
Luke Paschka and Levi Schwartzberg acted as project leads, dividing the tasks between the front end (Luke Paschka & Isaiah Andrews) and the back end (Levi Schwartzberg & Kelsie Lewis).
We started each morning with a stand up to describe any development that was completed the night prior.
Everyone had access to the GitHub Repo to push and pull updated code as needed.

```

## Project_Description

```
Camp Finder is an app for people who love camping and getting outdoors. Camp Finder uses information from National Parks based on the nerest city location. 
This application will provide users with information about state parks located within a predetermined radius from the nearest city. Includes directions and local weather for the area.

```

## Resources

API <br />
Moment: https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js <br />
Google Maps: https://maps.googleapis.com/maps/api/js?key=AIzaSyARjVRs7-VKWm3Vrqio8iobfuDOx8IdWVE&callback=initMap&libraries=&v=weekly <br />
Weather: https://api.openweathermap.org/data/2.5/onecall <br />
National Parks Servicve: https://developer.nps.gov/api/v1/campgrounds


## Deliverable
![Screenshot](./assets/images/Screen_Capture_P1.png)
<br>
GitHub: https://github.com/lpaschka37/Project1<br />
Live Link:  https://lpaschka37.github.io/Project1/

## Roadmap

```
Roadmap
Future ideas for app imrovements:


Add addional search criteria features, such as parks by activity, or offer users addional options to narrow park search.
Allow for more returned results to paginate if results reach designated page limit.


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
