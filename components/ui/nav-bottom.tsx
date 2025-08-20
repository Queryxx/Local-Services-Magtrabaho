import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, MessageCircle, UserCircle } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function NavBottom({ state, descriptors, navigation }: BottomTabBarProps) {
  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#6366f1' : '#9ca3af';
    switch (routeName) {
      case 'Home':
        return <Home color={color} size={24} />;
      case 'SearchArea':
        return <Search color={color} size={24} />;
      case 'MessageList':
        return <MessageCircle color={color} size={24} />;
      case 'Dashboard':
        return <UserCircle color={color} size={24} />;
      default:
        return null;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'SearchArea':
        return 'Search';
      case 'MessageList':
        return 'Messages';
      case 'Dashboard':
        return 'Dashboard';
      default:
        return routeName;
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pb-6 pt-4">
      <View className="flex-row justify-between items-center">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              className="items-center"
              onPress={onPress}
            >
              {getIcon(route.name, isFocused)}
              <Text className={`text-xs mt-1 ${isFocused ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>
                {getLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
