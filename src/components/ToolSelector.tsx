import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ToolSelectorProps {
  onSelectTool: (tool: string) => void;
  selectedTool: string;
}

interface ToolOption {
  name: string;
  label: string;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ onSelectTool, selectedTool }) => {
  const tools: ToolOption[] = [
    { name: 'pencil', label: 'Pencil' },
    { name: 'pen', label: 'Pen' },
    { name: 'brush', label: 'Brush' },
    { name: 'watercolor', label: 'Watercolor' },
    { name: 'crayon', label: 'Crayon' },
    { name: 'eraser', label: 'Eraser' },
  ];

  return (
    <View style={styles.container}>
      {tools.map(tool => (
        <TouchableOpacity
          key={tool.name}
          style={[
            styles.toolButton,
            selectedTool === tool.name && styles.selectedTool,
          ]}
          onPress={() => onSelectTool(tool.name)}>
          <Text style={[
            styles.toolText,
            selectedTool === tool.name && styles.selectedToolText
          ]}>
            {tool.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toolButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedTool: {
    backgroundColor: '#d0d0d0',
  },
  toolText: {
    color: '#333',
  },
  selectedToolText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ToolSelector;