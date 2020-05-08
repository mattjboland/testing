var hotelMap;
var hotels;
var stadiumMap;
var otherInfo = [];

// All stadium information
var stadiums = [
    {
        name: "Aviva Stadium",
        location: {lat: 53.3352, lng: -6.2285},
        info: '<div id="content"><b>Aviva Stadium</b></div>'
    },
    {
        name: "Twickenham Stadium",
        location: {lat: 51.4559, lng: -0.3415},
        info: '<div id="content"><b>Twickenham Stadium</b></div>'
    },
    {
        name: "Millennium Stadium",
        location: {lat: 51.4782, lng: -3.1826},
        info: '<div id="content"><b>Millennium Stadium</b></div>'
    },
    {
        name: "Murrayfield Stadium",
        location: {lat: 55.9422, lng: -3.2409},
        info: '<div id="content"><b>Murrayfield Stadium</b></div>'
    },
    {
        name: "Stade de France",
        location: {lat: 48.92442731, lng: 2.36011326},
        info: '<div id="content"><b>Stade de France</b></div>'
    },
    {
        name: "Stadio Olimpico",
        location: {lat: 41.9341, lng: 12.4547},
        info: '<div id="content"><b>Stadio Olimpico</b></div>'
    }
];

// Add all the stadium markers
function addStadiums() {

    var stadiumMarkers = stadiums.map(function(stadium, i){
        
        // Add marker for each stadium
        var marker = new google.maps.Marker({
            map: stadiumMap,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: stadium.location,
            title: stadium.name,
            icon: 'assets/images/rugby_ball.png'
        });

        // Add info bubble
        var infowindow = new google.maps.InfoWindow({
            content: stadiums.info,
            maxWidth: 200
        });

        // When user clicks on the marker, show info bubble and update hotel map
        marker.addListener('click', function () {
            closeOtherInfo();
            infowindow.open(stadiumMap, marker);
            otherInfo[0] = infowindow;

            // Perform hotel search for this stadium
            updateHotelsMap(i);
        });

        return marker;
    });

    // Add the markers
    var stadiumMarkerCluster = new MarkerClusterer(stadiumMap, stadiumMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

// When clicking on a marker, close the open bubble 
function closeOtherInfo() {
    if (otherInfo.length > 0) {
        otherInfo[0].set("marker", null);
        otherInfo[0].close();
        otherInfo.length = 0;
    }
}

// Search for hotels around the stadium and move map to that location
function updateHotelsMap(stadiumIndex) {
    alert('Showing hotels for '+stadiums[stadiumIndex].name);
    hotelMap.panTo(stadiums[stadiumIndex].location);
    hotelMap.setZoom(15);
    search();
}

function search(){
    alert("Searching...");
    
    // Search for hotels in the selected city, within the viewport of the map.
    var search = {
        bounds: hotelMap.getBounds(),
        types: ['lodging']
    };

    hotels.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            //clearResults();
            //clearMarkers();
            
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            alert('found '+results.length+' hotels');

            /*
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
            });
            
            // If the user clicks a hotel marker, show the details of that hotel
            // in an info window.
            markers[i].placeResult = results[i];
            google.maps.event.addListener(markers[i], 'click', showInfoWindow);
            setTimeout(dropMarker(i), i * 100);
            addResult(results[i], i);
            */
        }
    });
}

// Main function from index.html to initialise the maps
function initMap() {
    
    // Hotels Map
    hotelMap = new google.maps.Map(document.getElementById("hotels"), {
        zoom: 3,
        streetViewControl: true,
        mapTypeControl: true,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    hotels = new google.maps.places.PlacesService(hotelMap);
    
    // Stadiums Map
    stadiumMap = new google.maps.Map(document.getElementById("stadiums"), {
        zoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: 'satellite',
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    addStadiums();
}

