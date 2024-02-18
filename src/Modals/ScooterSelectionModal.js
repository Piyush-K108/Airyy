import React, {useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const ScooterSelectionModal = ({isVisible, onClose, onSelect}) => {
  const handleSelect = scooterType => {
    onSelect(scooterType);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Scooter Type</Text>
          <TouchableOpacity
            style={styles.optionButtonTwo}
            onPress={() => handleSelect('5G')}>
            <Text style={styles.optionText}>5G Scooter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleSelect('6G')}>
            <Text style={styles.optionText}>6G Scooter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionButton: {
    paddingVertical: 10,

    color: 'black',
    // borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#dbeafe',
    borderRadius: 10,
    marginTop: 8,
    elevation: 1,
    // borderWidth: 1,
    // borderBottomColor: '#ccc',
  },
  optionButtonTwo: {
    paddingVertical: 10,
    color: 'black',

    // borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    marginTop: 8,
    elevation: 1,
    // borderWidth: 1,
    // borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScooterSelectionModal;
