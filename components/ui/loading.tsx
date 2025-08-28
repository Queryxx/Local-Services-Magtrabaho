import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoadingIndicator() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        className="w-16 h-16 rounded-full items-center justify-center"
      >
        <ActivityIndicator 
          size="large" 
          color="#ffffff" 
        />
      </LinearGradient>
      
      <Text className="mt-6 text-lg font-bold text-gray-800">
        Loading
      </Text>
      
      <Text className="mt-2 text-gray-500">
        Please wait while we prepare your content
      </Text>
    </View>
  );
}