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
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1, alignItems: 'center', marginTop: 40}}>
        <Text
          style={{
            marginTop: 0,
            color: 'green',
            fontFamily: 'Poppins-Medium',
            fontWeight: '800',
          }}>
          Scedules
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
                    <Text style={styles.title}>
                      {item.Date} {item.Time}
                    </Text>
                    <Text style={styles.description}>{item.bike.b_id}</Text>
                    <Text style={styles.description}>{item.bike.license_plate}</Text>
                    <Image source={{uri: item.bike.Image}} style={styles.img} />
                    <TouchableOpacity
                      onPress={() =>handleCancel(item.id)}
                      style={{
                        padding: 5,
                        backgroundColor: 'red',
                        borderRadius: 10,
                        width: 100,
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        Cancle
                      </Text>
                    </TouchableOpacity>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  studentHomeHead: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 10,
    color: '#404040',
    fontFamily: 'Poppins-Black',
  },

  studentHomeHead2: {
    fontSize: 18,
    color: '#888888',
    fontWeight: '600',
    fontFamily: 'Poppins-Light',
    marginBottom: 10,
  },

  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 10,

    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardTextContainer: {
    padding: 20,
    color: '#121212',
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    color: '#121212',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 16,
    color: '#121212',
    color: '#333',
    marginTop: 10,
  },

  container: {
    flex: 1,
    width: 350,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    flexDirection: 'column',
    color: '#121212',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#121212',
    marginLeft: 120,
  },
  description: {
    fontSize: 16,
    marginLeft: 120,
    color: '#121212',
  },

  expertin: {
    marginLeft: 120,
    color: '#121212',
  },

  img: {
    borderWidth: 3,
    
    borderColor: '#121212',
    borderRadius: 20,
    height: 100,
    width: 100,
    marginTop: -75,
    marginRight: 200,
  },
});

export default Scedule;
