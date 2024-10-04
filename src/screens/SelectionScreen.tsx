import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the RootStackParamList to match your navigation structure
type RootStackParamList = {
  Loading: undefined;
  Selection: undefined;
  Drawing: undefined;
  Painting: undefined;
  Test: undefined;
};

type SelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Selection'>;

const SelectionScreen = () => {
  const navigation = useNavigation<SelectionScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Drawing')}
      >
        <Text style={styles.buttonText}>Drawing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Painting')}
      >
        <Text style={styles.buttonText}>Painting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Test')}
      >
        <Text style={styles.buttonText}>Test Screewn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectionScreen;
