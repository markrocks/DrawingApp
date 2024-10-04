import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  Canvas,
  useCanvasRef,
  useTouchHandler,
  Box,
  BoxShadow,
  Fill,
  rrect,
  rect,
  Image,
  useImage,
  Skia,
  Path,
  Shadow,
  PathOp,
} from '@shopify/react-native-skia';
import {drawNoisyCircle} from '../util/Tools';
import {useSharedValue} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const rct = rect(0, 0, width, height);

const PaintingScreen = () => {
  const canvasRef = useCanvasRef();
  const doodlePic = useImage(require('../../assets/doodlepic1.png'));
  //   const path = useSharedValue(Skia.Path.Make());
  let path = Skia.Path.Make();
  path.addCircle(width / 2, height / 2, 100);
  path.addCircle((width / 2) + 100, (height / 2) + 100, 50);
  const onTouch = useTouchHandler({
    onStart: e => {
      console.log('touch event2');
      //   path = Skia.Path.MakeFromOp(path, drawNoisyCircle(e), PathOp.Union)!;
      path =  Skia.Path.MakeFromOp (path , Skia.Path.Make(),  PathOp.Union);
      console.log('path event', path);
      console.log('e ( x,y) = ' + e.x + ', ' + e.y);
    },
    onActive: e => {
      console.log('active touch event3');
      //   path = Skia.Path.MakeFromOp(path, drawNoisyCircle(e), PathOp.Union)!;
      path.addCircle(e.x, e.y, 20);
    },
  });

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} ref={canvasRef} onTouch={onTouch}>
        {/* Skia drawing components will go here */}
        {/* <Image image={doodlePic} rect={rct} /> */}
        <Path path={path} color="red">
          <Shadow dx={0} dy={0} blur={2} color="rgba(0,0,0,0.5)" inner />
        </Path>
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
    width: width,
    height: height,
  },
});

export default PaintingScreen;
