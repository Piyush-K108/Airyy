import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useState} from 'react';
import {Video} from 'react-native-video'
import 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
const Book = ({route}) => {
  const {bid} = route.params;
  const navigation = useNavigation();
  
  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headercontainer}>
              <Text style={styles.title}>Renting Service</Text>
            </View>

            <View style={styles.Vcontainer}>
              <Video
                source={require('../../assets/Airyy.mp4')}
                style={styles.video}
                resizeMode="cover"
                repeat
              />
            </View>

            <View className='gap-x-20 px-2'
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
            
              
                width: '100%',
              }}>
              <View
                style={{
                  width: '30%',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <Text style={styles.buttonText}>Navigate to Site</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={{padding: 50}}></View> */}
              <View
                style={{
                  width: '30%',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    // navigation.navigate('Login');
                    navigation.navigate('FutureBook',{bid:bid});
                  }}>
                  <Text style={styles.buttonText}>Book For Future</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Vcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 350,
    height: 350,
  },
  headercontainer: {
    backgroundColor: '#feb101',
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 6,
    marginBottom: 50,

    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#feb101',
    width: '150%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
});

export default Book;
