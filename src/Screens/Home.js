import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import user from '../images/userProfile.png';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapTemplate from '../Components/mapTemplate';
import {useSelector} from 'react-redux';
import {DOMAIN} from '@env';
import LeftModel from '../Components/LeftModel';
import {useNavigation} from '@react-navigation/native';
export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();
  const [mapCenter, setMapCenter] = useState('22.6881149,75.8630678');
  const [data, setData] = useState([]);
  let webRef;
  const phone = useSelector(state => state.counter.phone);
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

  const fetchData = async () => {
    const result = await axios.get(`https://${DOMAIN}/User/Profile/${phone}/`);

    setData(result.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [isLeftDrawer, setIsLeftDrawer] = useState(false);

  const handLeftDrawer = () => {
    setIsLeftDrawer(!isLeftDrawer);
  };

  return (
    <>
      {isLeftDrawer && <LeftModel />}

      <View className="h-screen flex flex-col">
        {/* Header */}
        <View className="py-8 px-5 w-screen flex flex-row justify-between">
          <TouchableOpacity
            className={`${isLeftDrawer ? 'z-[100] ' : ''}`}
            onPress={handLeftDrawer}>
            <View className="mt-3 flex-row   overflow-hidden rounded-full">
              <MaterialIcons
                name={`${isLeftDrawer ? 'arrow-back' : 'menu'}`}
                size={32}
                color="#666"
              />
              {isLeftDrawer && (
                <Text className="text-black ml-3 text-[22px]">Menu</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
            <View className="rounded-full overflow-hidden">
              <Image
                resizeMode="cover"
                source={data.ProfilePic ? {uri: data.ProfilePic} : user}
                className="w-14 h-14"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Text */}
        <View className="px-5 w-screen  ">
          <Text className="font-bold text-3xl text-black ">
            Find your favorite
          </Text>
          <Text className="font-bold text-3xl mt-2 text-black">Biks !</Text>
          <Text className="text-black mt-3">
            Have a very pleasant experience
          </Text>
        </View>

        <View className="justify-center px-5 pt-8 pb-2 ">
          <View style={styles.searchBar__unclicked}>
            <TextInput
              style={styles.inputForSearch}
              placeholderTextColor={'black'}
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
