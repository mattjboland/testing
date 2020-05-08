// Stadiums Map
var stadiumMap;
var otherInfo = [];
var stadiums = [
    {
        name: "Aviva Stadium",
        location: {lat: 53.3352, lng: -6.2285},
        info: '<div id="content"><b>Aviva Stadium</b><div id="bodyContent"><a id="avivaHotels" href="#" onclick="updateHotelsMap("aviva");return false;">Click here to see hotels nearby...</a></p></div>'
    },
    {
        name: "Twickenham Stadium",
        location: {lat: 51.4559, lng: -0.3415},
        info: '<div id="content"><b>Twickenham Stadium</b><div id="bodyContent"><a id="twickenhamHotels" href="#" onclick="updateHotelsMap("twickenham");return false;">Click here to see hotels nearby...</a></p></div>'
    },
    {
        name: "Millennium Stadium",
        location: {lat: 51.4782, lng: -3.1826},
        info: '<div id="content"><b>Millennium Stadium</b><div id="bodyContent"><a id="millenniumHotels" href="#" onclick="updateHotelsMap("millennium");return false;">Click here to see hotels nearby...</a></p></div>'
    },
    {
        name: "Murrayfield Stadium",
        location: {lat: 55.9422, lng: -3.2409},
        info: '<div id="content"><b>Murrayfield Stadium</b><div id="bodyContent"><a id="murrayfieldHotels" href="#" onclick="updateHotelsMap("murrayfield");return false;">Click here to see hotels nearby...</a></p></div>'
    },
    {
        name: "Stade de France",
        location: {lat: 48.92442731, lng: 2.36011326},
        info: '<div id="content"><b>Stade de France</b><div id="bodyContent"><a id="stadeHotels" href="#" onclick="updateHotelsMap("stade");return false;">Click here to see hotels nearby...</a></p></div>'
    },
    {
        name: "Stadio Olimpico",
        location: {lat: 41.9341, lng: 12.4547},
        info: '<div id="content"><b>Stadio Olimpico</b><div id="bodyContent"><a id="stadioHotels" href="#" onclick="updateHotelsMap("stadio");return false;">Click here to see hotels nearby...</a></p></div>'
    }
];

function addStadiums() {

    var stadiumMarkers = stadiums.map(function(stadium, i){

        var marker = new google.maps.Marker({
            map: stadiumMap,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: stadium.location,
            title: stadium.name,
            icon: 'assets/images/rugby_ball.png'
        });

        var infowindow = new google.maps.InfoWindow({
            content: stadiums[i].info,
            maxWidth: 200
        });

        marker.addListener('click', function () {
            closeOtherInfo();
            infowindow.open(stadiumMap, marker);
            otherInfo[0] = infowindow;
        });

        return marker;
    });

    var stadiumMarkerCluster = new MarkerClusterer(stadiumMap, stadiumMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

function closeOtherInfo() {
    if (otherInfo.length > 0) {
        otherInfo[0].set("marker", null);
        otherInfo[0].close();
        otherInfo.length = 0;
    }
}

function updateHotelsMap(stadium) {
    alert('Hotels for '+stadium);
}

function initMap() {

    stadiumMap = new google.maps.Map(document.getElementById("stadiums"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    addStadiums();
   
    // Hotels Map
    var hotelMap = new google.maps.Map(document.getElementById("hotels"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /*
    var hotelMarkers = stadiumLocations.map(function(location, i){
        return new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            label: labels[i % labels.length],
        });
    });

    var hotelMarkerCluster = new MarkerClusterer(hotelMap, hotelMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    */
}