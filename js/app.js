

var map = { center: {lat: 17.686816, lng: 83.218482},
       		zoom: 13,
       		mapTypeControl: false
};

function initMap(){
	build_map = new google.maps.Map(document.getElementById('map'),map);

}

// var map;

// function initMap() {
// // Constructor creates a new map - only center and zoom are required.
//     map = new google.maps.Map(document.getElementById('map'), {
//     	// Location of Vizag, India
//        center: {lat: 17.686816, lng: 83.218482},
//        zoom: 13,
//        mapTypeControl: false
// })
// };