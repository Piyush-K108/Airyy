import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [dateofbirth, setDateofbirth] = '';
  const [country, setCountry] = '';
  const [state, setState] = '';
  const [city, setCity] = '';
  const [contnum, setContNum] = '';
  const navigation = useNavigation()
  const handleChangeEmail = newEmail => {
    setEmail(newEmail);
  };
  const handleChangeDateofBirth = newDateofbirth => {
    setDateofbirth(newDateofbirth);
  };
  const handleChangeCountry = newCountry => {
    setCountry(newCountry);
  };
  const handleChangeState = newState => {
    setState(newState);
  };
  const handleChangeCity = newCity => {
    setCity(newCity);
  };
  const handleContactnumber = newContNum => {
    setContNum(newContNum);
  };
  const logout = ()=> {
    
  };
  return (
    <View>
    <ScrollView>
      <View
        style={{
          padding: 10,
          width: '100%',
          backgroundColor: 'yellow',
          height: 150,
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/back.png')}
            style={{ width: 30, height: 30 }}
          />
          <View></View>
          <View></View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', borderBottomWidth: 0.5, color: 'gray' }}>
        <Image
          source={require('../../assets/userProfile.png')}
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
            marginTop: -70,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            padding: 10,
            color: 'black',
          }}
        >
          ABC
        </Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}>
          25, Male
        </Text>
        <View style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
            Profile
          </Text>
        </View>
        <View style={{ alignSelf: 'flex-start', marginLeft: 20, marginTop: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: 'transparent',
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('Edit_Email'); // Replace 'EmailScreen' with the actual screen name for the email screen
            }}
          >
            <MaterialIcons
              name="email"
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontWeight: 'bold' }}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity  onPress={logout}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              borderRadius: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              height: 50,
            }}
          >
            <MaterialIcons
              name="logout"
              size={25}
              color="black"
              style={{ paddingRight: 10 }}
            />
            <Text style={{ fontSize: 20 }}>
              log-out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
  
  );
};

export default Profile;