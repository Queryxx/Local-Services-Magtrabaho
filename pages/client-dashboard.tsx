import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  ClientDashboard: undefined;
  NBIClearance: undefined;
};
import {
  User,
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Wallet,
  FileText,
  Award,
  Settings,
  LogOut,
  Search,
  Eye,
  EyeOff,
  Shield,
  Fingerprint,
  Camera,
  FileCheck,
  Users,
  CircleDollarSign,
  BarChart2,
  Bell,
  Plus,
  Edit3,
  MessageSquare,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ClientDashboard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState({
    id: 1,
    firstName: "Johnny",
    lastName: "Santos",
    email: "maria.santos@example.com",
    phone: "+63 (919) 123-4567",
    avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    lastLogin: "2023-05-15 14:30",
    location: "Makati City, Philippines",
    verified: true,
    company: "Santos Enterprises",
    role: "Homeowner",
    postedJobs: 18,
    activeJobs: 5,
    totalSpent: "₱12,450",
    avgRating: 4.7,
    responseRate: "92%",
  });

  const jobs = [
    {
      id: 1,
      title: "House Laundry",
      category: "Labandera",
      date: "May 12, 2023",
      status: "Completed",
      amount: "₱450",
      worker: "Rosalie Mendoza",
      rating: 5,
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: 2,
      title: "House Construction",
      category: "Construction Worker",
      date: "May 5, 2023",
      status: "In Progress",
      amount: "₱875",
      worker: "Juan dela Cruz",
      rating: 4,
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: 3,
      title: "Math Tutoring",
      category: "Tutor",
      date: "Apr 28, 2023",
      status: "Pending",
      amount: "₱1,200",
      worker: "Angela Reyes",
      rating: 0,
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: 4,
      title: "Rice Field Work",
      category: "Farmer",
      date: "Apr 25, 2023",
      status: "Completed",
      amount: "₱800",
      worker: "Pedro Santos",
      rating: 5,
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    },
    {
      id: 5,
      title: "Driver",
      category: "Driver",
      date: "Apr 22, 2023",
      status: "Completed",
      amount: "₱1,500",
      worker: "Ramon Garcia",
      rating: 4,
      avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    }
  ];

  const quickActions = [
    { id: 1, title: "Post New Job", icon: "Plus", color: "bg-indigo-100", iconColor: "#6366f1" },
    { id: 2, title: "My Jobs", icon: "Briefcase", color: "bg-blue-100", iconColor: "#3b82f6" },
    { id: 3, title: "Payments", icon: "Wallet", color: "bg-green-100", iconColor: "#10b981" },
    { id: 4, title: "Messages", icon: "MessageSquare", color: "bg-purple-100", iconColor: "#8b5cf6" },
  ];

  const stats = [
    { id: 1, title: "Active Jobs", value: "5", icon: "Briefcase", color: "#6366f1" },
    { id: 2, title: "Total Spent", value: "₱12,450", icon: "CircleDollarSign", color: "#10b981" },
    { id: 3, title: "Avg. Rating", value: "4.7", icon: "Star", color: "#fbbf24" },
    { id: 4, title: "Workers Hired", value: "24", icon: "Users", color: "#8b5cf6" },
  ];

  const renderRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        color={i < rating ? "#fbbf24" : "#d1d5db"}
        size={16}
        fill={i < rating ? "#fbbf24" : "none"}
      />
    ));
  };

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
          <View>
            <View className="relative mb-3">
              <View className="relative">
                <TouchableOpacity className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-14 h-14 rounded-full border-2 border-white"
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 rounded-full px-3 py-1 flex-row items-center justify-center shadow-sm"
                  style={{ transform: [{ translateX: -24 }] }}
                  onPress={() => navigation.navigate('NBIClearance')}
                >
                  <Shield size={12} color="white" className="mr-1" />
                  <Text className="text-white text-xs font-medium">Verify Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-white/20 rounded-full px-4 py-2 flex-row items-center justify-center"
              onPress={() => navigation.navigate('Login')}
            >
              <LogOut size={16} color="white" className="mr-2" />
              <Text className="text-white font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white/20 rounded-2xl p-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="bg-white/30 p-2 rounded-full mr-3">
                <Briefcase color="white" size={20} />
              </View>
              <View>
                <Text className="text-white font-bold">{user.company}</Text>
                <Text className="text-white/80 text-sm">
                  {user.role}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center bg-white/30 px-3 py-1 rounded-full">
              <Star color="#fbbf24" size={16} fill="#fbbf24" />
              <Text className="text-white font-bold ml-1">
                {user.avgRating} Rating
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 -mt-6" showsVerticalScrollIndicator={false}>
        {/* Client Stats */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {stats.map((stat) => (
            <View 
              key={stat.id} 
              className="bg-white rounded-2xl p-4 shadow-sm mb-4 w-[48%]"
            >
              <View className="flex-row items-center mb-2">
                {stat.icon === "Briefcase" && (
                  <Briefcase color={stat.color} size={20} />
                )}
                {stat.icon === "CircleDollarSign" && (
                  <CircleDollarSign color={stat.color} size={20} />
                )}
                {stat.icon === "Star" && (
                  <Star color={stat.color} size={20} />
                )}
                {stat.icon === "Users" && (
                  <Users color={stat.color} size={20} />
                )}
                <Text className="text-gray-500 ml-2">{stat.title}</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800">{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Recent Jobs */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Recent Jobs
            </Text>
            <TouchableOpacity>
              <Text className="text-indigo-600">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-4">
            {jobs.map((job) => (
              <View
                key={job.id}
                className="flex-row items-center justify-between pb-3 border-b border-gray-100"
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: job.avatar }}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <View>
                    <Text className="font-bold">{job.title}</Text>
                    <Text className="text-gray-500 text-sm">{job.worker}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-green-600 font-bold">{job.amount}</Text>
                  <View className="flex-row mt-1">
                    {job.rating > 0 ? (
                      renderRatingStars(job.rating)
                    ) : (
                      <Text className="text-gray-400 text-xs">{job.status}</Text>
                    )}
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full mt-1 ${
                      job.status === "Completed"
                        ? "bg-green-100"
                        : job.status === "In Progress"
                        ? "bg-blue-100"
                        : "bg-amber-100"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        job.status === "Completed"
                          ? "text-green-700"
                          : job.status === "In Progress"
                          ? "text-blue-700"
                          : "text-amber-700"
                      }`}
                    >
                      {job.status}
                    </Text>
                  </View>
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
          <View className="flex-row flex-wrap">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-white rounded-2xl p-4 items-center justify-center w-1/2 mb-4 shadow-sm"
              >
                <View className={`p-3 rounded-full mb-2 ${action.color}`}>
                  {action.icon === "Plus" && (
                    <Plus color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Briefcase" && (
                    <Briefcase color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Wallet" && (
                    <Wallet color={action.iconColor} size={24} />
                  )}
                  {action.icon === "MessageSquare" && (
                    <MessageSquare color={action.iconColor} size={24} />
                  )}
                </View>
                <Text className="text-gray-700 font-medium text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Performance Overview */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Performance Overview
          </Text>
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-3xl font-bold text-indigo-600">
                {user.responseRate}
              </Text>
              <Text className="text-gray-500 mt-1">Response Rate</Text>
            </View>
            <View className="items-center">
              <TrendingUp color="#10b981" size={32} />
              <Text className="text-2xl font-bold text-green-500 mt-1">
                24%
              </Text>
              <Text className="text-gray-500 mt-1">Growth</Text>
            </View>
            <View className="items-center">
              <Clock color="#8b5cf6" size={32} />
              <Text className="text-2xl font-bold text-purple-500 mt-1">
                24h
              </Text>
              <Text className="text-gray-500 mt-1">Avg. Response</Text>
            </View>
          </View>
          
          <View className="mt-4">
            <Text className="text-gray-700 mb-2">Job Completion Rate</Text>
            <View className="h-3 bg-gray-200 rounded-full">
              <View
                className="h-3 bg-green-500 rounded-full"
                style={{ width: "92%" }}
              />
            </View>
            <Text className="text-right text-gray-500 mt-1">92%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}