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
  PanResponder,

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

export default function Home2({navigation}) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const bottomSheetRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [IsPatrol, setIsPatrol] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);

  const dispatch = useDispatch();
  const Bikes = useSelector(state => state.counter.bikes);

 const pan = useRef(new Animated.ValueXY()).current;

 const panResponder = useRef(
   PanResponder.create({
     onMoveShouldSetPanResponder: () => true,
     onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
     onPanResponderRelease: () => {
       pan.extractOffset();
     },
   }),
 ).current;

  // Render Item function for flatlist for showing bikes
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.bikeCard}
      onPress={() => {
        const selectedBike = Bikes.find(bike => bike.b_id === item.b_id);
        if (selectedBike) {
          navigation.navigate('BikeDetails', {selectedBike});
        }
      }}>
      <View>
        <Text style={styles.bikeName}>{item.b_id}</Text>
        <Image
          resizeMode="cover"
          source={{uri: item.Image}}
          className="w-[80px] h-[80px]"
        />
      </View>
    </TouchableOpacity>
  );

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  const webRef = useRef(null);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');

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

  const handleMapEvent = useCallback(event => {
    setMapCenter(event.nativeEvent.data);
  }, []);

  const handleSearchSuggestion = useCallback(query => {
    if(query===null || query===undefined || query===''){
      return
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
        const suggestions = response.data.results.map(result => {
          // Check for segments with type "brand" and value
          const brandSegment = result.segments.find(
            segment => segment.type === 'brand' && segment.value,
          );

          // Check for other types of segments or use a fallback
          const suggestion = brandSegment
            ? brandSegment.value
            : result.displayString || null;
          console.log(suggestion);


          return suggestion;
        });

        // Filter out null values (invalid results)
        setResults(suggestions.filter(result => result !== null));
      })
      .catch(error => {
        console.error('Error fetching search suggestions:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          ref={webRef}
          onMessage={handleMapEvent}
          originWhitelist={['*']}
          source={{html: mapTemplate}}
          allowsInlineMediaPlayback={true}
        />
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <TouchableOpacity className="absolute top-[-453px] px-4 py-3 left-[280px] flex-row items-center   m-auto flex rounded-xl  bg-black">
            <Text className="text-[#feb101] font-bold">Book now</Text>
            {/* <MaterialIcons name="bike_scooter" size={22} color="#666" /> */}
          </TouchableOpacity>
        </Animated.View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheet}
        gestureEnabled={true}>
        <LinearGradient
          colors={['white', '#e5e7eb']} // You can change these colors as per your gradient
          style={styles.bottomSheetContent}>
          <View className="flex flex-row justify-between px-2 ">
            <Text className="text-black font-semibold">Filter Vehicle</Text>
            <Checkbox
              label="EV"
              value={isChecked}
              onPress={handleCheckboxPress}
            />

            <View className="flex flex-col ">
              <Checkbox
                label="Patrol"
                value={IsPatrol}
                onPress={() => {
                  setIsPatrol(!IsPatrol);
                  setModalVisible(true);
                }}
              />

              <ScooterSelectionModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSelect={scooterType => setSelectedScooter(scooterType)}
              />
              {/* <View className="flex flex-row bg-yellow-100 rounded-2xl py-2 px-3">
                <Checkbox
                  label="5g"
                  value={isChecked}
                  onPress={handleCheckboxPress}
                  style={{paddingHorizontal: 0}}
                />
                <Checkbox
                  label="6g"
                  value={IsPatrol}
                  onPress={() => {
                    setIsPatrol(!IsPatrol);
                  }}
                  style={{paddingHorizontal: 0}}
                />
              </View> */}
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={Bikes}
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
          <View className="mt-5 w-screen">
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection: 'column',
  },
  bottomSheet: {
    // flex: 2,
    // flexDirection: 'column',
    // position: 'absolute',
    justifyContent: 'center',
    // width: '100%',

    alignItems: 'center',
  },
  bottomSheet: {
    // flex: 2,
    // flexDirection: 'column',
    // position: 'absolute',
    justifyContent: 'center',
    // width: '100%',

    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
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
    margin: 5,
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
