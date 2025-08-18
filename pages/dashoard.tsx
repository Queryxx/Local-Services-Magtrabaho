import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
  Camera,
  FileCheck,
  Star,
  TrendingUp,
  Wallet,
  Home,
  Search,
  MessageCircle,
  UserCircle,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Profile } from "../components/ui/profile";

export default function DashboardScreen() {
  // Mock user data - in a real app this would come from authentication context
  const [user, setUser] = useState({
    id: 1,
    firstName: "John Rix",
    lastName: "Domaoal",
    email: " johnrix6@gmail.com",
    phone: "+63 935 145 5907",
    role: "worker", // or 'client'
    avatar:
      "../assets/logo.png",
    lastLogin: "2025-08-18 22:30",
    location: "Encantadia Philippines",
    verified: true,
    securityScore: 95,
    workerDetails: {
      jobTitle: "Plumber",
      experience: "5 years",
      hourlyRate: "₱500/hr",
      completedJobs: 124,
      rating: 4.8,
    },
    clientDetails: {
      company: "Tech Solutions Inc.",
      projects: 8,
      totalSpent: "₱45,750",
    },
  });

  const recentActivity = [
    {
      id: 1,
      title: "Job Request Accepted",
      description: "Plumbing job in Downtown",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "Profile Updated",
      description: "Security settings changed",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 3,
      title: "Payment Received",
      description: "₱7,500 for plumbing service",
      time: "2 days ago",
      type: "success",
    },
    {
      id: 4,
      title: "ID Verification Complete",
      description: "Government ID verified",
      time: "3 days ago",
      type: "success",
    },
  ];

  const quickActions = [
    { id: 1, title: "Edit Profile", icon: "User", color: "bg-blue-100", iconColor: "#3b82f6" },
    { id: 2, title: "Security", icon: "Shield", color: "bg-indigo-100", iconColor: "#6366f1" },
    { id: 3, title: "Payments", icon: "CreditCard", color: "bg-green-100", iconColor: "#10b981" },
    { id: 4, title: "Notifications", icon: "Bell", color: "bg-amber-100", iconColor: "#f59e0b" },
    { id: 5, title: "Privacy", icon: "Lock", color: "bg-purple-100", iconColor: "#8b5cf6" },
    { id: 6, title: "Logout", icon: "LogOut", color: "bg-rose-100", iconColor: "#f43f5e" },
  ];

  const securityFeatures = [
    { id: 1, title: "Face Recognition", enabled: true, icon: "Camera" },
    { id: 2, title: "Two-Factor Auth", enabled: true, icon: "Fingerprint" },
    { id: 3, title: "ID Verification", enabled: true, icon: "FileCheck" },
    { id: 4, title: "Secure Payments", enabled: true, icon: "CreditCard" },
  ];

  const renderWorkerDashboard = () => (
    <View className="mt-6">
      <View className="bg-indigo-50 rounded-2xl p-5 mb-6 shadow-sm">
        <Text className="text-lg font-bold text-indigo-800 mb-4">
          Professional Dashboard
        </Text>
        <View className="flex-row justify-between mb-4">
          <View className="bg-white p-3 rounded-xl items-center flex-1 mr-2">
            <Text className="text-gray-600 text-sm">Job Title</Text>
            <Text className="font-bold text-lg mt-1">
              {user.workerDetails.jobTitle}
            </Text>
          </View>
          <View className="bg-white p-3 rounded-xl items-center flex-1 ml-2">
            <Text className="text-gray-600 text-sm">Experience</Text>
            <Text className="font-bold text-lg mt-1">
              {user.workerDetails.experience}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="bg-white p-3 rounded-xl items-center flex-1 mr-2">
            <Text className="text-gray-600 text-sm">Hourly Rate</Text>
            <Text className="font-bold text-lg mt-1 text-green-600">
              {user.workerDetails.hourlyRate}
            </Text>
          </View>
          <View className="bg-white p-3 rounded-xl items-center flex-1 ml-2">
            <Text className="text-gray-600 text-sm">Completed Jobs</Text>
            <Text className="font-bold text-lg mt-1">
              {user.workerDetails.completedJobs}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Performance Metrics
        </Text>
        <View className="flex-row items-center justify-between mb-4">
          <View className="items-center">
            <Text className="text-3xl font-bold text-indigo-600">
              {user.workerDetails.rating}
            </Text>
            <View className="flex-row mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  color={
                    i < Math.floor(user.workerDetails.rating)
                      ? "#fbbf24"
                      : "#d1d5db"
                  }
                  size={20}
                  fill={
                    i < Math.floor(user.workerDetails.rating)
                      ? "#fbbf24"
                      : "none"
                  }
                />
              ))}
            </View>
            <Text className="text-gray-500 mt-1">Rating</Text>
          </View>
          <View className="items-center">
            <TrendingUp color="#10b981" size={32} />
            <Text className="text-2xl font-bold text-green-500 mt-1">92%</Text>
            <Text className="text-gray-500 mt-1">Success Rate</Text>
          </View>
          <View className="items-center">
            <Clock color="#8b5cf6" size={32} />
            <Text className="text-2xl font-bold text-purple-500 mt-1">24h</Text>
            <Text className="text-gray-500 mt-1">Avg. Response</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderClientDashboard = () => (
    <View className="mt-6">
      <View className="bg-purple-50 rounded-2xl p-5 mb-6 shadow-sm">
        <Text className="text-lg font-bold text-purple-800 mb-4">
          Client Dashboard
        </Text>
        <View className="flex-row justify-between mb-4">
          <View className="bg-white p-3 rounded-xl items-center flex-1 mr-2">
            <Text className="text-gray-600 text-sm">Company</Text>
            <Text className="font-bold text-lg mt-1">
              {user.clientDetails.company}
            </Text>
          </View>
          <View className="bg-white p-3 rounded-xl items-center flex-1 ml-2">
            <Text className="text-gray-600 text-sm">Active Projects</Text>
            <Text className="font-bold text-lg mt-1 text-indigo-600">
              {user.clientDetails.projects}
            </Text>
          </View>
        </View>
        <View className="bg-white p-3 rounded-xl items-center">
          <Text className="text-gray-600 text-sm">Total Spent</Text>
          <Text className="font-bold text-2xl text-green-600 mt-1">
            {user.clientDetails.totalSpent}
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Recent Projects
        </Text>
        <View className="space-y-4">
          <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
            <View>
              <Text className="font-bold">Office Plumbing</Text>
              <Text className="text-gray-500 text-sm">May 12, 2023</Text>
            </View>
            <Text className="text-green-600 font-bold">₱22,500</Text>
          </View>
          <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
            <View>
              <Text className="font-bold">Electrical Work</Text>
              <Text className="text-gray-500 text-sm">May 5, 2023</Text>
            </View>
            <Text className="text-green-600 font-bold">₱43,750</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-bold">HVAC Maintenance</Text>
              <Text className="text-gray-500 text-sm">Apr 28, 2023</Text>
            </View>
            <Text className="text-green-600 font-bold">₱60,000</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const [activeTab, setActiveTab] = useState('home');

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={["#6366f1", "#8b5cf6"]}
        className="px-6 pt-12 pb-8 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Welcome back,</Text>
            <Text className="text-white text-xl">
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <TouchableOpacity className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
            <Image
              source={{ uri: user.avatar }}
              className="w-14 h-14 rounded-full border-2 border-white"
            />
          </TouchableOpacity>
        </View>

        <View className="bg-white/20 rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="bg-white/30 p-2 rounded-full mr-3">
                <Shield color="white" size={20} />
              </View>
              <View>
                <Text className="text-white font-bold">Security Status</Text>
                <Text className="text-white/80 text-sm">
                  Face ID & 2FA enabled
                </Text>
              </View>
            </View>
            <View className="bg-white/30 px-3 py-1 rounded-full">
              <Text className="text-white font-bold">
                {user.securityScore}% Secure
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 -mt-6" showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <Profile user={user} />

        {/* Security Features */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Security Features
          </Text>
          <View className="flex-row flex-wrap">
            {securityFeatures.map((feature) => (
              <View
                key={feature.id}
                className="w-1/2 mb-4 flex-row items-center"
              >
                <View className="bg-indigo-100 p-2 rounded-full mr-3">
                  {feature.icon === "Camera" && (
                    <Camera color="#6366f1" size={20} />
                  )}
                  {feature.icon === "Fingerprint" && (
                    <Fingerprint color="#6366f1" size={20} />
                  )}
                  {feature.icon === "FileCheck" && (
                    <FileCheck color="#6366f1" size={20} />
                  )}
                  {feature.icon === "CreditCard" && (
                    <CreditCard color="#6366f1" size={20} />
                  )}
                </View>
                <View>
                  <Text className="font-medium">{feature.title}</Text>
                  <Text className="text-green-600 text-sm font-medium">
                    {feature.enabled ? "Enabled" : "Disabled"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Role-specific Dashboard */}
        {user.role === "worker"
          ? renderWorkerDashboard()
          : renderClientDashboard()}

        {/* Recent Activity */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Recent Activity
          </Text>
          <View className="space-y-4">
            {recentActivity.map((activity) => (
              <View key={activity.id} className="flex-row">
                <View className="mr-3 mt-1">
                  {activity.type === "success" ? (
                    <CheckCircle color="#10b981" size={20} />
                  ) : activity.type === "info" ? (
                    <AlertCircle color="#3b82f6" size={20} />
                  ) : (
                    <Clock color="#f59e0b" size={20} />
                  )}
                </View>
                <View className="flex-1 border-b border-gray-100 pb-4">
                  <Text className="font-bold">{activity.title}</Text>
                  <Text className="text-gray-600 text-sm">{activity.description}</Text>
                  <Text className="text-gray-400 text-xs">{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-white rounded-2xl p-4 items-center justify-center w-1/2 mb-4 shadow-sm px-2"
              >
                <View className={`p-3 rounded-full mb-2 ${action.color}`}>
                  {action.icon === "User" && (
                    <User color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Shield" && (
                    <Shield color={action.iconColor} size={24} />
                  )}
                  {action.icon === "CreditCard" && (
                    <CreditCard color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Bell" && (
                    <Bell color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Lock" && (
                    <Lock color={action.iconColor} size={24} />
                  )}
                  {action.icon === "LogOut" && (
                    <LogOut color={action.iconColor} size={24} />
                  )}
                </View>
                <Text className="text-gray-700 font-medium text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pb-6 pt-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            className="items-center" 
            onPress={() => setActiveTab('home')}
          >
            <Home color={activeTab === 'home' ? '#6366f1' : '#9ca3af'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'home' ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => setActiveTab('search')}
          >
            <Search color={activeTab === 'search' ? '#6366f1' : '#9ca3af'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'search' ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => setActiveTab('messages')}
          >
            <MessageCircle color={activeTab === 'messages' ? '#6366f1' : '#9ca3af'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'messages' ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="items-center"
            onPress={() => setActiveTab('profile')}
          >
            <UserCircle color={activeTab === 'profile' ? '#6366f1' : '#9ca3af'} size={24} />
            <Text className={`text-xs mt-1 ${activeTab === 'profile' ? 'text-indigo-500 font-medium' : 'text-gray-500'}`}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}