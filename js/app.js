/*jshint esversion: 6 */
// Initailizing variable to enter interested location (Make reference to the geolocation utility tool)
"use strict";
var locationMap = {
    center: {
        lat: 17.686816,
        lng: 83.218482
    },
    zoom: 13,
    mapTypeControl: false
};

var markers = [];

// var check = [1,2,3];

//(Check if this requires to be hidden)
const CLIENT_ID = 'V4EOEMQUHFKPCJPPP41L412QV52QWXXINHYSPN3MWYEKLAII';
const CLIENT_SECRET = 'MZ1PW0XKIQSWLH2T1WKIQOIKRH45CEDTO1D5E51VPKG0BBDL';
const V = '20181126';
var map;
let displayWindow;
function initMap() {
    // Building new map
    map = new google.maps.Map(document.getElementById('map'), locationMap);
    // Create instances from classes in google maps api
    var bounds = new google.maps.LatLngBounds();
    displayWindow = new google.maps.InfoWindow();
    // Adding markers on the map with the locations
    for(let i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        // A location maker created is added to a collection of markers
        markers.push(marker);
        // An event listener that responds with animation and a display window when the marker on the map is clicked
        marker.addListener('click', function() {
            populateDisplayWindow(this, displayWindow);
            stopAnimation();
            this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout( () => this.setAnimation(null), 2000);
        });
        // (Extends map to include all markers)
        bounds.extend(markers[i].position);

    }
    // (Extends map to include all markers)
    map.fitBounds(bounds);

}

function mapError(){
    window.alert("There is an error loading the map");
}

// The viewmodel to connect view, what we see on the webpage
// to the model, data stored in the database or in the array for this
// case
var LocationsViewModel = function () {
    var self = this;

    // Connecting an element in HTML to model, in this case an array.
    this.locationList = ko.observableArray([]);
    this.query = ko.observable('');
    

    // //Initialization to assign view element with model data
    // var locationA = function (data) {
    //     this.title = ko.observable(data.title);
    // };

    //Creating view list from model array by creating elements
    //and assigning it with object-literal values from the model data
    locations.forEach(function(locationSingle){
        self.locationList.push(locationSingle);
    });
    // When clicked on a list item the corresponding marker is seen on the map
    self.markerAlert = function (selectedLoc) {
        // Stops the animation when another click event occurs.
        stopAnimation();
        // The clicked list item marker animates on the map
        for (var selectMarker in markers) {
            if (markers[selectMarker].title === selectedLoc.title) {
                markers[selectMarker].setAnimation(google.maps.Animation.BOUNCE);
                // Create new instance of infowindow                
                populateDisplayWindow(markers[selectMarker], displayWindow);
            }
        }

    };


    // Over here a filtered list is created depending on what information is entered in the search box.
    self.filteredList = ko.computed(function () {
        if (!self.query()) {
            // All markers are seen when nothing is entered in the search box and locations are seen in the list
            showListings();
            return self.locationList();
        } else {
            // All markers are initially hidden
            hideListings();
            // Depending on what is entered the corressponding matches are shown in the list
            var locationFiltered = self.locationList().filter(location => location.title.toLowerCase().indexOf(self.query().toLowerCase()) > -1);
            // Adding markers for those locations that are seen in the list
            for (var singleMarker in markers) {
                for (var singleLocation in locationFiltered) {
                    if (markers[singleMarker].title === locationFiltered[singleLocation].title) {
                        // Over here markers are seen based on which locations are filtered
                        markers[singleMarker].setMap(map);
                    }
                }
            }
            // The filtered list based on the query information is returned
            return locationFiltered;
        }


    });

};

//Activatation to connect view to model
ko.applyBindings(new LocationsViewModel());

//Displays all markers in th locations array on the map
function showListings() {
    // var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        // bounds.extend(markers[i].position)
    }
}

//Hides all markers in the locations array from the map
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

//Stops animation of all markers displayed on the map
function stopAnimation() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setAnimation(null);
    }

}

//Displays information in the infowindow of the marker
function populateDisplayWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.setContent('');
        infowindow.marker = marker;
        // Initialization to access endpoints of location from the Foursquare API.
        var addressURL = 'https://api.foursquare.com/v2/venues/search?ll=' + marker.position.lat() +
            ',' + marker.position.lng() + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + "&v=" + V;
        // Obtain address of the location from the Foursquare API and placing in the marker infowindow display
        $.getJSON(addressURL, function (data) {
            let locationAddress = data.response.venues[0].location.formattedAddress;
            infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + locationAddress + '</div>');
        //For a error response recieved from the FourSquare API a messeage is displayed in the infowindow
        }).error(function (e) {
            infowindow.setContent('<div>There was an error calling the API</div>');
        });
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
    }

}

//Toggles the viewlist when the navigation button is clicked
function toggle() {
    var nav = document.getElementById('nav');
    var optionsBox = document.getElementById('options-box');
    // var $mapdisplay = $("body .container #map");
    if (optionsBox.style.display === "none") {
        optionsBox.style.display = "block";
        nav.style.left = "330px";
    } else {
        optionsBox.style.display = "none";
        nav.style.left = "1px";
    }
}