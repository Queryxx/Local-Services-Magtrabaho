import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { User, Mail, Phone, MapPin, Calendar, CheckCircle, Star } from 'lucide-react-native';

interface ProfileProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    location: string;
    lastLogin: string;
    verified: boolean;
    workerDetails?: {
      rating: number;
    };
  };
}

export function Profile({ user }: ProfileProps) {
  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
      <View className="flex-row items-center mb-4">
        <Image
          source={{ uri: user.avatar }}
          className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-100"
        />
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </Text>
            {user.verified && (
              <CheckCircle color="#10b981" size={20} className="ml-2" />
            )}
          </View>
          <Text className="text-gray-500 capitalize mb-1">{user.role}</Text>
          {user.workerDetails && (
            <View className="flex-row items-center bg-indigo-50 px-2 py-1 rounded-full self-start">
              <Star color="#fbbf24" size={14} fill="#fbbf24" />
              <Text className="text-indigo-700 text-sm font-medium ml-1">
                {user.workerDetails.rating} Rating
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex-row flex-wrap">
        <View className="flex-row items-center w-1/2 mb-3">
          <Mail color="#6366f1" size={18} className="mr-2" />
          <Text className="text-gray-600 text-sm">{user.email}</Text>
        </View>
        <View className="flex-row items-center w-1/2 mb-3">
          <Phone color="#6366f1" size={18} className="mr-2" />
          <Text className="text-gray-600 text-sm">{user.phone}</Text>
        </View>
        <View className="flex-row items-center w-1/2">
          <MapPin color="#6366f1" size={18} className="mr-2" />
          <Text className="text-gray-600 text-sm">{user.location}</Text>
        </View>
        <View className="flex-row items-center w-1/2">
          <Calendar color="#6366f1" size={18} className="mr-2" />
          <Text className="text-gray-600 text-sm">
            Last login: {user.lastLogin}
          </Text>
        </View>
      </View>
    </View>
  );
}
