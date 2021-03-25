var citySearch = $("#citysearch");
var searchBtn = $("#searchBtn");
var searchForm = $("form");
var campsiteRow = $("#search-results");

var cityLat = "";
var cityLon = "";

var campSites = [];

searchForm.on("click", "#searchBtn", getCity);

//Calls city coordinate search after the search button is clicked for a city
function getCity() {
    event.preventDefault();
    var city = citySearch.val();
    callAPI(city);
}

//takes in city search to provide coordinate data, calls NP API after
function callAPI(city) {
    const forecastUrl = new URL("https://api.openweathermap.org/data/2.5/forecast");
    forecastUrl.searchParams.append("q", city);
    forecastUrl.searchParams.append("appid", "938321dd3faa29575b4452961279be81");

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLat = data.city.coord.lat;
            cityLon = data.city.coord.lon;
            console.log(cityLat);
            console.log(cityLon);
        })
        .then(function (response) {
            return callNpAPI();
        })
}

//calls the National Parks campsite api and follows with necessary calculations, sorting and display
function callNpAPI() {
    var link = "https://developer.nps.gov/api/v1/campgrounds";
    const requestUrl = new URL(link);

    //requestUrl.append( format.val() );
    requestUrl.searchParams.append("stateCode", "CA");
    requestUrl.searchParams.append("limit", "600");
    requestUrl.searchParams.append("api_key", "6SDR47MbfpKKDCjjWmITe9DOzwm3YU790sDLbeQZ" );

    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (campdata) {
        console.log(campdata);
        for (i=0; i<campdata.data.length; i++) {
            var siteData = {
                campid: campdata.data[i].parkCode,
                parkName: campdata.data[i].name,
                description: campdata.data[i].description,
                image: campdata.data[i].images, //array
                lat: campdata.data[i].latitude,
                lon: campdata.data[i].longitude,
                dist: 0
            }
            campSites.push(siteData);
        }
        populateDistArray(campSites);
        displayCampsites(campSites);
    });
}


//distance between two points on a sphere via haversine formula (https://www.movable-type.co.uk/scripts/latlong.html)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in meters
    return d;
}

//calculates distance for the distance key in the campsites array
function populateDistArray(array) {
    for (i=0; i<campSites.length; i++) {
        //to correct for errors in the API not making western hemisphere longitude values negative
        campSites[i].lon = Math.abs(campSites[i].lon) * -1;

        var dist = calculateDistance(parseInt(cityLat), parseInt(cityLon), parseInt(campSites[i].lat), parseInt(campSites[i].lon));
        dist /= 1609; //convert to miles
        campSites[i].dist = dist;
    }
    //console.log(campSites);
    console.log(orderArray(campSites));
}

//orders an array of objects by key, specifically distance in this case (hence .dist).
function orderArray(array) {
    newArray = array;
    
    function compare(a, b) {
        let num1 = a.dist;
        let num2 = b.dist;
        //console.log("num1:" + num1);
        //console.log("num2:" + num2);

        let comparison = 0;
        if (num1 > num2) {
            comparison = 1;
        } else if (num1 < num2) {
            comparison = -1;
        }
        return comparison;
    }
    newArray.sort(compare);
    return newArray;
}

//displays campsite data on the homepage
function displayCampsites(campSites) {
    for (i=0; i<12; i++) {
        var card = $("<div>");
        card.attr("class", "cust-card col-lg-4 col-md-6 col-sm-12");
        campsiteRow.append(card);
        var imageUrl = "";
        var imageAlt = "";
        if (campSites[i].image[0] == null) {
            imageUrl = "./assets/images/placeholder.gif";
            imageAlt = "Placeholder Image"
        }
        else {
            imageUrl = campSites[i].image[0].url;
            imageAlt = campSites[i].image[0].altText;
        }
        card.html(`
            <img src="${imageUrl}" class="card-img-top" alt="${imageAlt}">
            <div class="card-body">
                <h5 class="card-title">${campSites[i].parkName}</h5>
                <p class="card-text">${campSites[i].description}</p>                        
                <a href="main.html" class="btn btn-primary">Go somewhere</a>
            </div>
        `)
    }
}