function initMap() {
    var stadiumMap = new google.maps.Map(document.getElementById("stadiums"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    var stadiumTitles = [
        "Aviva Stadium",
        "Twickenham Stadium",
        "Millennium Stadium",
        "Murrayfield Stadium",
        "Stade de France",
        "Stadio Olimpico"
    ];

    var stadiumLocations = [
        {lat: 53.3352, lng: -6.2285},
        {lat: 51.4559, lng: -0.3415},
        {lat: 51.4782, lng: -3.1826},
        {lat: 55.9422, lng: -3.2409},
        {lat: 48.92442731, lng: 2.36011326},
        {lat: 41.9341, lng: 12.4547},
    ];

    function getInfo(position) {
        var stadiumInfo = [
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'},
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'},
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'},
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'},
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'},
            {'<div id="content"><h1 id="firstHeading" class="firstHeading">Uluru</h1><div id="bodyContent">'+
            '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'Click here to See Hotels nearby</a></p></div>'}
        ];
        return statiumInfo[poisiton];
    }

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    var stadiumMarkers = stadiumLocations.map(function(location, i){
        marker = new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            title: stadiumTitles[i % stadiumTitles.length],
            icon: 'assets/images/rugby_ball.png'
        });
        marker.addListener('click', function() {
          infowindow.open(stadiumMap, marker);
        });
        return marker;
    });

    var hotelMap = new google.maps.Map(document.getElementById("hotels"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var hotelMarkers = stadiumLocations.map(function(location, i){
        return new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            label: labels[i % labels.length],
        });
    });

    var stadiumMarkerCluster = new MarkerClusterer(stadiumMap, stadiumMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    var hotelMarkerCluster = new MarkerClusterer(hotelMap, hotelMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}