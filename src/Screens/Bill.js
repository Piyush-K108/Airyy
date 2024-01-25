import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/core';
import {DOMAIN} from '@env';
const screenWidth = Dimensions.get('window').width;

const Bill = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  const bikeCondition = 'good';
  const [formattedRentalDate, setformattedRentalDate] = useState(null);
  const [formattedreturnDate, setformattedreturnDate] = useState(null);
  const {phoneNumber, selectedDate} = route.params;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [UPIMethod, setUPIMethod] = useState('');
  const [b_id, setbid] = useState('');
  const [cash, setcash] = useState(0);
  const [upi, setupi] = useState(0);
  const [Cheque, setCheque] = useState(0);
  const [Tip, setTip] = useState(0);
  const [Discount, setDiscount] = useState(0);
  const [Damage, setDamage] = useState(0);

  const [count, setcount] = useState('');

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://${DOMAIN}/Bike/Bill2/${phoneNumber}/${selectedDate}/0/`,
      );
      const data = await response.json();

      const originalTimeZone = 'UTC';
      if (data.Error) {
        Alert.alert('Error', data.Error, [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
        setLoading(false);
      }
      // Format the date in the original time zone
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: originalTimeZone,
      };

      // Create a JavaScript Date object for rental_date

      const rentalDate = new Date(data.Data.rental_date);
      const formattedDate = rentalDate.toLocaleString(undefined, options);

      const returnDate = new Date(data.Data.return_date);

      // Adjust the time zone offset to IST (UTC+5:30)
      const formattedDate2 = returnDate.toLocaleString(undefined, options);
      setBillData(data.Data);
      setcount(data.Count);
      setbid(data.b_id);
      setformattedRentalDate(formattedDate);
      setformattedreturnDate(formattedDate2);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Simulate loading for 5 seconds

    const loadingTimeout = setTimeout(() => {
      fetchData();
    }, 5000);

    // Cleanup timeout on unmount
    return () => clearTimeout(loadingTimeout);
  }, [navigation]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setLoading(true);
    navigation.goBack();
  };

  return (
    <View>
      {loading ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="large" color="#000" />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  marginTop: 20,
                  fontSize: 15,
                }}>
                Getting Your Bill
              </Text>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalContainer}>
              {billData && (
                <View style={styles.billContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.billHeader}>Invoice</Text>
                    <Text style={{color: '#000', fontWeight: '700'}}>
                      User Count - {count}
                    </Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Name:</Text>
                    <Text style={styles.labelValue}>{billData.user.name}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Phone:</Text>
                    <Text style={styles.labelValue}>{billData.user.phone}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>License Plate:</Text>
                    <Text style={styles.labelValue}>{billData.bike.b_id}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>KM Before:</Text>
                    <Text style={styles.labelValue}>
                      {billData.bike.KM_Now - billData.KM_For}
                    </Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>KM Now:</Text>
                    <Text style={styles.labelValue}>
                      {billData.bike.KM_Now}
                    </Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Rental Date:</Text>
                    <Text style={styles.labelValue}>{formattedRentalDate}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Return Date:</Text>
                    <Text style={styles.labelValue}>{formattedreturnDate}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Discount:</Text>
                    <Text style={styles.labelValue}>{billData.Discount}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Tip Given:</Text>
                    <Text style={styles.labelValue}>{billData.Tip}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Payment Method:</Text>
                    <Text style={styles.labelValue}>
                      {billData.UPIMethod ? 'online' : 'cash'}
                    </Text>
                  </View>

                  {bikeCondition == 'notgood' ? (
                    <View style={styles.labelContainer}>
                      <Text style={styles.Lable}>Damage Pay:</Text>
                      <Text style={styles.labelValue}>
                        {billData.Damagepay}
                      </Text>
                    </View>
                  ) : null}

                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Advanced Payed:</Text>
                    <Text style={styles.labelValue}>{billData.AdvancePay}</Text>
                  </View>
                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable}>Exact Amount:</Text>
                    <Text style={styles.labelValue}>{billData.Amount}</Text>
                  </View>

                  <View style={styles.labelContainer}>
                    <Text style={styles.Lable2}>Total Amount:</Text>
                    <Text style={styles.labelValue2}>
                      {billData.Amount -
                        billData.AdvancePay -
                        billData.Discount +
                        parseFloat(billData.Tip)}
                    </Text>
                  </View>
                  {/* <Button style={styles.Button} title="Close" onPress={handleCloseModal} /> */}
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.CloseButton}
                      onPress={handleCloseModal}>
                      <Text
                        style={{
                          color: '#feb101',
                          fontWeight: '500',
                          fontSize: 18,
                          letterSpacing: 2,
                        }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  ModalParentConainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundColor: '#feb101',
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10, // Optional: Add margin between label-value pairs
  },
  Lable: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  labelValue: {
    color: 'green',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  Lable2: {
    color: '#000',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  labelValue2: {
    color: 'green',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputDiscount: {
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    fontSize: 14,
    color: 'green',
    textAlign: 'right',
  },
  billContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 50,
    marginTop: 50,
    borderRadius: 10,
    elevation: 5, // Android shadow
    shadowColor: '#000000c2', // iOS shadow
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    width: '90%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  billHeader: {
    fontSize: screenWidth * 0.03,
    textTransform: 'capitalize',
    borderBottomWidth: 1,
    width: screenWidth * 0.25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#feb101',
    backgroundColor: '#000',
    paddingHorizontal: 1,
    paddingVertical: 9,
    borderRadius: 9,
    width: '100%',
  },

  // Add more styles as needed
});
export default Bill;
