import React, {useState, useMemo, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {API_KEY} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import debounce from 'lodash.debounce';

export default function Home({navigation}) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const bottomSheetRef = useRef(null);

  const webRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const snapPoints = useMemo(() => ['2%','25%', '50%', '80%'], []);

  const handleSheetChanges = useCallback(index => {
    
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
          if (
            result &&
            result.position &&
            result.position.lng !== undefined &&
            result.position.lat !== undefined
          ) {
            const {position} = result;
            setMapCenter(`${position.lng},${position.lat}`);
            console.log(position);
            webRef.current.injectJavaScript(
              `map.setCenter([${position.lng}, ${position.lat}])`,
            );
          } else {
            console.error('Invalid coordinates in search result:', result);
          }
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  };

  const handleMapEvent = useCallback(event => {
    setMapCenter(event.nativeEvent.data);
  }, []);

  const handleSearchSuggestion = useCallback(query => {
    axios
      .get(`https://api.tomtom.com/search/2/autocomplete/${query}.json`, {
        params: {
          key: API_KEY,
          language: 'en-US',
          limit: 5,
        },
      })
      .then(response => {
        const suggestions = response.data.results.map(result => {
          // Check for segments with type "brand" and value
          const brandSegment = result.segments.find(
            segment => segment.type === 'brand' && segment.value,
          );

          if (brandSegment) {
            return brandSegment.value;
          } else {
            console.error('Invalid coordinates in search result:', result);
            return null; // Return null for invalid results
          }
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
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <View className="flex flex-row justify-between gap-10 mt-2">
            <Text className="text-black">Select Your Ride!</Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, isChecked && styles.checked]}
                onPress={toggleCheckbox}>
                {isChecked && <Icon name="check" color="#000" size={18} />}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>EV</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <View className="flex-col">
                <TouchableOpacity
                  style={[styles.checkbox, isChecked && styles.checked]}
                  onPress={toggleCheckbox}>
                  {isChecked && <Icon name="check" color="#000" size={18} />}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>Petrol</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    style={[styles.checkbox, isChecked && styles.checked]}
                    onPress={toggleCheckbox}>
                    {isChecked && <Icon name="check" color="#000" size={18} />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>5G Activa's</Text>
                  <TouchableOpacity
                    style={[styles.checkbox, isChecked && styles.checked]}
                    onPress={toggleCheckbox}>
                    {isChecked && <Icon name="check" color="#000" size={18} />}
                  </TouchableOpacity>
                  <Text style={styles.checkboxText}>6G Activa's</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
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
          {results.length > 0 && (
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSearch(item);
                    handleSearchSuggestion(item);
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
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
  bottomSheet: {
    position: 'absolute',
    width: '100%',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ffdd4b',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#ffdd4b',
    borderColor: '#ffdd4b',
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
});
