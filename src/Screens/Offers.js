import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Header from '../Components/Header';
import LinearGradient from 'react-native-linear-gradient';

const Offers = () => {
  return (
    <View style={styles.container}>
      {/* <Header title="Special Offers" /> */}
      {/* <LinearGradient
        colors={['#FFA000', '#FFD600']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}> */}
      <View className="relative top-[-70px]  px-16 py-8 justify-center ">
        <Text className="text-center text-white py-4 rounded-full text-[18px] font-bold bg-black">OFFERS</Text>
      </View>
      <View className="px-8">
        <Text className="text-[40px] text-black font-bold mb-6">
          Discover Exclusive Deals Just for You !
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
              <Text style={styles.boxText}>5% Discount</Text>
              <Text style={styles.boxText}>On just Follow + Google Review</Text>
              <Text style={styles.boxText}>Go and Grab it !</Text>
            </LinearGradient>
          </View>
          <View style={styles.offerBox}>
            <LinearGradient
              colors={['#fae8ff', '#c084fc']}
              style={styles.boxGradient}>
              <Text style={styles.boxText}>Offer 2</Text>
            </LinearGradient>
          </View>
          <View style={styles.offerBox}>
            <LinearGradient
              colors={['#dcfce7', '#22c55e']}
              style={styles.boxGradient}>
              <Text style={styles.boxText}>Offer 3</Text>
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
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
 

  offerBox: {
    width: windowWidth * 0.8, // Adjust percentage as needed
    height: windowHeight * 0.2, // Adjust percentage as needed
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  boxGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Offers;
