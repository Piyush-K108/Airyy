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
import Checkbox from '../../Components/Checkbox';
import {useSelector} from 'react-redux';
import {fetchBikes} from '../../Redux/Counter/counterAction';
import {useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import Available from '../../assets/available.png';
import NotAvailable from '../../assets/stop.png';
const Bikes = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const dispatch = useDispatch();
  const Bikes = useSelector(state => state.counter.bikes);
  const [ShowBikes, setShowBikes] = useState(Bikes);
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
        <View className="flex flex-row justify-between">
          <Text style={styles.bikeName}>{item.b_id}</Text>
          {item.is_assigned ? (
            <Image source={NotAvailable} className="w-[20px] h-[20px]" />
          ) : (
            <Image source={Available} className="w-[35px] h-[35px]" />
          )}
        </View>

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
      <View className="bg-yellow-400">
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

        <View className="flex flex-row justify-between px-5 p-5  ">
          <Text className="text-[#121212] font-semibold s">Filter Vehicle</Text>
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
            {/* <ScooterSelectionModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSelect={scooterType => setSelectedScooter(scooterType)}
            /> */}
          </View>
        </View>
      </View>

      <FlatList
        data={ShowBikes}
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
    paddingBottom: 60,
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
