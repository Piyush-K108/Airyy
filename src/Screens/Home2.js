import React, {useState,useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import {WebView} from 'react-native-webview';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import Header from '../Components/Header';


export default function Home2() {
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
    <>
      <View className="h-screen bg-yellow-200  flex flex-col">
        {/* Header */}
        <Header />

        {/* Text */}
        <View className="px-5 w-screen  ">
          <Text className="font-bold text-3xl text-[#121212] ">
            Find your favorite
          </Text>
          <Text className="font-bold text-3xl mt-2 text-[#121212]">Bikes!</Text>
          <Text className="text-[#121212] mt-3">
            Have a very pleasant experience
          </Text>
        </View>

        <View className="justify-center px-5 pt-8 pb-2 py-8 ">
          <View style={styles.searchBar__unclicked}>
            <TextInput
              style={styles.inputForSearch}
              placeholderTextColor={'#818181'}
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
              size={24}
              color="#666"
              style={{marginRight: 5}}
              onPress={() => {
                Keyboard.dismiss();
                onButtonClick();
              }}
            />
          </View>
        </View>

        {/* Map */}
        <View className="flex-1">
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
    marginLeft: 10,
    color: '#121212',
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