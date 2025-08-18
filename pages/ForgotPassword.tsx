import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for instructions to reset your password',
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="flex-1"
      >
        <View className="flex-1 mt-16">
          {/* Header */}
          <View className="flex-row items-center px-6 mb-10">
            <TouchableOpacity 
              className="mr-4"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Forgot Password</Text>
          </View>

          {/* Form Container */}
          <View className="bg-white rounded-t-3xl flex-1 px-6 pt-10">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Reset Your Password
            </Text>
            <Text className="text-gray-500 mb-8">
              Enter your email address and we'll send you a link to reset your password
            </Text>

            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Mail size={20} color="#9ca3af" className="mr-3" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              className="bg-indigo-500 rounded-xl py-4 items-center justify-center mb-6"
              onPress={handlePasswordReset}
              disabled={isLoading}
            >
              <Text className="text-white font-bold text-lg">
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Text>
            </TouchableOpacity>

            {/* Security Notice */}
            <View className="bg-blue-50 rounded-xl p-4 mb-6">
              <Text className="text-blue-800 font-medium mb-1">
                Security Notice
              </Text>
              <Text className="text-blue-600 text-sm">
                For security reasons, the password reset link will expire in 24 hours. 
                If you don't receive an email, please check your spam folder.
              </Text>
            </View>

            {/* Additional Help */}
            <View className="mt-8">
              <Text className="text-gray-500 text-center mb-2">
                Need additional help?
              </Text>
              <TouchableOpacity className="items-center">
                <Text className="text-indigo-500 font-medium">
                  Contact Support
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}