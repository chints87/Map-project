
// Creating a variable to enter necessary information to create map 
var vizag_map = { center: {lat: 17.686816, lng: 83.218482},
       		zoom: 13,
       		mapTypeControl: false
};

var markers = [];

// Listing locations with titles and geocodes
var locations = [   
    {
        title:'Hotel Green Park', 
        location:{lat:17.713882, lng:83.305155}
    },
    {
        title:'VB', 
        location:{lat:17.7155120, lng:83.3121050}
    },

    {	
    	title:'IIM(Vizag)', 
    	location:{lat:17.723047, lng:83.326168}
    },

    {	
    	title:'Tap The Sports Bar', 
    	location:{lat:17.71084, lng:83.315786}
    },

    {	
    	title:'Chandu Sweets', 
    	location:{lat:17.724917, lng:83.306217}
    },

];


// {title:'Hindustan Shipyard', location:{lat:17.68, lng:83.21}},
// 17.724917,83.306217



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
            animation: google.maps.Animation.DROP,
            id:i
    	});

    	markers.push(marker);   
    	bounds.extend(markers[i].position);	
    }
    map.fitBounds(bounds);

};

var locationA = function(data){

    this.title = ko.observable(data.title);   

};

var LocationsViewModel = function(){
    var self = this; // this refers to the data-bind and self to the viewmodel

    this.locationList = ko.observableArray([]);
    this.query = ko.observable('');

    locations.forEach(function(locationSingle){
        self.locationList.push(new locationA(locationSingle));
    });

    self.filteredList = ko.computed(function() {
    	if(!self.query()){
    		return self.locationList();
    	} else {
    		 return self.locationList().filter(locationA => locationA.title().toLowerCase().indexOf(self.query().toLowerCase()) > -1);
    	};

    });
    
    
  



 //    var location_a = function(data){
    // this.title = ko.observable(location_a.title);
    // this.location = ko.observable(location_a.location);

 // }

    // this.title = ko.observable(locations.title); 

    // var self = this;

    // this.locationlist = ko.observableArray([]);

    // locations.forEach(function(singlelocation){
    //     self.locationlist.push(new location_a(singlelocation));
    // });

};

ko.applyBindings(new LocationsViewModel());

// Create list-box in html. ul
// Create data-bind with locations

