import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity , Image} from 'react-native';
import Current from '../assets/target.png' ;
import Destination from '../assets/destination.png'

const StationLocation = () => {
  

  // State to store user's current location and station location
  const [CUlocation, setCUlocation] = useState('');
  const location = useSelector(state => state.counter.location);
  const [Stationlocation, setStationlocation] = useState('Bhola ram ustad marg , Bhwarkuwan , indore');
  const [stationLocation, setStationLocation] = useState('');

  // Handler to simulate fetching the station location
  const handleFetchStationLocation = () => {
    // For demonstration purposes, we'll set a static value
    // In a real app, you would fetch this information from an API
    setStationLocation('Station Location: 123 Station Street');
  };

  return (
    <View className="flex h-screen   bg-white items-center p-4">
      {/* Input for user's current location */}
      <View className="flex flex-col   w-full justify-center items-center ">
        <View className="flex border border-gray-200 flex-row items-center  w-full px-4  py-2 rounded-xl mb-6 mt-8">
          <Image source={Current} className="w-[25px] h-[25px] mr-2" />
          <TextInput
            className="text-black"
            placeholder="Enter your current location"
            placeholderTextColor={"#000"}
            value={location}
            onChangeText={setCUlocation}
          />
        </View>
        <View className="flex border border-gray-200 flex-row items-center w-full px-4  py-2 rounded-xl">
          <Image source={Destination} className="w-[25px] h-[25px] mr-2" />
          <TextInput
            className="w-full text-black"
            placeholder="Enter your Stations location"
            placeholderTextColor={"#000"}
            value={Stationlocation}
            onChangeText={setStationlocation}
          />
        </View>
      </View>

      {/* Button to fetch station location */}
      <TouchableOpacity
        style={{elevation:4 ,}}
        className="bg-yellow-400 rounded-lg p-2 mb-4 mt-4 px-8 py-3  w-full "
        onPress={handleFetchStationLocation}>
        <Text className="text-black font-bold text-center">Find Nearest Station</Text>
      </TouchableOpacity>

      {/* Display station location */}
      <Text className="text-lg font-semibold text-green-600">
        {stationLocation}
      </Text>
    </View>
  );
};

export default StationLocation;
