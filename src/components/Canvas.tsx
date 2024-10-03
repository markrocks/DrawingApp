import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CanvasProps {
  color: string;
  tool: string;
  onColorChange: (color: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({ color, tool, onColorChange }) => {
  // Implement your canvas logic here
  return (
    <View style={styles.container}>
      {/* Your canvas implementation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your styles here
  },
});

export default Canvas;