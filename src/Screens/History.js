import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { phone } from '../Redux/Counter/counterAction';
import {useNavigation} from '@react-navigation/native';
import {DOMAIN} from '@env';
const History = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const phone2 = useSelector(state => state.counter.phone);
  


  // Define a state variable to keep track of which buttons have been clicked
  const [clicked, setClicked] = useState(data.map(() => false));

  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(
      `https://${DOMAIN}/User/history/${phone2}`,
    );
    
    setData(result.data.Data);
   
  };
  useEffect(() => {
    fetchData();
  }, []);


  // const HomeImg = '../src/assets/homeforstudentImg.jpg'
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
          {' '}
          Previous Rides{' '}
        </Text>

        {/* FlatList */}
        <ScrollView>
          <View style={styles.container}>
            {data.reverse().map((item, index) => (
              <View key={index} style={styles.UPIMethod}>
                <Text style={styles.title}>{item.rental_date}{" "}{item.rental_time}</Text>
                <Text style={styles.expertin}>{item.rental_date}{" "}{item.rental_time}</Text>
                <Text style={styles.description}>{item.UPIMethod ? "Online":"Cash"}</Text>
                <Text style={styles.description}>${item.Amount}</Text>
               
                <TouchableOpacity
             onPress={() => navigation.navigate('Bill', {
              phoneNumber: phone2,
              selectedDate: item.return_date,
            })}
                  style={{
                    padding: 5,
                    backgroundColor: '#0096FF',
                    borderRadius: 10,
                    width: 100,
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  >
                  <Text
                    style={{color: '#ffffff', fontSize: 15, fontWeight: '600'}}>
                    Show
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: 'black',
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 16,
    color: 'black',
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
    color: 'black',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginLeft: 180,
  },
  description: {
    fontSize: 16,
    marginLeft: 180,
    color: 'black',
  },

  expertin: {
    marginLeft: 180,
    color: 'black',
  },

  img: {
    borderWidth: 3,
    color: 'black',
    borderColor: 'black',
    borderRadius: 20,
    height: 100,
    width: 100,
    marginTop: -100,
    marginRight: 200,
  },
});

export default History;
