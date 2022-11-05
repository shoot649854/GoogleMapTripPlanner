/*
Calls the main render main map function

src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&region=JP&language=ja&callback=initMap">

Note: This example requires that you consent to location sharing when
prompted by your browser. If you see the error "The Geolocation service
failed.", it means you probably did not give permission for the browser to
locate you.

Google Map Api Key = "AIzaSyC0r6H3EIK7hH4I5G9gjtPJpuDX_MBdFFc"
*/

let map, infoWindow;
var service;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          initialize(pos.lat,pos.lng);

          console.log(`Device Latitude: ${position.coords.latitude}`);
          console.log(`Device Longitude: ${position.coords.longitude}`);

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          //initialize(pos.lat,pos.lng);

        },


        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );


    }

    else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });


}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// @ts-nocheck TODO remove when fixed
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
            }));
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            }
            else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}
window.initAutocomplete = initAutocomplete;


// function initialize(lat,lng) {
//   // Create the map.
//   const pyrmont = { lat: lat, lng: lng};
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: pyrmont,
//     zoom: 17,
//     mapId: "8d193001f940fde3",
//   });
//   // Create the places service.
//   service = new google.maps.places.PlacesService(map);
//   let getNextPage;
//   const moreButton = document.getElementById("more");

//   moreButton.onclick = function () {
//     moreButton.disabled = true;
//     if (getNextPage) {
//       getNextPage();
//     }
//   };

//   // Perform a nearby search.
//   service.nearbySearch(
//     { location: pyrmont, radius: 500, type: prompt("Enter your interest") },
//     (results, status, pagination) => {
//       if (status !== "OK" || !results) return;

//       addPlaces(results, map);
//       moreButton.disabled = !pagination || !pagination.hasNextPage;
//       if (pagination && pagination.hasNextPage) 
//       {
//         getNextPage = () => {
//           // Note: nextPage will call the same handler function as the initial call
//           pagination.nextPage();
//         };
//       }
//     }
//   );
// }

// function addPlaces(places, map) 
// {
//   const placesList = document.getElementById("places");

//   for (const place of places) 
//   {
//     if (place.geometry && place.geometry.location) 
//     {
//       const image = 
//       {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25),
//       };

//       new google.maps.Marker(
//       {
//         map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location,
//       });

//       const li = document.createElement("li");

//       li.textContent = place.name;
//       placesList.appendChild(li);
//       li.addEventListener("click", () => {map.setCenter(place.geometry.location);});
//     }
//   }
// }





// window.initMap = initMap;
