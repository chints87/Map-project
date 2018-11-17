
// Creating a variable to enter necessary information to create map 
var vizag_map = { center: {lat: 17.686816, lng: 83.218482},
       		zoom: 13,
       		mapTypeControl: false
};

var markers = [];

// Listing locations with titles and geocodes
var locations = [
{title:'Varaha Laskmi Temple', location:{lat:15.238, lng:80.024}},
{title:'INS kursuna', location:{lat:17.71, lng:83.33}},
{title:'Hindustan Shipyard', location:{lat:17.68, lng:83.21}},
{title:'IIMV', location:{lat:17.723047, lng:83.326168}},	
];

function initMap(){
	// Building new map
	map = new google.maps.Map(document.getElementById('map'),vizag_map);

	var bounds = new google.maps.LatLngBounds();

    // Adding markers on the map with the locations
    for(var i = 0; i < locations.length; i++) {
    	var position = locations[i].location
    	var title = locations[i].title
    	var marker = new google.maps.Marker({
    		map:map,
    		position: position,
            title:title,
            animation: google.maps.Animation.BOUNCE,
            id:i
    	});

    	markers.push(marker);   
    	bounds.extend(markers[i].position);	
    }
    map.fitBounds(bounds);

 }

 // var location_a = function(data){

 //    this.title = ko.observable(data.title);
 //    this.location = ko.observable(data.location);

 // }

function LocationsViewModel(){

    // var locations = [
    // {title:'Varaha Laskmi Temple', location:{lat:15.238, lng:80.024}},
    // {title:'INS kursuna', location:{lat:17.71, lng:83.33}},
    // {title:'Hindustan Shipyard', location:{lat:17.68, lng:83.21}},
    // {title:'IIMV', location:{lat:17.723047, lng:83.326168}},    
    // ];


    var location_a = 
    {title:'Varaha Laskmi Temple', location:{lat:15.238, lng:80.024}};   
    

 //    var location_a = function(data){

    this.title = ko.observable(location_a.title);
    this.location = ko.observable(location_a.location);

 // }

    // this.title = ko.observable(locations.title); 

    // var self = this;

    // this.locationlist = ko.observableArray([]);

    // locations.forEach(function(singlelocation){
    //     self.locationlist.push(new location_a(singlelocation));
    // });

}

ko.applyBindings(new LocationsViewModel());

// Create list-box in html. ul
// Create data-bind with locations

