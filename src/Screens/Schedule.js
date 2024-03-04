import React, {useState} from 'react';
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
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {DOMAIN} from '@env';
import {Alert} from 'react-native';
import ConfirmCancelModal from '../Modals/CancelBookingModal';

const Scedule = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // Track the selected booking
  const phone2 = useSelector(state => state.counter.phone);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    fetchData();

    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 2000);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://${DOMAIN}/User/Schedule/${phone2}/`,
      );
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching schedule data:', error);

      if (error.response) {
        Alert.alert('Server Error', error.response.data.error);
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = id => {
    // Set the selected booking when cancel is pressed
    setSelectedBooking(id);
  };

  const confirmCancel = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${DOMAIN}/User/Schedule/${phone2}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({id: selectedBooking}),
        },
      );

      if (response.status === 204) {
        console.log('Schedule deleted successfully');
        setIsLoading(true);
        // Wait for a short time before fetching the updated data
        setTimeout(() => {
          fetchData();
          setIsLoading(false);
        }, 2000);
      } else {
        console.error('Unexpected response:', response);
        setIsLoading(false);
      }
    } catch (error) {
      fetchData();
      setIsLoading(false);
      console.error('Error during fetch:', error);
    } finally {
      // Reset selectedBooking after cancel is confirmed
      setSelectedBooking(null);
    }
  };

  const closeModal = () => {
    // Reset selectedBooking when modal is closed without confirming
    setSelectedBooking(null);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fef9c3'}}>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Text
          style={{
            marginTop: 0,
            color: '#000',
            letterSpacing: 1,
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
            fontWeight: '900',
          }}>
          SCHEDULES
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
              {data.length > 0
                ? data.reverse().map((item, index) => (
                    <View key={index} style={styles.item}>
                      <View className="flex flex-row items-center justify-between">
                        <View className="mr-8">
                          <Image
                            source={{uri: item.bike.Image}}
                            style={styles.img}
                          />
                          <Text style={styles.description}>
                            {item.bike.license_plate}
                          </Text>
                        </View>
                        <View className="flex flex-col items-center ml-8 mt-3">
                          <Text style={styles.title}>
                            {item.Date} {item.Time}
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleCancel(item.id)}
                            style={{
                              padding: 5,
                              backgroundColor: '#ef4444',
                              borderRadius: 10,
                              width: 100,
                              alignItems: 'center',
                              marginTop: 20,
                            }}>
                            <Text
                              style={{
                                color: '#ffffff',
                                fontSize: 12,
                                fontWeight: '600',
                              }}>
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                : null}

              {data.length === 0 && (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  contentContainerStyle={{
                    marginTop: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LottieView
                    style={{
                      width: 350,
                      marginBottom: -20,
                      marginLeft: 18,
                      height: 350,
                    }}
                    source={require('../assets/noschedule.json')}
                    autoPlay
                    loop
                  />

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      No Bike is Scheduled Yet,
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Bikes')}
                      style={{paddingBottom: -20}}>
                      <Text style={{color: 'blue', fontWeight: 'bold'}}>
                        {' '}
                        Book Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </View>
          </ScrollView>
        )}

        <ConfirmCancelModal
          isVisible={!!selectedBooking}
          onCancel={closeModal}
          onConfirm={confirmCancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  container: {
    flex: 1,
    width: 350,
    borderRadius: 20,

    padding: 16,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    flexDirection: 'column',
    color: '#121212',
    backgroundColor: '#fef08a',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    backgroundColor: '#fef9c3',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: '700',
    color: '#121212',
  },
  description: {
    fontSize: 16,
    color: '#121212',
  },

  img: {
    borderWidth: 1,

    borderColor: '#121212',
    borderRadius: 50,
    height: 60,
    width: 60,
  },
});

export default Scedule;
