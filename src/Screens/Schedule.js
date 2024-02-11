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
import {Alert} from 'react-native';
const Scedule = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleCancel = async (id) => {
    setIsLoading(true);

    try {
        const response = await fetch(`https://${DOMAIN}/User/Schedule/${phone2}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ id: id }),
        });

        setIsLoading(false);
        fetchData(r)

        // Check if the response status indicates success (e.g., 204)
        if (response.status === 204) {
            console.log("Schedule deleted successfully");
        } else {
            console.error("Unexpected response:", response);
        }
    } catch (error) {
      fetchData()
        setIsLoading(false);
        console.error("Error during fetch:", error);
    }
};


  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fef9c3'}}>
      <View style={{ alignItems: 'center', marginTop: 40}}>
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
              {data.length > 0 ? (
                data.reverse().map((item, index) => (
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
                            Cancle
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* <Text style={styles.description}>{item.bike.b_id}</Text> */}
                  </View>
                ))
              ) : (
                <View className="justify-center items-center h-screen">
                  <Text className="text-black">No Scedule Yet Book First </Text>
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
    // backgroundColor: '#ffffff',
    // backgroundColor: '#F6FDBC',
    backgroundColor: '#fef08a',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    backgroundColor: '#fef9c3',
    paddingHorizontal : 5 ,
    paddingVertical:3 ,
    borderRadius:10 ,
    fontWeight: '700',
    color: '#121212',
  },
  description: {
    fontSize: 16,
    // marginLeft: 120,
    color: '#121212',
  },

  expertin: {
    marginLeft: 120,
    color: '#121212',
  },

  img: {
    borderWidth: 1,

    borderColor: '#121212',
    borderRadius: 50,
    height: 60,
    width: 60,

    // marginRight: 200,
  },
});

export default Scedule;
