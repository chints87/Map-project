
// Creating a variable to enter necessary information to create map 
var vizag_map = { center: {lat: 17.686816, lng: 83.218482},
       		zoom: 13,
       		mapTypeControl: false
};

var markers = [];

var check = [1,2,3];

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
    var displayWindow = new google.maps.InfoWindow();

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
        marker.addListener('click', function(){
            populateDisplayWindow(this, displayWindow);
        });   
    	bounds.extend(markers[i].position);	

    }
    map.fitBounds(bounds);

};

// var locationA = function(data){

//     this.title = ko.observable(data.title); 
//     this.location = ko.observable(data.location);  

// };



var LocationsViewModel = function(){
    var self = this; // this refers to the data-bind and self to the viewmodel


    this.locationList = ko.observableArray([]);
    this.query = ko.observable('');

    var locationA = function(data){
    this.title = ko.observable(data.title); 
    // this.location = ko.observable(data.location); 
    }

    locations.forEach(function(locationSingle){
        self.locationList.push(new locationA(locationSingle));
    });
    // When clicked on a list item the corresponding marker is seen on the map
    this.markerAlert = function(selectedLoc){
    // Stops the animation when another click event occurs.
    stopAnimation();
    // The clicked list item marker animates on the map 
    for (var selectMarker in markers){
        if (markers[selectMarker].title === selectedLoc.title()){           
            return markers[selectMarker].setAnimation(google.maps.Animation.BOUNCE);
        };
    };
   
    };     

   
    // Over here a filtered list is created depending on what information is entered in the search box.
    self.filteredList = ko.computed(function() {    	
    	if(!self.query()){
            // All markers are seen when nothing is entered in the search box and locations are seen in the list
            showListings();
    		return self.locationList(); 
    	} else {
            // All markers are initially hidden
    		hideListings(); 
            // Depending on what is entered the corressponding matches are shown in the list   		
    		locationFiltered = self.locationList().filter(locationA => locationA.title().toLowerCase().indexOf(self.query().toLowerCase()) > -1);
            // Adding markers for those locations that are seen in the list
            var searchMarkers = [];
            // Over here based on which locations are filtered
            for(var singleMarker in markers){
                for (var singleLocation in locationFiltered){
                    if(markers[singleMarker].title === locationFiltered[singleLocation].title()){                        
                        searchMarkers.push(markers[singleMarker].map);
                    }
                }
            }            

            for(var searchMarker in searchMarkers){
                markers[searchMarker].setMap(map);
            }

            return locationFiltered
    	}; 

             
    }); 

};



ko.applyBindings(new LocationsViewModel());

function showListings(){
    // var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++){
        markers[i].setMap(map);
        // bounds.extend(markers[i].position)
    }
};

function hideListings(){
	for (var i = 0; i < markers.length; i++){
		markers[i].setMap(null);
	}
};

function stopAnimation(){
    for (var i = 0; i < markers.length; i++){
        markers[i].setAnimation(null);
    }

};

function populateDisplayWindow(marker, infowindow){
    if(infowindow.marker != marker){        
        infowindow.setContent('');
        infowindow.marker = marker;        
        infowindow.setContent('<div>' + marker.title + '</div>' );
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function(){
            infowindow.marker = null;
        });
    }

};

 // // Animate the marker on either selecting list item
    // $(document).ready(function() { 
    //     $("#location-list").children().on('click', function(){
    //             var $locationClicked = $("#location-list").children()[0].innerHTML;
    //             window.alert($locationClicked);
    //     });
    // });
