// Checkbox.js
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const Checkbox = ({label, value, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, style]}
      onPress={onPress}>
      <View
        style={[
          styles.checkbox,
          {backgroundColor: value ? '#facc15' : 'transparent'},
        ]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={{color: 'black', marginHorizontal: 10}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    // marginBottom: 8,
    // marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  checkmark: {
    color: '#000',
    marginLeft: 3,
  },
});

export default Checkbox;
