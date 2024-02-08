import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../../Components/Header';
import { useSelector } from 'react-redux';
import { fetchBikes } from '../../Redux/Counter/counterAction';
import {useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
const Bikes = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const Bikes = useSelector((state) => state.counter.bikes);
  const handleSearch = () => {
    console.log(Bikes[0]);
  };
  


  const renderItem = ({item}) => (
    // <View className="bg-red-100 ">
    // <LinearGradient
    //   colors={[ 'yellow','orange']}
    //   start={{x: 0, y: 0}}
    //   end={{x: 0, y: 1}}
    //   style={{flex: 1}}>
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
            className="w-32 h-32 ml-2"
          />
        </View>
      </TouchableOpacity>
    // </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View className="bg-yellow-200">
        <Header />

        <View className="px-5 w-screen">
          <Text className="font-bold text-3xl text-[#121212] ">
            Find your favorite
          </Text>
          <Text className="font-bold text-3xl mt-2 text-[#121212]">Bikes!</Text>
          <Text className="text-[#121212] mt-0">
            Have a very pleasant experience
          </Text>
        </View>

        <View style={styles.searchContainer}>
          {/* IS Assigned and ev , Earned */}
          <View style={styles.searchBar__unclicked}>
            <TextInput
              style={styles.inputForSearch}
              placeholderTextColor={'#818181'}
              placeholder="Find your Ride"
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                handleSearch();
              }}>
              <MaterialIcons
                name="search"
                size={24}
                color="#666"
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={Bikes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.bikeList}
      />
    </View>
    // </LinearGradient>
  );
};

export default Bikes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FBFDE9',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
  },
  searchContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 28,
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
    fontSize: 15,
    marginLeft: 10,
    color: '#121212',
    flex: 1,
  },
  bikeList: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  bikeCard: {
    backgroundColor: '#ffffff',

    borderRadius: 10,
    padding: 10,
    margin: 5,
    height: 180,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bikeName: {
    fontSize: 16,
    color: 'black',
  },
});
