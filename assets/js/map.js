// Stadiums Map
var stadiums = [
    {
        name: "Aviva Stadium",
        location: [{lat: 53.3352, lng: -6.2285}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Aviva</h1><div id="bodyContent"><a href="https://www.google.ie>Click here to See Hotels nearby</a></p></div>',
    },
    {
        name: "Twickenham Stadium",
        location: [{lat: 51.4559, lng: -0.3415}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Twickenham</h1><div id="bodyContent"><a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">Click here to See Hotels nearby</a></p></div>'
    },
    {
        name: "Millennium Stadium",
        location: [{lat: 51.4782, lng: -3.1826}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Millennium</h1><div id="bodyContent"><a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">Click here to See Hotels nearby</a></p></div>'
    },
    {
        name: "Murrayfield Stadium",
        location: [{lat: 55.9422, lng: -3.2409}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Murrayfield</h1><div id="bodyContent"><a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">Click here to See Hotels nearby</a></p></div>'
    },
    {
        name: "Stade de France",
        location: [{lat: 48.92442731, lng: 2.36011326}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Stade de France</h1><div id="bodyContent"><a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">Click here to See Hotels nearby</a></p></div>'
    },
    {
        name: "Stadio Olimpico",
        location: [{lat: 41.9341, lng: 12.4547}],
        info: '<div id="content"><h1 id="firstHeading" class="firstHeading">Stadio Olimpico</h1><div id="bodyContent"><a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">Click here to See Hotels nearby</a></p></div>' 
    }
];

function addStadiums() {
    for (var i = 0; i < stadiums.length; i++) {

        const marker = new google.maps.Marker({
            //map: stadiumMap,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: stadiums[i].location[0],
            title: stadiums[i].name,
            icon: 'assets/images/rugby_ball.png'
        });

        const infowindow = new google.maps.InfoWindow({
            content: stadiums[i].info,
            maxWidth: 200
        });

        marker.addListener('click', function () {
            closeOtherInfo();
            infowindow.open(marker.get('stadiumMap'), marker);
            InforObj[0] = infowindow;
        });

    }
}

function closeOtherInfo() {
    if (InforObj.length > 0) {
        InforObj[0].set("marker", null);
        InforObj[0].close();
        InforObj.length = 0;
    }
}

function initMap() {

    var stadiumMap = new google.maps.Map(document.getElementById("stadiums"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    addStadiums();
    
    /*
    var stadiumMarkerCluster = new MarkerClusterer(stadiumMap, stadiumMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
    var stadiumMarkers = stadiums.map(function(stadium, i){
        marker = new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: stadium.location,
            title: stadium.name[i % stadiumTitles.length],
            icon: 'assets/images/rugby_ball.png'
        });

        var infowindow = new google.maps.InfoWindow({
            content: stadium.info,
            maxWidth: 200
        });

        marker.addListener('click', function() {
          infowindow.open(stadiumMap, marker);
        });
        return marker;
    });
    */
   
    // Hotels Map
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

    var hotelMarkerCluster = new MarkerClusterer(hotelMap, hotelMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}