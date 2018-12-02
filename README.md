# Finding locations around
The script uses APIs that helps to view locations in a list, that can be filtered to identify specific locations, and view detail and corresponding locations on a Google map.  
***
### Installation 
Clone the Github repository from the following steps: 
```
$git clone the following Git link 
$cd 
```
### Usage

1.You will need to obtain a [Google Maps API KEY](https://developers.google.com) in order to upload a map. Once the API key is obtained, replace the *GOOGLE_MAPS_API_KEY* key with your Google Maps API key as shown. Add the **places** libraries as shown that can be used to provide detailed information about a particular location. 
```
<script async defer src="https://maps.googleapis.com/maps/api/js?key=GOOGLE_MAPS_API_KEY&libraries=places&v=3&callback=initMap">
</script>
```
2.[KnockoutJS library](https://knockoutjs.com/downloads/index.html) was added to the lib folder. The library was loaded in the *index.html* file
```
<script src="js/lib/knockout-3.2.0.js"></script>  
```
3 .In order to use the [Foursquare API](https://developer.foursquare.com/), sign up to obtain a client ID and key. You will add them in **CLIENT_ID** and **CLIENT_SECRET** respectively. The 'V' is the current date to be entered in the **YYYYMMDD** format.  
```
https://api.foursquare.com/v2/venues/search?parameters+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+"&v="+V
```
4.Add *jquery* script to the *index.html* file.
```
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>  
```
5.Open **index.html** file to load map.

6 .To change the location modify **locationMap** to the city coordinates you want to add 
```javascript
// Creating a variable to enter necessary information to create map 
var locationMap = { center: {lat: 17.686816, lng: 83.218482},
            zoom: 13,
            mapTypeControl: false
};
```
7.Add locations that you are interested, by hard-coding location names and co-ordinates you are interested in
```javascript
// Listing locations with titles and geocodes
var locations = [   
    {
        title:'Green Park Hotel Visakhapatnam', 
        // location:{lat:17.713882, lng:83.305155} 
        location:{lat:17.715709215080107, lng: 83.30631487005911}
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
        title:'Inox', 
        location:{lat:17.711196938507506, lng:83.31579141855502}
    },

    {   
        title:'Chandu Sweets', 
        location:{lat:17.724917, lng:83.306217}
    },
];
```
# Acknowledgment 

Some code here has been used, referred to or modified from the following:

1) [Udacity](https://mena.udacity.com/)
2) [Stackoverflow - filtering array from another array](https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects)
3) [Stackoverflow - filtering array based on query search ](https://stackoverflow.com/questions/47741328/filtering-list-with-knockout) 
4) [Knockout documentation](https://knockoutjs.com/documentation/click-binding.html)
5) [w3schools](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_display)







