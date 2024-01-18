import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  Dimensions,
  Image ,
} from 'react-native';
import {WebView} from 'react-native-webview';
import user from '../images/userProfile.png'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import {useSelector} from 'react-redux';
import {API_KEY} from '@env';
export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');

  let webRef;

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(',');
    console.log(lng, lat);
    // const markerCode = `
    //   var marker = L.marker([${parseFloat(lat)}, ${parseFloat(lng)}]).addTo(map);`;
    // console.log(markerCode)
    // webRef.injectJavaScript(markerCode);
    webRef.injectJavaScript(
      `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`,
    );
  };

  const handleMapEvent = event => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginTop: 30,
            // paddingHorizontal: 0,
            // paddingVertical:40 ,
          }}>
          <View>
            <Text style={{color: '#000', fontSize: 18}}>Find your</Text>
            <Text style={{color: '#000', fontSize: 18}}>
              
              favorite motorcyle !
            </Text>
          </View>
          {/* This empty view takes up remaining space on the left */}
          <Image source={user} style={{width: 50, height: 50}} />
        </View>
        

        <View style={styles.containerForSearch}>
          <View style={styles.searchBar__unclicked}>
            <TextInput
              style={styles.inputForSearch}
              placeholder="Search"
              value={search}
              onChangeText={text => {
                setSearch(text);
                setResults([]);
                setMapCenter(text);
              }}
            />
            <MaterialIcons
              name="search"
              size={20}
              color="#666"
              style={{marginRight: 5}}
              onPress={() => {
                Keyboard.dismiss();
                onButtonClick();
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <WebView
          ref={webRef}
          onMessage={handleMapEvent}
          style={styles.map}
          originWhitelist={['*']}
          source={{html: mapTemplate}}
          allowsInlineMediaPlayback={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFFBA8',
    // backgroundColor: '#ff553e',
    backgroundColor: '#ffff',
  

   
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
    
  
  },
  containerForSearch: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '90%',
    // marginBottom: 10,
  },
  searchBar__unclicked: {
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffff',
    elevation: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  inputForSearch: {
    fontSize: 20,
    marginLeft: 10,
    color: 'black',
    flex: 1,
  },
  HomeHead2: {
    fontSize: 18,
    color: '#888888',
    fontWeight: '600',
    fontFamily: 'Poppins-Light',
    // marginBottom: 10,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 2,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});
