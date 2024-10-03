import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useCanvasRef, useTouchHandler, Box, BoxShadow, Fill, rrect, rect } from '@shopify/react-native-skia';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const PaintingScreen = () => {
  const canvasRef = useCanvasRef();

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} ref={canvasRef} children={null}>
        {/* Skia drawing components will go here */}
        <Fill color="#add8e6" />
    <Box box={rrect(rect(64, 64, 128, 128), 24, 24)} color="#add8e6">
      <BoxShadow dx={10} dy={10} blur={10} color="#93b8c4" inner />
      <BoxShadow dx={-10} dy={-10} blur={10} color="#c7f8ff" inner />
      <BoxShadow dx={10} dy={10} blur={10} color="#93b8c4" />
      <BoxShadow dx={-10} dy={-10} blur={10} color="#c7f8ff" />
    </Box>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  canvas: {
    flex: 1,
  },
});

export default PaintingScreen;
