import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions , Image , TouchableOpacity , Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import reel from '../assets/reel3.png'
import Story from '../assets/instaStory.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Review from '../assets/g.png'
import follow from '../assets/Instafollow.png'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Offers = () => {
    const handleInstagramRedirect = () => {
      Linking.openURL('https://instagram.com/airyyrides/');
    };
    const handleGoogleRedirect = () => {
      Linking.openURL('https://rb.gy/1lrd11');
    };
  return (
    <View style={styles.container}>
      {/* <Header title="Special Offers" /> */}
      {/* <LinearGradient
        colors={['#FFA000', '#FFD600']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}> */}
      <View className="relative top-0  px-16  justify-center ">
        <Text className="text-center text-white py-4 rounded-full text-[18px] font-bold bg-black">
          OFFERS
        </Text>
      </View>
      <View className="px-8">
        <Text className="text-[40px] text-black  w-full font-bold mb-6">
          Discover Exclusive Deals Just for You!
        </Text>
        <Text className="text-[20px] mb-6 text-black leading-8">
          Get ready to grab exciting discounts and unbeatable offers on your
          next ride !
        </Text>
      </View>

      <View className="">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.offerBox}>
            <LinearGradient
              colors={['#fde047', '#fb923c']}
              style={styles.boxGradient}>
              <View className="flex flex-row w-full justify-around items-center ">
                <View className="flex flex-col px-5 py-4 gap-2 rounded-lg  items-start justify-center bg-[#fefce8]">
                  <Text className="text-black font-medium">Grab it now !</Text>
                  <Text className="text-black font-medium">
                    Follow + Review = 5% Off !
                  </Text>
                </View>
                <View className="flex flex-col px-1 py-2 rounded-md gap-2 bg-[#fefce8]">
                  <TouchableOpacity onPress={handleGoogleRedirect}>
                    <Image source={Review} className="w-[25px] h-[25px]" />
                    <Text className="text-[10px] text-black">Review us !</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleInstagramRedirect}>
                    <Image source={follow} className="w-[35px] h-[30px]" />
                    <Text className="text-[10px] text-black">Follow us !</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.offerBox}>
            <LinearGradient
              colors={['#f472b6', '#c084fc']}
              style={styles.boxGradient}>
              <View className="flex flex-row justify-around w-full items-center">
                <View className="flex flex-col items-start px-2 gap-2 bg-[#fefce8] w-[60%] h-[100px] rounded-2xl justify-center">
                  <Text className="text-black font-bold text-[13px]">
                    10% Off for an Insta Story !
                  </Text>
                  <Text className="text-black  rounded-lg  font-bold text-[14px]">
                    Need 500+ followers to avail.
                  </Text>
                </View>
                <TouchableOpacity onPress={handleInstagramRedirect}>
                  <View>
                    <Image source={Story} className="w-[75px] h-[75px]" />
                    <View className="flex flex-row items-center  justify-between">
                      <Text className="text-purple-950 font-medium text-[14px] mr-2">
                        Post now
                      </Text>
                      <Ionicons
                        name="rocket-sharp"
                        className="text-black font-bold text-[70px]"
                        color="#581c87"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.offerBox}>
            <LinearGradient
              colors={['#7dd3fc', '#bae6fd']}
              style={styles.boxGradient}>
              <View className="flex flex-row items-start w-full  justify-around">
                <View className="flex flex-col gap-2 ">
                  <View className="flex flex-row items-center  py-1   px-2 justify-between w-[70%] rounded-lg  bg-[#7dd3fc]">
                    <Text className="text-[#fefce8]   text-[15px] font-bold">
                      100% Discount
                    </Text>
                    <Ionicons
                      name="trophy"
                      className="text- font-bold text-[70px]"
                      color="#fefce8"
                    />
                  </View>

                  {/* <View className='flex flex-col  items-center'> */}
                  <Text className="text-black font-light">
                    Collaborate with Us on Reels!
                  </Text>
                  <Text className="text-black font-light">
                    Save up to ₹200 on Your Next Booking
                  </Text>
                  <Text className="text-black font-medium">
                    1k Insta followers ? Join Reel revolution !
                  </Text>

                  {/* </View> */}
                </View>
                <TouchableOpacity onPress={handleInstagramRedirect}>
                  <View className="flex flex-col items-center gap-2">
                    <Image source={reel} style={styles.image} />
                    <View className="flex flex-row items-center justify-between">
                      <Text className="text-black font-medium text-[12px] mr-1">
                        Post now
                      </Text>
                      <Ionicons
                        name="rocket"
                        className="text-black font-bold text-[70px]"
                        color="black"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
    // flexDirection : 'column',
    // alignItems:'center' ,
    justifyContent: 'start',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  offerBox: {
    width: windowWidth * 0.9, // Adjust percentage as needed
    height: windowHeight * 0.2, // Adjust percentage as needed
    marginHorizontal: 14,
    borderRadius: 10,
    overflow: 'hidden',
    
  },

  boxGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  image: {
    width: 38, // Adjust size as needed
    height: 38, // Adjust size as needed
   
  },
});

export default Offers;
