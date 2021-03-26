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


var campgroundName = globalData.name;
var parkName = globalData.id;


  //MAPS SECTION
  //lat and long for intial page load
	var parkLat = parseFloat(globalData.lat);
  var parkLon = parseFloat(globalData.lon);
  var lat1 = parkLat;
	var long1 = parkLon;

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
  initMap();
		
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
    //MAPS END
