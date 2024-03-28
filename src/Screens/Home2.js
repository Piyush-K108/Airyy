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
import { FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {API_KEY} from '@env';
import debounce from 'lodash.debounce';
import {useSelector} from 'react-redux';
import Header from '../Components/Header';

export default function Home2() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');
  const location = useSelector(state => state.counter.location);

  
  const delayedSearch = useMemo(
    () =>
      debounce(text => {
        handleAutoComplete(text);
        
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
            countrySet: 'IND',
          },
        })
        .then(response => {
          const result = response.data.results[0];

          if (result && result.position) {
            const {position} = result;

            setMapCenter(`${position.lon},${position.lat}`);

            webRef.current.injectJavaScript(
              `LocationMarker.setLngLat([${parseFloat(
                position.lon,
              )}, ${parseFloat(position.lat)}]).addTo(map)`,
            );
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

 
      
       
  
  const handleAutoComplete = useCallback(query => {
    if (query === null || query === undefined || query === '') {
      return;
    }

    axios
      .get(`https://api.tomtom.com/search/2/autocomplete/${query}.json`, {
        params: {
          key: API_KEY,
          language: 'en-US',
          limit: 10,
        },
      })
      .then(response => {
        const results = response.data.results || [];
        const newSuggestions = results.map(result => {
          const brandSegment = result.segments.find(
            segment => segment.type === 'brand' && segment.value,
          );
          return brandSegment ? brandSegment.value : result.displayString || null;
        });
        setResults(newSuggestions);
      })
      .catch(error => {
        console.error('Error fetching autocomplete suggestions:', error);
      });
  }, []);

  const handleSearchSuggetions = useCallback(
    async query => {
      if (query === null || query === undefined || query === '') {
        return;
      }
  
      try {
        
        const response = await axios.get(
          `https://api.tomtom.com/search/2/search/${encodeURIComponent(
            query,
          )}.json?key=${API_KEY}&language=en-US&limit=5&lat=${mapCenter.lat}&lon=${mapCenter.lng}&radius=5000`,
        );
  
        const suggestions = response.data.results.map(result => ({
          id: result.id,
          text: result.address.freeformAddress,
        }));
        
        console.log('Search Suggestions:', suggestions);
  
        setResults(suggestions);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    },
    [],
  );
  

  const handleBook = () => {
    console.log(mapCenter);
  };

  const webRef = useRef(null);

  useEffect(() => {
    if (location) {
      const [latitude, longitude] = [
        location.coords.latitude,
        location.coords.longitude,
      ];
      webRef.current.injectJavaScript(
        `map.setCenter([${parseFloat(longitude)}, ${parseFloat(latitude)}])`,
      );
      webRef.current.injectJavaScript(
        `MyLocationMarker.setLngLat([${parseFloat(longitude)}, ${parseFloat(
          latitude,
        )}]).addTo(map)`,
      );
      webRef.current.injectJavaScript(
        `LocationMarker.setLngLat([${parseFloat(longitude)}, ${parseFloat(
          latitude,
        )}]).addTo(map)`,
      );
    }
  }, [location]);

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
