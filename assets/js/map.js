
var hotelMap;
var stadiumMap;
var otherInfo = [];

// All stadium information
var stadiums = [
    {
        id: "aviva",
        name: "Aviva Stadium",
        location: {lat: 53.3352, lng: -6.2285},
        info: '<div id="content"><h4>Aviva Stadium</h4></div>'
    },
    {
        id: "twickenham",
        name: "Twickenham Stadium",
        location: {lat: 51.4559, lng: -0.3415},
        info: '<div id="content"><h4>Twickenham Stadium</h4></div>'
    },
    {
        id: "millennium",
        name: "Millennium Stadium",
        location: {lat: 51.4782, lng: -3.1826},
        info: '<div id="content"><h4>Millennium Stadium</h4></div>'
    },
    {
        id: "murrayfield",
        name: "Murrayfield Stadium",
        location: {lat: 55.9422, lng: -3.2409},
        info: '<div id="content"><h4>Murrayfield Stadium</h4></div>'
    },
    {
        id: "stade",
        name: "Stade de France",
        location: {lat: 48.92442731, lng: 2.36011326},
        info: '<div id="content"><h4>Stade de France</h4></div>'
    },
    {
        id: "stadio",
        name: "Stadio Olimpico",
        location: {lat: 41.9341, lng: 12.4547},
        info: '<div id="content"><h4>Stadio Olimpico</h4></div>'
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
            content: stadiums[i].info,
            maxWidth: 200
        });

        // When user clicks on the marker, show info bubble and update hotel map
        marker.addListener('click', function () {
            closeOtherInfo();
            infowindow.open(stadiumMap, marker);
            updateHotelsMap(stadium.id);
            otherInfo[0] = infowindow;
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

// Search for hotels around the stadium and update the hotels map
function updateHotelsMap(stadium) {
    alert('Showing hotels for '+stadium);
}

// Main function from index.html to initialise the maps
function initMap() {
    
    // Hotels Map
    hotelMap = new google.maps.Map(document.getElementById("hotels"), {
        zoom: 3,
        streetViewControl: true,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });
    
    // Stadiums Map
    stadiumMap = new google.maps.Map(document.getElementById("stadiums"), {
        zoom: 3,
        streetViewControl: false,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    addStadiums();
}