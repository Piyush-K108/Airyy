import { API_KEY } from "@env";
const mapTemplate = `
    <div>
      <style>
        html, body {
          margin: 0;
          touch-action: manipulation; 
        }

        #map {
          height: 100%;
          width: 100%;
        }
        
        #marker {
          width: 50px;
          height: 50px;
          background-color: black;
          border-radius: 100% ;
        }
        
      
      </style>

      <div id='map' class='map'></div>
      <div id='marker'></div> <!-- Add the marker div here -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- load TomTom Maps Web SDK from CDN -->
      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

      <script>
      var RentalCoordinates = [75.86304748375873, 22.688274356847113];

      
      let map = tt.map({
        key: "${API_KEY}",
        container: 'map',
        center: RentalCoordinates,
        zoom: 15
      });

      var element = document.getElementById("marker");
      var customMarkerIcon = new tt.Marker().setLngLat(RentalCoordinates).addTo(map);

      var MyLocationMarker = new tt.Marker();
      
      var popupOffsets = {
        top: [0, 0],
        bottom: [0, -70],
        "bottom-right": [0, -70],
        "bottom-left": [0, -70],
        left: [25, -35],
        right: [-25, -35],
      };

      var popupContent = "<b>AiRYY Rides</b><br/>160/4, Bholaram Ustad Marg, Indrapuri Colony, Bhanwar Kuwa, Indore, Madhya Pradesh 452001";

      var popup = new tt.Popup({ offset: popupOffsets }).setHTML(popupContent);

      var mypopup = new tt.Popup({ offset: popupOffsets });
      customMarkerIcon.setPopup(popup).togglePopup();
      MyLocationMarker.setPopup(mypopup).togglePopup();

      map.on('dragend', function() {
        let center = map.getCenter();
        window.ReactNativeWebView.postMessage(center.lng.toFixed(6) + ", " + center.lat.toFixed(6));
      });
      </script>

    </div>
`;

export default mapTemplate;
