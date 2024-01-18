import React, {useState, useRef} from 'react';
import {StyleSheet, View, TextInput, Text, Keyboard} from 'react-native';
import {WebView} from 'react-native-webview';
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
    console.log(lng,lat)
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
      <View styles={styles.header}>
        <Text style={styles.HomeHead2}>Which Place do you want to select?</Text>
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
    backgroundColor: '#feb101',
    height: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
  containerForSearch: {
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  inputForSearch: {
    fontSize: 20,
    marginLeft: 10,
    flex: 1,
  },
  HomeHead2: {
    fontSize: 18,
    color: '#888888',
    fontWeight: '600',
    fontFamily: 'Poppins-Light',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});
