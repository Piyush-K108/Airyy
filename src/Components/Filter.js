// Select.js
import React, {useState} from 'react';
import {View, Text, Picker, StyleSheet} from 'react-native';

const Select = ({options, onSelect}) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleSelectChange = value => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>Select:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={value => handleSelectChange(value)}
        style={styles.picker}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    width: 200,
  },
});

export default Select;
