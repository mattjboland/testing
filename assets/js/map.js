var hotelMap;
var hotels;
var hotelMarkers = [];
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
        name: "Principality Stadium",
        location: {lat: 51.4782, lng: -3.1826},
        info: '<div id="content"><b>Principality Stadium</b></div>'
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
            content: stadium.info,
            maxWidth: 200
        });

        // When user clicks on the marker, show info bubble and update hotel map
        marker.addListener('click', function () {
            closeOtherInfo();
            
            // Show the Stadium name bubble
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
    hotelMap.panTo(stadiums[stadiumIndex].location);
    hotelMap.setZoom(14);
    
    // Search for hotels in the selected city, within the viewport of the map.
    var search = {
        bounds: hotelMap.getBounds(),
        types: ['lodging']
    };

    hotels.nearbySearch(search, function(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearHotelMarkers();

            for (var i = 0; i < results.length; i++) {

                // Create a marker for each hotel found, and assign a letter for the icon label
                var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                
                hotelMarkers[i] = new google.maps.Marker({
                    draggable: false,
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: 'https://developers.google.com/maps/documentation/javascript/images/marker_green'+labels[i]+'.png',
                });
            
                // If the user clicks a hotel marker, show the details of that hotel in an info window.
                hotelMarkers[i].placeResult = results[i];
                //google.maps.event.addListener(hotelMarkers[i], 'click', showInfoWindow);
                setTimeout(dropHotelMarker(i), i * 100);
            }

            // Keep the stadium on the htoel results map so its easier to see where you are looking
            hotelMarkers[hotelMarkers.length] = new google.maps.Marker({
                draggable: false,
                animation: google.maps.Animation.DROP,
                position: stadiums[stadiumIndex].location,
                title: stadiums[stadiumIndex].name,
                icon: 'assets/images/rugby_ball.png'
            });
        }
    });
}

// Clear any existing hotel results
function clearHotelMarkers() {
    for (var i = 0; i < hotelMarkers.length; i++) {
        if (hotelMarkers[i]) {
            hotelMarkers[i].setMap(null);
        }
    }
    hotelMarkers = [];
}

function dropHotelMarker(i) {
    return function() {
        hotelMarkers[i].setMap(hotelMap);
    };
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