import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ModalComponent = ({isVisible, onClose}) => {
  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Booking successful!</Text>
          {/* <Text style={styles.modalText2}>Check your Schedule</Text> */}
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#000'
  },
  modalButton: {
    backgroundColor: '#000',
    // padding: 10,
    paddingHorizontal:30 ,
    paddingVertical:4 ,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#feb101',
    fontWeight: 'bold',
  },
});

export default ModalComponent;
