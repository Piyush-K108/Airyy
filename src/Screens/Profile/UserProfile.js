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

import user from '../../images/userProfile.png';
import axios from 'axios';
import {DOMAIN} from '@env';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {fetchProfile, logout} from '../../Redux/Counter/counterAction';
import {useSelector} from 'react-redux';
import EditComponent from '../../Components/EditComponent';
import {ProfileEdit} from './ProfileEdit';
const UserProfile = () => {
  const data = useSelector(state => state.counter.profile);
  const [openEditComponent, setopenEditComponent] = useState('');
  const currentYear = new Date().getFullYear();
  const navigation = useNavigation();
  const editProfile = ProfileEdit();
  const phone = useSelector(state => state.counter.phone);
  const dispatch = useDispatch();

  const options = {
    mediaType: 'photo',
    quality: 1,
    cameraType: 'back',
    storageOptions: {
      skipBackup: true,
    },
  };

  const ImagePicker = async item => {
    try {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else if (item === 'adhar') {
          const data = new FormData();

          const AdharData = {
            uri: response.assets[0].uri,
            type: 'image/jpeg',
            name: phone + '_Adhar_Card.jpg',
          };

          data.append('Adhar_Card', AdharData);

          editProfile(data, 'multipart/form-data');
        } else if (item === 'License') {
          const data = new FormData();

          const licenseData = {
            uri: response.assets[0].uri,
            type: 'image/jpeg',
            name: phone + '_License.jpg',
          };

          data.append('license_id', licenseData);

          editProfile(data, 'multipart/form-data');
        } else if (item === 'pic') {
          const data = new FormData();
          const Pic = {
            uri: response.assets[0].uri,
            type: 'image/jpeg',
            name: phone + '_Profile.jpg',
          };

          data.append('ProfilePic', Pic);


          editProfile(data, 'multipart/form-data');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (screen, props) => {
    navigation.navigate(screen, {
      prop: props,
    });
  };

  const handleEdit2 = prop => {
    setopenEditComponent(prop);
  };

  const getNameFontSize = () => {
    if (data && data.name && data.name.includes(' ')) {
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

  useEffect(() => {
    if (phone) {
      dispatch(fetchProfile(phone));
    }
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      {openEditComponent === 'name' && (
        <EditComponent
          initialValue={data ? data.name : 'Name'}
          onCancel={() => setopenEditComponent('')}
        />
      )}
      <View style={styles.boxContainer}>
        
      </View>
      {data && (
        <>
          <TouchableOpacity
            onPress={() => {
              ImagePicker('pic');
            }}>  
            <View className="rounded-full justify-end flex -mt-[18%] overflow-hidden">
              <Image
                resizeMode="cover"
                source={data.ProfilePic ? {uri: data.ProfilePic} : user}
                className="w-24 h-24  "
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-screen flex justify-center items-center' onPress={() => handleEdit2('name')}>
          <Text 
            style={{
              fontSize: getNameFontSize(),
              color: data && data.name ? 'black' : 'red',
            }}>
            {isFieldRequired(data ? data.name : 'Required')}
          </Text>
          <Text className='text-black'>{phone}</Text>
        </TouchableOpacity>
          </>
        )}
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
                className={`${data && data.email ? '' : 'ml-[102px]'}`}
                style={{
                  ...styles.label,
                  color: data && data.email ? '#121212' : 'red',
                }}>
                {isFieldRequired(data && data.email)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit('EditGender')}>
          <View style={styles.fieldContainer}>
            <MaterialCommunityIcons
              name="city"
              size={20}
              color="#8F00FF"
              style={styles.icon}
            />
            <Text style={styles.labelText}>City{'  '}</Text>
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
                className="ml-[131px]"
                style={{
                  ...styles.label,
                  color: data && data.Gender ? '#121212' : 'red',
                }}>
                {isFieldRequired(data && data.City)}
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
                width: 200,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text
                className="ml-[101px]"
                style={{
                  ...styles.label,
                  color: data && data.Gender ? '#121212' : 'red',
                }}>
                {isFieldRequired(data && data.Gender)}
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
                    data && data.Date_of_Birth === 'Invalid Date'
                      ? 'red'
                      : '#121212',
                }}>
                {new Date(data && data.Date_of_Birth).toLocaleDateString(
                  'en-IN',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  },
                )}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ImagePicker('adhar')}>
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
                color: data && data.Adhar_Card ? 'green' : 'red',
              }}>
              {isFieldRequired2(data && data.Adhar_Card)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ImagePicker('License')}>
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
                color: data && data.license_id ? 'green' : 'red',
              }}>
              {isFieldRequired2(data && data.license_id)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" items-center mb-4 py-1  bg-yellow-500  rounded-full">
        <Text
          onPress={handelLogout}
          className="text-white font-bold text-xl flex py-2 px-20  justify-center items-center">
          Logout
        </Text>
      </View>
      
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
    height: 180,
    backgroundColor: 'rgb(234, 179, 8)',
    justifyContent: 'flex-end',
    flexDirection: 'col',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
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
    marginVertical: 20,
    padding: 12,
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
