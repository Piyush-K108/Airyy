import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Touchable,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import user from '../../images/userProfile.png'

import {DOMAIN} from '@env';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from 'react-redux';
import {logout} from '../../Redux/Counter/counterAction';
import {useSelector} from 'react-redux';
const UserProfile = () => {
  const currentYear = new Date().getFullYear();
  const navigation = useNavigation();
  const phone = useSelector(state => state.counter.phone);

  const [expanded, setExpanded] = React.useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const handleEdit = (screen, props) => {
    navigation.navigate(screen, {
      prop: props,
    });
  };
  const handleProfilePic = () => {
   
  };
  const getNameFontSize = () => {
    if (data.name && data.name.includes(' ')) {
      return 22;
    } else {
      return 30;
    }
  };
  const isFieldRequired = fieldValue => {
    return fieldValue === null ? 'Required' : fieldValue;
  };
  const isFieldRequired2 = fieldValue => {
    return fieldValue === null ? 'Required' : 'Submited';
  };

  const handelLogout = () => {
    dispatch(logout());
  };

  const fetchData = async () => {
    const result = await axios.get(`https://${DOMAIN}/User/Profile/${phone}/`);

    setData(result.data.data);

  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={() => handleEdit('EditName', data.name)}>
          <Text
            style={{
              ...styles.name,
              fontSize: getNameFontSize(),
              color: data.name ? 'white' : 'red',
            }}>
            {isFieldRequired(data.name)}
          </Text>
          <Text style={styles.number}>{phone}</Text>
        </TouchableOpacity>
        {data && (
          <TouchableOpacity
          onPress={() => {
            handleProfilePic()
          }}>
          <View className="rounded-full overflow-hidden">
            <Image
              resizeMode="cover"
              source={data.ProfilePic ? {uri: data.ProfilePic} : user}
              className="w-20 h-20"
            />
          </View>
        </TouchableOpacity>
        )}
      </View>
      <Text
        style={{fontSize: 25, color: '#000', marginLeft: -250, marginTop: 30}}>
        Profile
      </Text>
      <View style={styles.parentContainerForProfile}>
        <TouchableOpacity onPress={() => handleEdit('EditEmail', data.email)}>
          <View style={styles.fieldContainer}>
            <FontAwesome5
              name="envelope"
              size={20}
              color="#73C2FB"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Email</Text>
            <View
              style={{
                marginLeft: 30,
                borderBottomColor: 'green',
                padding: 2,
                width: 220,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text
                style={{...styles.label, color: data.email ? 'black' : 'red'}}>
                {isFieldRequired(data.email)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit('EditGender')}>
          <View style={styles.fieldContainer}>
            <FontAwesome5
              name="male"
              size={20}
              color="#08E8DE"
              style={styles.icon}
            />
            <Text style={styles.labelText}>City</Text>
            <View
              style={{
                marginLeft: 30,
                borderBottomColor: 'green',
                padding: 5,
                width: 380,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text
                style={{...styles.label, color: data.City ? 'black' : 'red'}}>
                {isFieldRequired(data.City)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit('EditGender')}>
          <View style={styles.fieldContainer}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={20}
              color="#8F00FF"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Gender</Text>
            <View
              style={{
                marginLeft: 30,

                borderBottomColor: 'green',
                padding: 5,
                width: 330,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text
                style={{...styles.label, color: data.Gender ? 'black' : 'red'}}>
                {isFieldRequired(data.Gender)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit('EditDateOfBirth')}>
          <View style={styles.fieldContainer}>
            <FontAwesome5
              name="birthday-cake"
              size={20}
              color="#FF007F"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Date of birth</Text>
            <View
              style={{
                marginLeft: 30,
                borderBottomColor: 'green',
                padding: 5,
                width: 200,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text
                style={{
                  ...styles.label,
                  color:
                    data.Date_of_Birth === 'Invalid Date' ? 'red' : 'black',
                }}>
                {new Date(data.Date_of_Birth).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit('EditGender')}>
          <View style={styles.fieldContainer}>
            <FontAwesome5
              name="address-card"
              size={20}
              color="#8F00FF"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Adhar Card</Text>
            <Text
              className="ml-28"
              style={{
                ...styles.label,
                color: data.Adhar_Card ? 'green' : 'red',
              }}>
              {isFieldRequired2(data.Adhar_Card)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit('EditGender')}>
          <View style={styles.fieldContainer}>
            <FontAwesome
              name="drivers-license-o"
              size={20}
              color="#8F00FF"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Driving License</Text>
            <Text
              className="ml-20"
              style={{
                ...styles.label,
                color: data.license_id ? 'green' : 'red',
              }}>
              {isFieldRequired2(data.license_id)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-screen  items-center mb-4 p-1 bg-yellow-500 ">
        <Text
          onPress={handelLogout}
          className="text-white font-bold text-xl flex justify-center items-center">
          Logout
        </Text>
      </View>
      <Text className="text-black mb-4">
        {' '}
        <Text className="text-yellow-500">&copy;</Text> {currentYear}{' '}
        Airyyrides.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 0,
    alignItems: 'center',
  },
  boxContainer: {
    width: Dimensions.get('window').width * 1.0,
    height: 200,
    backgroundColor: 'rgb(234, 179, 8)',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    marginLeft: 20,
  },
  number: {
    fontSize: 18,
    color: '#FFF',
    // marginBottom: 40,
    marginLeft: 20,
  },
  Editimage: {
    height: 100,
    width: 280,

    resizeMode: 'contain',
  },
  imgContainerForuserprofile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 140,
  },

  //Profile styling

  parentContainerForProfile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 0,
    marginLeft: 0,
    margin: 20,
    padding: 10,
    // width:'100%' ,
    width: 320,
    // maxWidth: 850,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },

  icon: {
    marginRight: 15,
  },

  labelText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },

  label: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default UserProfile;
