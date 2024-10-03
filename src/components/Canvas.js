import React, { useRef, useState } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Canvas = ({ color, tool }) => {
  const [paths, setPaths] = useState([]);
  const currentPath = useRef('');

  const getStrokeWidth = () => {
    switch (tool) {
      case 'pencil':
        return 2;
      case 'paintbrush':
        return 8;
      case 'crayon':
        return 15;
      default:
        return 2;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current = `M ${locationX} ${locationY}`;
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      currentPath.current += ` L ${locationX} ${locationY}`;
      setPaths([...paths]);
    },
    onPanResponderRelease: () => {
      setPaths([...paths, { d: currentPath.current, color, strokeWidth: getStrokeWidth() }]);
      currentPath.current = '';
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg height="100%" width="100%">
        {paths.map((path, index) => (
          <Path
            key={index}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.strokeWidth}
            fill="none"
          />
        ))}
        {currentPath.current && (
          <Path
            d={currentPath.current}
            stroke={color}
            strokeWidth={getStrokeWidth()}
            fill="none"
          />
        )}
      </Svg>
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

export default Canvas;