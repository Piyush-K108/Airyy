import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  // FlatList,
  Image,
  Animated,
  // ScrollView,
} from 'react-native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {API_KEY} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';
import Checkbox from '../Components/Checkbox';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {fetchBikes} from '../Redux/Counter/counterAction';
import {useNavigation} from '@react-navigation/core';
import ScooterSelectionModal from '../Modals/ScooterSelectionModal';

import Header from '../Components/Header';

export default function Home2() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');
  const location = useSelector(state => state.counter.location);



  useEffect(() => {
    webRef.current.injectJavaScript(
      `map.setCenter([${parseFloat(location.coords.longitude)}, ${parseFloat(
        location.coords.latitude,
      )}])`,
    );
    setMapCenter(`${location.coords.latitude},${location.coords.longitude}`); 
  }, []);

  useEffect(() => {
    const [latitude, longitude] = mapCenter.split(',');
    webRef.current.injectJavaScript(
      `MyLocationMarker.setLngLat([${parseFloat(longitude)}, ${parseFloat(
        latitude,
      )}]).addTo(map)`,
    );
  }, [mapCenter]);


  const webRef = useRef(null);

  const delayedSearch = useMemo(
    () =>
      debounce(text => {
        handleSearchSuggestion(text);
      }, 500),
    [],
  );

  const onSearchChange = useCallback(
    text => {
      setSearch(text);
      setResults([]);
      delayedSearch(text);
    },
    [delayedSearch],
  );

  const onButtonClick = () => {
    if (search.trim() !== '') {
      axios
        .get(`https://api.tomtom.com/search/2/search/${search}.json`, {
          params: {
            key: API_KEY,
            limit: 1,
          },
        })
        .then(response => {
          const result = response.data.results[0];

          if (result && result.position) {
            const {position} = result;

            setMapCenter(`${position.lon},${position.lat}`);

            webRef.current.injectJavaScript(
              `map.setCenter([${parseFloat(position.lon)}, ${parseFloat(
                position.lat,
              )}])`,
            );
          } else {
            console.error('Invalid coordinates in search result:', result);
          }
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }

    setResults([]);
  };

  const handleMapEvent = event => {
    setMapCenter(event.nativeEvent.data);
  };

  const handleSearchSuggestion = useCallback(
    query => {
      if (query === null || query === undefined || query === '') {
        return;
      }

      const [latitude, longitude] = mapCenter.split(',');

      axios
        .get(`https://api.tomtom.com/search/2/autocomplete/${query}.json`, {
          params: {
            key: API_KEY,
            language: 'en-US',
            limit: 10,
            lat: `${latitude}`,
            lon: `${longitude}`,
            radius: 10000,
            countrySet: 'IND',
          },
        })
        .then(response => {
          console.log(JSON.stringify(response.data.results, null, 2));
          const suggestions = response.data.results.map(result => {
            // Get all segments
            const segments = result.segments.map(segment => {
              const {type, value, matches} = segment;
              return {type, value, matches};
            });

            // Filter out null values (invalid results)
            return segments.filter(segment => segment !== null);
          });

          console.log("das",suggestions);
          setResults(suggestions);
        })
        .catch(error => {
          console.error('Error fetching search suggestions:', error);
        });
    },
    [mapCenter],
  );

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
        <View className="flex flex-col">
          <View className="justify-center px-5 pt-8  pb-4 ">
            <View style={styles.searchBar__unclicked}>
              <TextInput
                style={styles.inputForSearch}
                placeholderTextColor={'#818181'}
                placeholder="Search"
                value={search}
                onChangeText={onSearchChange}
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
          {results.length > 0 && (
          <View className="mt-5 w-screen absolute top-20  z-10">
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View className="items-center w-screen border-black ">
                  <TouchableOpacity
                    onPress={() => {
                      setSearch(item);
                      
                      handleSearchSuggestion(item);
                    }}>
                    <Text className="text-black   border-b-2">{item}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
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
