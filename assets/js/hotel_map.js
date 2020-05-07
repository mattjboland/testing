function initMap() {
    var hotels = new google.maps.Map(document.getElementById("hotels"), {
        zoom: 3,
        center: {
            lat: 46.1341,
            lng: -4.7021,
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var titles = [
        "Aviva Stadium",
        "Twickenham Stadium",
        "Millennium Stadium",
        "Murrayfield Stadium",
        "Stade de France",
        "Stadio Olimpico"
    ];

    var locations = [
        {lat: 53.3352, lng: -6.2285},
        {lat: 51.4559, lng: -0.3415},
        {lat: 51.4782, lng: -3.1826},
        {lat: 55.9422, lng: -3.2409},
        {lat: 48.92442731, lng: 2.36011326},
        {lat: 41.9341, lng: 12.4547},
    ];

    var markers = locations.map(function(location, i){
        return new google.maps.Marker({
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            title: titles[i % titles.length],
            icon: 'assets/images/rugby_ball.png',
            //label: labels[i % labels.length]
        });
    });

    var hotelMmarkerCluster = new MarkerClusterer(hotels, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}