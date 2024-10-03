import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {PanResponder, GestureResponderEvent} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ToolSelector from '../components/ToolSelector';
import ColorPalette from '../components/ColorPalette';

// import Canvas from '../components/Canvas';

interface PathData {
  path: string;
  color: string;
  brushType: string;
  strokeWidth: number;
}

const getStrokeWidth = (brushType: string) => {
  console.log('this is the selected brushtype-> ', brushType);
  switch (brushType) {
    case 'pencil':
      return 3;
    case 'pen':
      return 5;
    case 'brush':
      return 10;
    case 'watercolor':
      return 20;
    case 'crayon':
      return 30;
    case 'eraser':
      return 20; // You can adjust this value for the eraser size
    default:
      return 3;
  }
};

const DrawingScreen = () => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedTool, setSelectedTool] = useState('brush');
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useState(3);
  const canvasRef = useRef<Svg | null>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event: GestureResponderEvent) => {
      const {locationX, locationY} = event.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (event: GestureResponderEvent) => {
      const {locationX, locationY} = event.nativeEvent;
      setCurrentPath(prevPath =>
        prevPath ? `${prevPath} L${locationX},${locationY}` : '',
      );
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths(prevPaths => [
          ...prevPaths,
          {
            path: currentPath,
            color: selectedTool === 'eraser' ? 'white' : selectedColor,
            brushType: selectedTool,
            strokeWidth: selectedStrokeWidth,
          },
        ]);
      }
      setCurrentPath(null);
    },
  });

  const handleSelectTool = (tool: string) => {
    setSelectedTool(tool);
    setSelectedStrokeWidth(getStrokeWidth(tool));
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  // const handleColorChange = (color: string) => {
  //   setCurrentColor(color);
  // };

  const renderPaths = () => {
    return paths.map((pathData, index) => (
      <Path
        key={index}
        d={pathData.path}
        stroke={pathData.color}
        strokeWidth={pathData.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={pathData.brushType === 'watercolor' ? 0.3 : 1}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <Svg style={styles.canvas} ref={canvasRef}>
          {renderPaths()}
          {currentPath && (
            <Path
              d={currentPath}
              stroke={selectedTool === 'eraser' ? 'white' : selectedColor}
              strokeWidth={getStrokeWidth(selectedTool)}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={selectedTool === 'watercolor' ? 0.3 : 1}
            />
          )}
        </Svg>
      </View>
      <View style={styles.controls}>
        <ColorPalette onSelectColor={handleSelectColor} />
        <ToolSelector
          onSelectTool={handleSelectTool}
          selectedTool={selectedTool}
        />
      </View>
      {/* <Canvas onColorChange={handleColorChange} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default DrawingScreen;
