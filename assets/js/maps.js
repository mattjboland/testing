function initMap() {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 3,
                center: {
                    lat: 46.1341,
                    lng: -4.7021,
                }
            });

            var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            var locations = [
                {lat: 53.3005098, lng:-6.2926092},
                {lat: 53.3352, lng: -6.2285},
                {lat: 51.4559, lng: -0.3415},
                {lat: 51.4782, lng: -3.1826},
                {lat: 55.9422, lng: -3.2409},
                {lat: 48.92442731, lng: 2.36011326},
                {lat: 41.9341, lng: 12.4547},
            ];

            var markers = locations.map(function(location, i){
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }