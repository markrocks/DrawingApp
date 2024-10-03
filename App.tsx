import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import DrawingScreen from './src/screens/DrawingScreen';
import PaintingScreen from './src/screens/PaintingScreen';

// Define the RootStackParamList
export type RootStackParamList = {
  Loading: undefined;
  Selection: undefined;
  Drawing: undefined;
  Painting: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Painting" component={PaintingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
