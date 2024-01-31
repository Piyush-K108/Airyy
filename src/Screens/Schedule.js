import React, {useState} from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../Components/Header';

const Schedule = () => {
  const [data, setdata] = useState([]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.bikeCard}>
      <View>
        <Text className='text-black'>kda</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="h-screen flex flex-col">

      <Header/>

      <View className="flex items-center justify-center w-screen">
        <Text className=" text-black text-2xl ">Schedule</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        contentContainerStyle={styles.bikeList}/>

    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  inputForSearch: {
    fontSize: 20,
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
