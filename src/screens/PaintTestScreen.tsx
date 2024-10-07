import {Canvas, Path} from '@shopify/react-native-skia';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface IPath {
  segments: String[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#06d6a0');
  const [startDraw, setStartDraw] = useState<boolean>(false);
  const [activelyDrawing, setActivelyDrawing] = useState<boolean>(false);
  const [endDraw, setEndDraw] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{x: number; y: number}>({x: 0, y: 0});
  const [endPoint, setEndPoint] = useState<{x: number; y: number}>({x: 0, y: 0});

  useEffect(() => {
    if (startDraw) {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: selectedColor,
      };
      newPaths[paths.length].segments.push(`M ${startPoint.x} ${startPoint.y}`);
      setPaths(newPaths);
      console.log('start Draw EFFECT==================================>');  
      setStartDraw(false);
      setActivelyDrawing(true);
    }
  }, [startDraw, paths, selectedColor, startPoint]);

  useEffect(() => {
    if (endDraw) {
      console.log('endDraw side effect====================================================================================== ->');
      paths[paths.length - 1].segments.push(`M ${endPoint.x} ${endPoint.y}`);
      setEndDraw(false);
    }
  }, [endDraw, endPoint, paths]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(g => {
      console.log('start Draw ==================================>');      
      setStartPoint({x: g.x, y: g.y});
      setStartDraw(true);
    })
    .onUpdate(g => {
      if (activelyDrawing) {
        console.log('update Draw ->');
        const index = paths.length - 1;
        const newPaths = [...paths];
        if (newPaths?.[index]?.segments) {
          newPaths[index].segments.push(`L ${g.x} ${g.y}`);
          setPaths(newPaths);
        }
      }
    })
    .onTouchesUp(g => {
      console.log('endDraw touchesUp ========================================================= ->', g);
    })
    .onEnd(g => {
      console.log('endDraw ========================================================= ->');

      setEndPoint({x: g.x, y: g.y});
      setActivelyDrawing(false);
      setEndDraw(true);
    })
    .minDistance(1);

  const colorSwatches = ['#06d6a0', '#f9c74f', '#f3722c', '#f94144', '#277da1', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#264653'];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        {colorSwatches.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedColor(color)}>
            <View style={{width: 30, height: 30, backgroundColor: color, margin: 5}} />
          </TouchableOpacity>
        ))}
      </View>
      <GestureDetector gesture={pan}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Canvas style={{flex: 8}}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(' ')}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
