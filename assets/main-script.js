window.onload = function () {
  var url = document.location.href,
      params = url.split('?')[1].split('&'),
      data = {}, tmp;
  for (var i = 0, l = params.length; i < l; i++) {
       tmp = params[i].split('=');
       data[tmp[0]] = tmp[1];
  }
  console.log(data);
  globalData = data;
  return globalData;
}
globalData = window.onload();
console.log(globalData);

var current = $("#current");
var forecast = $("#forecast");

  
  //lat and long for intial page load
	var parkLat = parseFloat(globalData.lat);
  var parkLon = parseFloat(globalData.lon);
  var lat1 = parkLat;
	var long1 = parkLon;

  callWeatherAPI();

  //MAPS SECTION
	//Geolocation API Start (gets user coordinates)
	//Came from w3 schools example. Modified for project
  navigator.geolocation.getCurrentPosition(success, error);

  function success(pos) {
    var crd = pos.coords;
    console.log("test");

    lat1 = crd.latitude;
    long1 = crd.longitude;
    initMap();
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("You dont have your location enabled in this browser.")
  }
		//Geolocation API end
  // initMap();
		
		//Google Distance Matrix API start (get distance and time between addresses)
		//Came from Google maps API documentation. Variables and objects changed for current project. 
		//Had to enable multiple APIs within Google Maps API
      function initMap() {	   
	      const bounds = new google.maps.LatLngBounds();
        const markersArray = [];

        var origin1 = { lat: lat1, lng: long1 };
		    console.log(origin1);
		
        var destinationA = { lat: parkLat, lng: parkLon};
       
        const destinationIcon =
          "https://chart.googleapis.com/chart?" +
          "chst=d_map_pin_letter&chld=D|FF0000|000000";
        const originIcon =
          "https://chart.googleapis.com/chart?" +
          "chst=d_map_pin_letter&chld=O|FFFF00|000000";
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: lat1, lng: long1 },
          zoom: 1,
        });
        const geocoder = new google.maps.Geocoder();
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
          },
          (response, status) => {
            if (status !== "OK") {
              alert("Error was: " + status);
            } else {
              const originList = response.originAddresses;
              const destinationList = response.destinationAddresses;
              const outputDiv = document.getElementById("output");
              outputDiv.innerHTML = "";
              deleteMarkers(markersArray);

              const showGeocodedAddressOnMap = function (asDestination) {
                const icon = asDestination ? destinationIcon : originIcon;

                return function (results, status) {
                  if (status === "OK") {
                    map.fitBounds(bounds.extend(results[0].geometry.location));
                    markersArray.push(
                      new google.maps.Marker({
                        map,
                        position: results[0].geometry.location,
                        icon: icon,
                      })
                    );
                  } else {
                    alert("Geocode was not successful due to: " + status);
                  }
                };
              };

              for (let i = 0; i < originList.length; i++) {
                const results = response.rows[i].elements;
                geocoder.geocode(
                  { address: originList[i] },
                  showGeocodedAddressOnMap(false)
                );

                for (let j = 0; j < results.length; j++) {
                  geocoder.geocode(
                    { address: destinationList[j] },
                    showGeocodedAddressOnMap(true)
                  );
                  outputDiv.innerHTML +=
                    originList[i] +
                    " to " +
                    destinationList[j] +
                    ": " +
                    results[j].distance.text +
                    " in " +
                    results[j].duration.text +
                    "<br>";
                }
              }
            }
          }
        );
      }

      function deleteMarkers(markersArray) {
        for (let i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }
	  //Google Distance Matrix API end

    function initdirections() {
      document.getElementById("map").innerHTML = "";
      document.getElementById("output").innerHTML = "";
      document.getElementById("mode").classList.remove("hide");
     // document.querySelector('#btnMap').innerHTML = 'Get Distance';
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: parkLat, lng: parkLon},
      });
      directionsRenderer.setMap(map);

      //Toggle logic
      if(document.querySelector('#btnMap').innerHTML === 'Get Directions')
      {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        document.querySelector('#btnMap').innerHTML = 'Get Distance';
        document.getElementById("mode").classList.remove("hide");
        document.getElementById("mapType").innerHTML="Directions";
        
      }
      else{
        initMap();
        document.querySelector('#btnMap').innerHTML = 'Get Directions';
        document.getElementById("mode").classList.add("hide");
        document.getElementById("mapType").innerHTML="Distance";
      }



      document.getElementById("mode").addEventListener("change", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
      });
      
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      const selectedMode = document.getElementById("mode").value;
      directionsService.route(
        {
          origin:{ lat: lat1, lng: long1 },
          destination: { lat: parkLat, lng: parkLon},
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode],
        },
        (response, status) => {
          if (status == "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }

    //MAPS END

//WEATHER SECTION
function callWeatherAPI() {
  var forecastArray = [];
  var lat = parkLat;
  var lon = parkLon;
  const currentUrl = new URL("https://api.openweathermap.org/data/2.5/onecall");
          
  currentUrl.searchParams.append("lat", lat)
  currentUrl.searchParams.append("lon", lon);
  currentUrl.searchParams.append("exclude", "minutely,hourly,alerts");
  currentUrl.searchParams.append("appid", "938321dd3faa29575b4452961279be81");


  fetch(currentUrl)
    .then(function (response) {          
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.current);
      var currentData = {
        temp: data.current.temp,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        uvi: data.current.uvi,
        icon: data.current.weather[0].icon
      };
      var forecastData = [];
      for (i = 1; i < 8; i++) {
        forecastData.push(
          {
            highTemp: data.daily[i].temp.max,
            lowTemp: data.daily[i].temp.min,
            humidity: data.daily[i].humidity,
            icon: data.daily[i].weather[0].icon
          }
        );
        }
          displayCurrentData(currentData);
          displayForecastData(forecastData);
    });
}

function displayCurrentData(data) {
  console.log(data);
  current.html(`
    <div class="row">
      <div class="weather-date-location col-6">
        <h3>${moment().format('dddd')}</h3>
        <p class="text-gray"> <span class="weather-date">${moment().format('MMMM Do, YYYY')}</span> </p>
        <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png">
      </div>
      <div class="weather-data d-flex col-6">
        <div class="mr-auto">
            <p class="daily-p"> Temperature: ${KtoF(data.temp)}&#176;F </p>
            <p class="daily-p"> Wind Speed: ${data.windSpeed} MPH </p>
            <p class="daily-p"> Humidity: ${data.humidity}% </p>
            <p class="daily-p"> <span class="${uviWarning(data.uvi)}"> UV Index: ${data.uvi} </span> </p>
        </div>
      </div>
    </div>`
  );
}

function displayForecastData(data) {
  console.log(data);
  for (i = 0; i < data.length; i++) {
      let day = moment().add(i+1,"days").format('ddd');
      forecast.children().children().eq(i).html(`
          <div class="forecastCard weekly-weather-item"> 
              <h5> 
                  ${day}
              </h5>
              <img src="http://openweathermap.org/img/wn/${data[i].icon}@2x.png">
              <p class="mb-0 forecast-p"> High: ${KtoF(data[i].highTemp)}&#176;F </p>
              <p class="mb-0 forecast-p"> Low: ${KtoF(data[i].lowTemp)}&#176;F </p>
          </div>   
      `)
  }
}

function KtoF(num) {
  return ( (num - 273) * 9/5 + 32 ).toFixed(1);
}

function uviWarning(uvi) {
  if (uvi <= 2) {
      return "low";
  }
  else if (uvi <= 5) {
      return "moderate";
  }
  else if (uvi <= 7) {
      return "high";
  }
  else {
      return "very-high";
  }
}

//DETAILS SECTION

function callNpAPI() {
  var campgroundName = globalData.name.replace("%20", " ");
  for (i=0; i<10; i++) {
    campgroundName = campgroundName.replace("%20", " ");
  }
  var parkName = globalData.id;
  var siteInfo = {
    description: "",
    image: "",
    amenities: ""
  };
  console.log(parkName);
  console.log(campgroundName);

  var link = "https://developer.nps.gov/api/v1/campgrounds";
  const requestUrl = new URL(link);

  //requestUrl.append( format.val() );
  requestUrl.searchParams.append("parkCode", parkName);
  requestUrl.searchParams.append("limit", "20");
  requestUrl.searchParams.append("api_key", "6SDR47MbfpKKDCjjWmITe9DOzwm3YU790sDLbeQZ" );

  console.log(requestUrl);

  fetch(requestUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (campdata) {
      console.log(campdata);
      for (i=0; i<campdata.data.length; i++) {
          if (campdata.data[i].name == campgroundName) {
            siteInfo = {
              description: campdata.data[i].description,
              image: campdata.data[i].images,
              amenities: campdata.data[i].amenities,
              siteName: campdata.data[i].name,
              url: campdata.data[i].url
            }
          }
      }
      displayInfo(siteInfo);
      console.log(siteInfo);
  });
}

function callNameAPI() {
  var link = "https://developer.nps.gov/api/v1/parks";
  const requestUrl = new URL(link);
  var parkNameId = globalData.id;
  var natParkName = $("#park-name");

  //requestUrl.append( format.val() );
  requestUrl.searchParams.append("parkCode", parkNameId);
  requestUrl.searchParams.append("limit", "20");
  requestUrl.searchParams.append("api_key", "6SDR47MbfpKKDCjjWmITe9DOzwm3YU790sDLbeQZ" );

  fetch(requestUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (parkdata) {
      console.log(parkdata);
      natParkName.text(parkdata.data[0].fullName);
  });
}

function displayInfo(siteInfo) {
    console.log(siteInfo);
    var imageUrl = "";
    var imageAlt = "";
    var image = $("#campsite-image");
    var description = $("#description");
    var campName = $("#campground-name");
    var amenities = $("ul");
    var parkLink = $("#link");

    if (siteInfo.image[0] == null) {
        imageUrl = "./assets/images/placeholder.gif";
        imageAlt = "Placeholder Image"
    }
    else {
        imageUrl = siteInfo.image[0].url;
        imageAlt = siteInfo.image[0].altText;
    }
    image.html(`
      <img id="campsite-image" src=${imageUrl} class="card-img-top" alt=${imageAlt}>
    `);
    description.text(siteInfo.description);
    campName.text(siteInfo.siteName);

    amenities.html(`
        <li> <span style="font-weight: bold"> Firewood For Sale?: </span> ${siteInfo.amenities.firewoodForSale} </li>
        <li> <span style="font-weight: bold"> Toilets: </span> ${siteInfo.amenities.toilets[0]} </li>
        <li> <span style="font-weight: bold"> Food Storage Lockers?: </span> ${siteInfo.amenities.foodStorageLockers} </li>
    `);

    parkLink.text(siteInfo.url);
    parkLink.attr("href", siteInfo.url);
}

callNpAPI();
callNameAPI();
