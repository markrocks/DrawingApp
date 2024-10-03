import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Drawing: { brushType: string };
};

type BrushSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Drawing'>;

const BrushSelectionScreen = () => {
  const navigation = useNavigation<BrushSelectionScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Button
        title="Normal Brush"
        onPress={() => navigation.navigate('Drawing', { brushType: 'normal' })}
      />
      <Button
        title="Watercolor Brush"
        onPress={() => navigation.navigate('Drawing', { brushType: 'watercolor' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BrushSelectionScreen;