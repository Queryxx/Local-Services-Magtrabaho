import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Search, MessageCircle, UserCircle, Plus, Bot, Briefcase, History } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../context/AuthContext';

interface NavigationItemProps {
  route: any;
  isFocused: boolean;
  descriptors: any;
  navigation: any;
  getIcon: (routeName: string, isFocused: boolean) => React.ReactNode;
  getLabel: (routeName: string) => string;
  isClientLayout?: boolean;
}

// Navigation Item Component
function NavigationItem({ 
  route, 
  isFocused, 
  descriptors, 
  navigation, 
  getIcon, 
  getLabel,
  isClientLayout 
}: NavigationItemProps) {
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
      className={`items-center ${isClientLayout ? 'flex-1' : 'w-16'}`}
      onPress={onPress}
    >
      {getIcon(route.name, isFocused)}
      <Text className={`text-xs mt-1 ${isFocused ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>
        {getLabel(route.name)}
      </Text>
    </TouchableOpacity>
  );
}

export default function NavBottom({ state, descriptors, navigation }: BottomTabBarProps) {
  const { userType } = useAuth();
  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#6366f1' : '#9ca3af';
    switch (routeName) {
      case 'Home':
        return <Home color={color} size={24} />;
      case 'Jobs':
        return <Briefcase color={color} size={24} />;
      case 'SearchArea':
        return <History color={color} size={24} />;
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
        return 'Jobs';
      case 'SearchArea':
        return 'History';
      case 'MessageList':
        return 'Messages';
      case 'Dashboard':
        return 'Profile';
      default:
        return routeName;
    }
  };

  const renderNavigationItems = () => {
    if (userType === 'worker') {
      return (
        <View className="flex-row items-center justify-between">
          {/* First half of items */}
          <View className="flex-1 flex-row justify-evenly">
            {state.routes.slice(0, 2).map((route, index) => (
              <NavigationItem
                key={route.key}
                route={route}
                isFocused={state.index === index}
                descriptors={descriptors}
                navigation={navigation}
                getIcon={getIcon}
                getLabel={getLabel}
              />
            ))}
          </View>

          {/* Center Plus Button */}
          <View className="w-20 items-center -mt-8">
            <TouchableOpacity
              className="w-14 h-14 bg-indigo-500 rounded-full items-center justify-center shadow-lg"
              onPress={() => navigation.navigate('JobUpload')}
            >
              <Plus color="white" size={28} />
            </TouchableOpacity>
          </View>

          {/* Second half of items */}
          <View className="flex-1 flex-row justify-evenly">
            {state.routes.slice(2).map((route, index) => (
              <NavigationItem
                key={route.key}
                route={route}
                isFocused={state.index === index + 2}
                descriptors={descriptors}
                navigation={navigation}
                getIcon={getIcon}
                getLabel={getLabel}
              />
            ))}
          </View>
        </View>
      );
    }

    // Client layout with 4 evenly spaced items
    return (
      <View className="flex-row items-center justify-between">
        {state.routes.map((route, index) => (
          <NavigationItem
            key={route.key}
            route={route}
            isFocused={state.index === index}
            descriptors={descriptors}
            navigation={navigation}
            getIcon={getIcon}
            getLabel={getLabel}
            isClientLayout={true}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <TouchableOpacity
        className="absolute right-4 bottom-24 w-14 h-14 bg-indigo-500 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Bot color="white" size={24} />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="px-6 pb-6 pt-4">
          {userType === 'worker' ? (
            // Worker layout with center plus button
            <View className="flex-row items-center justify-between">
              {/* First half of the navigation items */}
              <View className="flex-1 flex-row justify-evenly">
                {state.routes.slice(0, 2).map((route, index) => {
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
                      className="items-center w-16"
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

              {/* Center Plus Button */}
              <View className="w-20 items-center -mt-8">
                <TouchableOpacity
                  className="w-14 h-14 bg-indigo-500 rounded-full items-center justify-center shadow-lg"
                  onPress={() => navigation.navigate('JobUpload')}
                >
                  <Plus color="white" size={28} />
                </TouchableOpacity>
              </View>

              {/* Second half of the navigation items */}
              <View className="flex-1 flex-row justify-evenly">
                {state.routes.slice(2).map((route, index) => {
                  const actualIndex = index + 2;
                  const { options } = descriptors[route.key];
                  const isFocused = state.index === actualIndex;

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
                      className="items-center w-16"
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
          ) : (
            // Client layout with 4 evenly spaced items
            <View className="flex-row items-center justify-between">
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
                    className="items-center flex-1"
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
          )}
        </View>
      </View>
    </>
  );
   
}
