import React from 'react';
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
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import {List} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logout} from '../Redux/Counter/counterAction';
import { useSelector } from 'react-redux';
const UserProfile = () => {
  const navigation = useNavigation();
  const loggedIn = useSelector(state => state.counter.loggedIn);
  const [expanded, setExpanded] = React.useState(true);
  const dispatch = useDispatch();
  const handlePress = () => setExpanded(!expanded);
  const handleEditName = () => {
    navigation.navigate('EditName');
  };

  const handleEmailEdit = () => {
    navigation.navigate('EditEmail');
  };
  const handleGenderEdit = () => {
    navigation.navigate('EditGender');
  };
  const handleAddressEdit = () => {
    navigation.navigate('EditAddress');
  };
  const handleDobEdit = () => {
    navigation.navigate('EditDateOfBirth');
  };
  const handelLogout = () => {
    console.log('sjkb')
    dispatch(logout());
  };
  React.useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={handleEditName}>
          <Text style={styles.name}>Raj Joshi</Text>
          <Text style={styles.number}>+919685741041</Text>
        </TouchableOpacity>
        <View style={styles.imgContainerForuserprofile}>
          <Image
            resizeMode="cover"
            source={require('../assets/images/edit.png')}
            style={styles.Editimage}
          />
        </View>
      </View>
      <Text
        style={{fontSize: 25, color: '#000', marginLeft: -250, marginTop: 40}}>
        Profile
      </Text>
      <View style={styles.parentContainerForProfile}>
        <TouchableOpacity onPress={handleEmailEdit}>
          <View style={styles.fieldContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#73C2FB"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Email</Text>
            <View
              style={{
                marginLeft: 10,

                // borderWidth: 1,
                borderBottomColor: 'green',
                padding: 2,
                width: 200,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text style={styles.label}>prjoshi2710@gmail.com</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGenderEdit}>
          <View style={styles.fieldContainer}>
            <FontAwesome
              name="male"
              size={20}
              color="#08E8DE"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Gender</Text>
            <View
              style={{
                marginLeft: 100,
                // borderWidth: 1,
                borderBottomColor: 'green',
                padding: 5,
                width: 70,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text style={styles.label}>Male</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddressEdit}>
          <View style={styles.fieldContainer}>
            <FontAwesome
              name="address-card"
              size={20}
              color="#8F00FF"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Address</Text>
            <View
              style={{
                marginLeft: 80,

                borderBottomColor: 'green',
                padding: 5,
                width: 100,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text style={styles.label}>Indore</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDobEdit}>
          <View style={styles.fieldContainer}>
            <FontAwesome
              name="birthday-cake"
              size={20}
              color="#FF007F"
              style={styles.icon}
            />
            <Text style={styles.labelText}>Date of birth</Text>
            <View
              style={{
                marginLeft: 50,
                borderBottomColor: 'green',
                padding: 5,
                width: 100,
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              <Text style={styles.label}>27-12-2002</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        
        className="w-screen   items-center mt-3 text-black">
        <Text onPress={handelLogout} className="text-black">Logout</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 0,
    // justifyContent:'center',
    alignItems: 'center',
  },
  boxContainer: {
    width: Dimensions.get('window').width * 1.0,
    height: 200,
    backgroundColor: '#ff553e',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    marginLeft: 50,
  },
  number: {
    fontSize: 13,
    color: '#FFF',
    // marginBottom: 40,
    marginLeft: 50,
  },
  Editimage: {
    height: 100,
    width: 280,

    resizeMode: 'contain',
  },
  imgContainerForuserprofile: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Profile styling

  parentContainerForProfile: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '110%',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 0,
    margin: 30,
    padding: 20,
    // width:'100%' ,
    maxWidth: 850,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
