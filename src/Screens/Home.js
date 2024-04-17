import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicans from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {API_KEY} from '@env';
import debounce from 'lodash.debounce';
import Checkbox from '../Components/Checkbox';
import {useSelector,useDispatch} from 'react-redux';
import {fetchBikes} from '../Redux/Counter/counterAction';
import Available from '../assets/available.png'
import NotAvailable from '../assets/stop.png'
import ScooterSelectionModal from '../Modals/ScooterSelectionModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const bottomSheetRef = useRef(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const [IsPatrol, setIsPatrol] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const Bikes = useSelector(state => state.counter.bikes);
  const [ShowBikes, setShowBikes] = useState(Bikes);
  const [mapCenter, setMapCenter] = useState('');
  const dispatch = useDispatch();
  const location = useSelector(state => state.counter.location);
  const mapHTML = useSelector(state => state.counter.mapHTML);
 const [buttonTop, setButtonTop] = useState(new Animated.Value(660));


  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.bikeCard}
      onPress={() => {
        const selectedBike = Bikes.find(bike => bike.b_id === item.b_id);
        if (selectedBike) {
          navigation.navigate('BikeDetails', {selectedBike});
        }
      }}>
      <View className="flex flex-col items-center">
        <View className="flex flex-row items-center w-full justify-between">
          <Text style={styles.bikeName}>{item.b_id}</Text>
          {/* Display availability status based on is_assigned */}
          {item.is_assigned ? (
            <Image source={NotAvailable} className="w-[20px] h-[20px]" />
          ) : (
            <Image source={Available} className="w-[35px] h-[35px]" />
          )}
        </View>

        {/* <Text>Available</Text> */}
        <Image
          resizeMode="cover"
          source={{uri: item.Image}}
          className="w-[80px] h-[80px]"
        />
      </View>
    </TouchableOpacity>
  );

  const handleCheckboxPress = value => {
    let filteredBikes = ShowBikes;
    if (value) {
      filteredBikes = Bikes.filter(bike => bike.Electrical === false);
      setShowBikes(filteredBikes);
    } else {
      setShowBikes(Bikes);
    }
    if (!isChecked2) {
      setShowBikes(Bikes);
    }
  };

  const handleCheckboxPress2 = value => {
    let filteredBikes2 = ShowBikes;
    if (value) {
      filteredBikes2 = Bikes.filter(bike => bike.Electrical === true);
      
      setShowBikes(filteredBikes2);
    } else {
      setShowBikes(Bikes);
    }
    if (!isChecked) {
      setShowBikes(Bikes);
    }
  };


  const snapPoints = useMemo(() => ['10%', '25%', '50%', '80%'], []);

 const handleSheetChanges = useCallback(
   index => {
     // Calculate the buttonTop value based on the bottom sheet's current index
     let newButtonTop;
     switch (index) {
       case 0:
         newButtonTop = 660; // Index 0 -> Top value of 660
         break;
       case 1:
         newButtonTop = 540; // Index 1 -> Top value of 540
         break;
       case 2:
         newButtonTop = 340; // Index 2 -> Top value of 340
         break;
       case 3:
         newButtonTop = 100; // Index 3 -> Top value of 100
         break;
       default:
         newButtonTop = buttonTop._value; // Default to the current buttonTop value
         break;
     }

     // Animate buttonTop to the new value
     Animated.spring(buttonTop, {
       toValue: newButtonTop,
       useNativeDriver: false,
     }).start();
   },
   [buttonTop],
 );

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
  

  const handleStation = () => {
   navigation.navigate('StationLocation');
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

    const animatedBorderRadius = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const animateBorder = Animated.loop(
        Animated.timing(animatedBorderRadius, {
          toValue: 1,
          duration: 1000, 
          useNativeDriver: false, 
        }),
      );

      animateBorder.start();

      return () => {
        animateBorder.stop();
      };
    }, [animatedBorderRadius]);
   

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          ref={webRef}
          onMessage={handleMapEvent}
          originWhitelist={['*']}
          source={{html: mapHTML}}
          allowsInlineMediaPlayback={true}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: buttonTop,
            right: 20,
            margin: 'auto',
            flexDirection: 'row',
            backgroundColor: '#000',
            alignItems: 'center',
            padding: 10,
            borderRadius: 15,
            elevation: 5,
          }}>
          <TouchableOpacity onPress={handleStation}>
            <Ionicons
              style={{color: '#facc15'}}
              name="navigate-circle-outline"
              size={30}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheet}
        gestureEnabled={true}>
        <LinearGradient
          colors={['white', '#e5e7eb']}
          style={styles.bottomSheetContent}>
          <View className="flex flex-row justify-between px-2 ">
            <Text className="text-black font-semibold">Filter Vehicle</Text>
            <Checkbox
              label="EV"
              value={isChecked}
              onPress={() => {
                setIsChecked(!isChecked);
                handleCheckboxPress(isChecked);
              }}
            />

            <View className="flex flex-col">
              <Checkbox
                label="Petrol"
                value={isChecked2}
                onPress={() => {
                  setIsChecked2(!isChecked2);
                  handleCheckboxPress2(isChecked2);
                }}
              />
              <ScooterSelectionModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={scooterType => setSelectedScooter(scooterType)}
              />
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={ShowBikes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.bikeList}
          style={{height: '100%'}}
          // nestedScrollEnabled={true}
        />
      </BottomSheet>

      <View style={styles.overlay}>
        <View className="flex flex-row justify-between">
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
        </View>

        {results.length > 0 && (
          <View
            className="mt-2 ml-12 h-[120px]  w-[300px] flex items-center bg-white rounded-lg "
            style={{elevation: 1}}>
            <FlatList
              data={results}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View className="flex flex-row justify-between items-center gap-24 py-2">
                  <TouchableOpacity
                    onPress={() => {
                      setSearch(item);

                      handleAutoComplete(item);
                    }}
                    className="flex flex-col border-black ">
                    <Text className="text-black">{item}</Text>
                  </TouchableOpacity>
                  <Ionicans name="arrow-undo-outline" size={22} color="#000" />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection: 'column',
  },
  // bottomSheet: {
  //   // flex: 2,
  //   // flexDirection: 'column',
  //   // position: 'absolute',
  //   justifyContent: 'center',
  //   // width: '100%',

  //   alignItems: 'center',
  // },
  // bottomSheet: {
  //   // flex: 2,
  //   // flexDirection: 'column',
  //   // position: 'absolute',
  //   justifyContent: 'center',
  //   // width: '100%',

  //   alignItems: 'center',
  // },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    padding: 9,
  },
  bottomSheetContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginLeft: 18,
    marginRight: 18,
    elevation: 1,
    height: 80,
    marginBottom: 20,

    borderRadius: 20,
  },
  mapContainer: {
    flex: 1,
    zIndex: -10,
    backgroundColor: 'transparent',
  },
  overlay: {
    paddingHorizontal: 16,
    paddingTop: 38,
    flexDirection: 'col',
    color: 'black',
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
    shadowOffset: {width: 0, height: 2},
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

  bikeList: {
    paddingHorizontal: 0,
    paddingBottom: 4,
    
  },
  bikeCard: {
    backgroundColor: '#ffff',

    borderRadius: 10,
    padding: 10,
    margin: 6,
    marginBottom:20 ,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#d6d3d1',
  },
  bikeName: {
    fontSize: 14,
    paddingVertical: 4,
    color: 'black',
  },
});
