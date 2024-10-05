import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import DrawingScreen from './src/screens/DrawingScreen';
import PaintingScreen from './src/screens/PaintingScreen';
import DrawTestScreen from './src/screens/DrawTestScreen';
import DrawTestScreen2 from './src/screens/DrawTestScreen2';
import PaintTestScreen from './src/screens/PaintTestScreen';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Define the RootStackParamList
export type RootStackParamList = {
  Loading: undefined;
  Selection: undefined;
  Drawing: undefined;
  Painting: undefined;
  Test: undefined;
  Test2: undefined;
  PaintTest: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    //   <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Loading"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Selection" component={SelectionScreen} />
              <Stack.Screen name="Drawing" component={DrawingScreen} />
              <Stack.Screen name="Painting" component={PaintingScreen} />
              <Stack.Screen name="Test" component={DrawTestScreen} />
              <Stack.Screen name="Test2" component={DrawTestScreen2} />
              <Stack.Screen name="PaintTest" component={PaintTestScreen} />
            </Stack.Navigator>
          </NavigationContainer>
    //   </View>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});

export default App;
