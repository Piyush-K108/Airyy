import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import Header from '../Components/Header';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import {API_KEY} from "@env"
export default function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%','80%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');

  let webRef;

  const onButtonClick = () => {
    if (search.trim() !== '') {
      axios
        .get(`https://api.tomtom.com/search/2/search/${search}.json`, {
          params: {
            key: API_KEY,
            limit: 1, 
          },
        })
        .then((response) => {
          const result = response.data.results[0];
          if (result) {
            const { position } = result;
            setMapCenter(${position.lng},${position.lat});
            console.log(map.setCenter([${position.lng}, ${position.lat}]))
            // webRef.injectJavaScript(map.setCenter([${position.lng}, ${position.lat}]));
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  };

  const handleMapEvent = event => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.bottomSheetContent}>
          <Text className='text-red'> Awesome 🎉</Text>
          <Text className='text-black'>  Awesome 🎉</Text>
          <Text className='text-black'> Awesome 🎉</Text>
        </View>
      </BottomSheet>
      <View style={styles.mapContainer}>
        <WebView
          ref={(ref) => (webRef = ref)}
          onMessage={handleMapEvent}
          originWhitelist={['*']}
          source={{ html: mapTemplate }}
          allowsInlineMediaPlayback={true}
        />
      </View>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.navigate('LeftModel')}>
          <View style={styles.menuButton}>
            <MaterialIcons name="menu" size={32} color="#666" />
          </View>
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.inputForSearch}
              placeholderTextColor={'#818181'}
              placeholder="You Current Location"
              value={search}
              onChangeText={text => {
                setSearch(text);
                setResults([]);
              }}
            />
            <MaterialIcons
              name="search"
              size={24}
              color="#666"
              style={{ marginRight: 5 }}
              onPress={() => {
                Keyboard.dismiss();
                onButtonClick();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mapContainer: {
    flex: 1,
    zIndex: -10,
    backgroundColor: 'transparent',
  },
  overlay: {
    paddingHorizontal: 16,
    paddingTop: 38, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  menuButton: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 5,
    padding: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchBarContainer: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
});