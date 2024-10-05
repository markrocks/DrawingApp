import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import LoadingScreen from './src/screens/LoadingScreen';
// import SelectionScreen from './src/screens/SelectionScreen';
// import DrawingScreen from './src/screens/DrawingScreen';
// import PaintingScreen from './src/screens/PaintingScreen';
import DrawTestScreen from './src/screens/DrawTestScreen';
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

// // Define the RootStackParamList
// export type RootStackParamList = {
//   Loading: undefined;
//   Selection: undefined;
//   Drawing: undefined;
//   Painting: undefined;
//   Test: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const pressed = useSharedValue<boolean>(false);
  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });
  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
  }));
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <GestureDetector gesture={tap}>
          {/* <Animated.View style={[styles.circle, animatedStyles]} /> */}
          <DrawTestScreen />
        </GestureDetector>
      </View>

      {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Painting" component={PaintingScreen} />
        <Stack.Screen name="Test" component={DrawTestScreen} />
      </Stack.Navigator>
    </NavigationContainer> */}
    </GestureHandlerRootView>
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
