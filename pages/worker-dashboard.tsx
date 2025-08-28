import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
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
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function WorkerDashboard() {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@example.com",
    phone: "+63 (919) 123-4567",
    avatar: "https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg",
    lastLogin: "2023-05-15 14:30",
    location: "Quezon City, Philippines",
    verified: true,
    jobTitle: "Construction Worker",
    experience: "5 years",
    hourlyRate: "₱150/hr",
    completedJobs: 124,
    rating: 4.8,
    totalEarnings: "₱28,450",
    availability: "Available",
    responseTime: "24h",
    successRate: "92%",
    securityScore: 95,
  });

  const jobApplications = [
    {
      id: 1,
      title: "House Laundry",
      client: "Maria Santos",
      date: "May 12, 2023",
      status: "Completed",
      amount: "₱450",
      rating: 5,
    },
    {
      id: 2,
      title: "Math Tutorial",
      client: "Pedro Reyes",
      date: "May 5, 2023",
      status: "In Progress",
      amount: "₱875",
      rating: 4,
    },
    {
      id: 3,
      title: "Rice Field Work",
      client: "Ana Cruz",
      date: "Apr 28, 2023",
      status: "Pending",
      amount: "₱1,200",
      rating: 0,
    },
  ];

  const quickActions = [
    { id: 1, title: "Edit Profile", icon: "User", color: "bg-blue-100", iconColor: "#3b82f6" },
    { id: 2, title: "Job Search", icon: "Search", color: "bg-indigo-100", iconColor: "#6366f1" },
    { id: 3, title: "Earnings", icon: "Wallet", color: "bg-green-100", iconColor: "#10b981" },
    { id: 4, title: "Settings", icon: "Settings", color: "bg-purple-100", iconColor: "#8b5cf6" },
  ];

  const skills = [
    { id: 1, name: "Construction", level: 95 },
    { id: 2, name: "Labandera", level: 85 },
    { id: 3, name: "Tutoring", level: 80 },
    { id: 4, name: "Farming", level: 90 },
    { id: 5, name: "Driving", level: 88 },
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
                <Briefcase color="white" size={20} />
              </View>
              <View>
                <Text className="text-white font-bold">{user.jobTitle}</Text>
                <Text className="text-white/80 text-sm">
                  {user.experience} experience
                </Text>
              </View>
            </View>
            <View className="flex-row items-center bg-white/30 px-3 py-1 rounded-full">
              <Star color="#fbbf24" size={16} fill="#fbbf24" />
              <Text className="text-white font-bold ml-1">
                {user.rating} Rating
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 -mt-6" showsVerticalScrollIndicator={false}>
        {/* Worker Stats */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Performance Overview
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-3xl font-bold text-indigo-600">
                {user.completedJobs}
              </Text>
              <Text className="text-gray-500 mt-1">Jobs Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-green-600">
                {user.totalEarnings}
              </Text>
              <Text className="text-gray-500 mt-1">Total Earnings</Text>
            </View>
            <View className="items-center">
              <TrendingUp color="#10b981" size={32} />
              <Text className="text-2xl font-bold text-green-500 mt-1">
                {user.successRate}
              </Text>
              <Text className="text-gray-500 mt-1">Success Rate</Text>
            </View>
          </View>
        </View>

        {/* Availability & Response Time */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-lg font-bold text-gray-800">Availability</Text>
              <Text className="text-gray-500">{user.availability}</Text>
            </View>
            <View className="bg-green-100 px-4 py-2 rounded-full">
              <Text className="text-green-700 font-medium">{user.availability}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Clock color="#8b5cf6" size={24} className="mr-2" />
            <Text className="text-gray-700">
              Average Response Time:{" "}
              <Text className="font-bold">{user.responseTime}</Text>
            </Text>
          </View>
        </View>

        {/* Skills */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Professional Skills
          </Text>
          {skills.map((skill) => (
            <View key={skill.id} className="mb-4">
              <View className="flex-row justify-between mb-1">
                <Text className="font-medium">{skill.name}</Text>
                <Text className="text-gray-500">{skill.level}%</Text>
              </View>
              <View className="h-2 bg-gray-200 rounded-full">
                <View
                  className="h-2 bg-indigo-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Job Applications */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Recent Applications
            </Text>
            <TouchableOpacity>
              <Text className="text-indigo-600">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-4">
            {jobApplications.map((job) => (
              <View
                key={job.id}
                className="flex-row items-center justify-between pb-3 border-b border-gray-100"
              >
                <View className="flex-1">
                  <Text className="font-bold">{job.title}</Text>
                  <Text className="text-gray-500 text-sm">{job.client}</Text>
                  <Text className="text-gray-400 text-xs">{job.date}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-green-600 font-bold">{job.amount}</Text>
                  <View className="flex-row mt-1">
                    {job.rating > 0 ? (
                      renderRatingStars(job.rating)
                    ) : (
                      <Text className="text-gray-400 text-xs">Pending</Text>
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
                  {action.icon === "User" && (
                    <User color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Search" && (
                    <Search color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Wallet" && (
                    <Wallet color={action.iconColor} size={24} />
                  )}
                  {action.icon === "Settings" && (
                    <Settings color={action.iconColor} size={24} />
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
    </View>
  );
}