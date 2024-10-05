import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {SafeAreaView, Text} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

const END_POSITION = 200;

export default function App() {
  const [tGestureStart, setTGestureStart] = useState<undefined | string>('XXX');
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const positionY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(g => {})
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX;
        positionY.value = e.translationY;
      } else {
        position.value = END_POSITION + e.translationX;
        positionY.value = e.translationY;
      }
      setTGestureStart('STart val');
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, {duration: 100});
        onLeft.value = false;
      } else {
        position.value = withTiming(0, {duration: 100});
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}, {translateY: positionY.value}],
  }));

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
            }}>{`Gesture updated to:  ${position.value}`}</Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 121,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});
