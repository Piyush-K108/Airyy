import {API_KEY} from '@env';
import logo from '../assets/Logos/finallogo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
          background-image: url(https://s3airyy.s3.ap-south-1.amazonaws.com/Icons/location-icon-png-4226-Windows.ico);
          background-size: cover;
          width: 35px;
          height: 40px;
        }
        #myLocationMarker {
          background-image: url(https://s3airyy.s3.ap-south-1.amazonaws.com/Icons/location-icon-png-4226-Windows.ico);
          background-size: cover;
          width: 35px;
          height: 40px;
        }
        #locationMarker {
          background-image: url(https://s3airyy.s3.ap-south-1.amazonaws.com/Icons/location-icon-png-4226-Windows.ico);
          background-size: cover;
          width: 35px;
          height: 40px;
        }
      
      </style>

      <div id='map'class='map'></div>
      <div id='marker'></div> 
      <div id='myLocationMarker'></div>
      <div id='locationMarker'></div>
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!-- load TomTom Maps Web SDK from CDN -->
      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

      <script>
      var RentalCoordinates = [75.86307247056808, 22.688188185263616];
       
      
      let map = tt.map({
        key: "${API_KEY}",
        container: 'map',
        center: RentalCoordinates,
        zoom: 15
      });

      var element = document.getElementById("marker");
      var element2 = document.getElementById("myLocationMarker");
      var element3 = document.getElementById("locationMarker");


      var customMarkerIcon = new tt.Marker({ element: element }).setLngLat(RentalCoordinates).addTo(map);

      var MyLocationMarker = new tt.Marker({ element: element2 });
      
      var LocationMarker = new tt.Marker({ element: element3 });

      
      
      var popupOffsets = {
        top: [0, 0],
        bottom: [0, -50],
        "bottom-right": [0, -70],
        "bottom-left": [0, -70],
        left: [25, -35],
        right: [-25, -35],
      };

      var popupContent = "<b>AiRYY Rides</b><br/>160/4, Bholaram Ustad Marg, Indrapuri Colony, Bhanwar Kuwa, Indore, Madhya Pradesh 452001";

      var popup = new tt.Popup({ offset: popupOffsets }).setHTML(popupContent);

      var mypopup = new tt.Popup({ offset: popupOffsets });

      customMarkerIcon.setPopup(popup).togglePopup();
      LocationMarker.setPopup(mypopup).togglePopup();
      MyLocationMarker.setPopup(mypopup).togglePopup();

      map.on('dragend', function() {
        let center = map.getCenter();
        window.ReactNativeWebView.postMessage(center.lng.toFixed(14) + ", " + center.lat.toFixed(14));
      });
      </script>

    </div>
`;

export default mapTemplate;
