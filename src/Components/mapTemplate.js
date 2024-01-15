import {API_KEY} from "@env"

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
      </style>

      <div id='map' class='map'></div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- load TomTom Maps Web SDK from CDN -->
      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

      <script>
        // create the map
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        let map = tt.map({
          key: "${API_KEY}",
          container: 'map',
          center: [75.8630678 , 22.6881149],
          zoom: 15
        });
        let zoomKeyPressCount = 0;

     
        map.on('dragend', function() {
          let center = map.getCenter();
          window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
        })
      </script>
    </div>
  `;

  export default mapTemplate;