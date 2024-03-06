import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {DOMAIN} from '@env';
// import bikeOne from '../assets/Bikes/IMG_9496.JPG';

const History = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const phone2 = useSelector(state => state.counter.phone);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true)
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false); 
    }, 2000);
  }, []);

  const fetchData = async () => {
    const result = await axios.get(`https://${DOMAIN}/User/history/${phone2}`);

    setData(result.data.Data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fef9c3'}}>
      <View style={{flex: 1, alignItems: 'center', marginTop: 40}}>
        <Text
          style={{
            marginTop: 0,
            color: '#000',
            fontFamily: 'Poppins-Medium',
            fontWeight: '800',
          }}>
          {' '}
          Ride History{' '}
        </Text>

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
              {data.length > 0 ? (
                data.reverse().map((item, index) => (
                  <View key={index} style={styles.item}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            margin: 10,
                            color: '#000',
                            fontWeight: '600',
                          }}>
                          Rental 
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '600',
                          }}>
                          Deposite 
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            margin: 10,
                            color: '#000',
                            fontWeight: '400',
                          }}>
                          {item.rental_date} {item.rental_time}
                        </Text>
                        <Text style={{color: '#000', fontWeight: '400'}}>
                          {item.return_date} {item.return_time}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            margin: 10,
                            color: 'green',
                            fontWeight: '400',
                          }}>
                          {item.UPIMethod ? 'Online' : 'Cash'}
                        </Text>
                        <Text style={{color: 'green', fontWeight: '400'}}>
                          ₹{item.Amount}
                        </Text>
                      </View>
                    </View>
                    {/* <Image
                      source={bikeOne}
                      style={styles.img}
                    /> */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Bill', {
                          phoneNumber: phone2,
                          selectedDate: item.return_date,
                        })
                      }
                      style={{
                        padding: 5,
                        backgroundColor: '#000',
                        borderRadius: 10,
                        width: '85%',
                        marginTop: 20,
                        // borderWidth: 1,
                        // borderColor: '#feb101',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#feb101',

                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        View Detail
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View className="justify-center items-center h-screen">
                  <Text className="text-black">No Previous History</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefce8',
    width: '100%',
    height: 170,
    paddingHorizontal: 20,
    // paddingVertical : 10 ,
    // margin:20 ,
    marginTop: 35,
    borderRadius: 20,
    
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default History;
