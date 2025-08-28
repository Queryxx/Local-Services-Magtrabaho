import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Languages } from 'lucide-react-native';

interface FloatingTranslateButtonProps {
  onPress?: () => void;
  isVisible?: boolean;
}

const FloatingTranslateButton: React.FC<FloatingTranslateButtonProps> = ({ 
  onPress = () => {}, 
  isVisible = true 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  if (!isVisible) return null;

  return (
    <View className="absolute bottom-6 right-6 z-10">
      <TouchableOpacity
        className={`w-14 h-14 rounded-full items-center justify-center shadow-lg ${
          isPressed ? 'bg-indigo-700' : 'bg-indigo-600'
        }`}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        activeOpacity={0.8}
      >
        <Languages size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingTranslateButton;