import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { 
  Search, 
  MapPin, 
  Clock,  
  Star, 
  Filter, 
  Briefcase, 
  User, 
  Settings, 
  Bell,
  Calendar,
  CheckCircle,
  Users,
  TrendingUp
} from 'lucide-react-native';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    // Set navigation bar color to match the gradient
    SystemNavigationBar.setNavigationColor('#8b5cf6');
    SystemNavigationBar.leanBack();
  }, []);


  // Mock data for jobs
  const jobs = [
    {
      id: '1',
      title: 'Labandera',
      client: 'Maria Santos',
      location: 'Makati City, PH',
      budget: '₱500/day',
      time: '2 hours ago',
      rating: 4.8,
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
    },
    {
      id: '2',
      title: 'Construction Worker',
      client: 'Juan Dela Cruz',
      location: 'Quezon City, PH',
      budget: '₱1,000/day',
      time: '5 hours ago',
      rating: 4.6,
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
    },
    {
      id: '3',
      title: 'Math Tutor',
      client: 'Angela Reyes',
      location: 'Taguig City, PH',
      budget: '₱500/hr',
      time: '1 day ago',
      rating: 4.9,
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
    },
    {
      id: '4',
      title: 'Rice Field Farmer',
      client: 'Pedro Santos',
      location: 'Bulacan, PH',
      budget: '₱800/day',
      time: '1 day ago',
      rating: 4.7,
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
    },
    {
      id: '5',
      title: 'Family Driver',
      client: 'Rosa Garcia',
      location: 'Pasig City, PH',
      budget: '₱18,000/month',
      time: '3 hours ago',
      rating: 4.8,
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
    }
  ];

  const renderJobItem = ({ item }: { item: typeof jobs[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row flex-1 pr-4">
          <Image 
            source={{ uri: item.avatar }} 
            className="w-12 h-12 rounded-full mr-3" 
          />
          <View className="flex-1">
            <Text className="font-bold text-base text-gray-800 mb-1">{item.title}</Text>
            <Text className="text-gray-600 text-sm mb-1">{item.client}</Text>
            <View className="flex-row items-center">
              <MapPin size={14} color="#6366f1" className="mr-1" />
              <Text className="text-gray-500 text-sm flex-1">{item.location}</Text>
            </View>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-bold text-green-600 text-base">{item.budget}</Text>
          <View className="flex-row items-center mt-1">
            <Clock size={14} color="#9ca3af" className="mr-1" />
            <Text className="text-gray-500 text-sm">{item.time}</Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <Star size={16} color="#fbbf24" fill="#fbbf24" className="mr-1" />
          <Text className="text-gray-700 font-medium">{item.rating}</Text>
        </View>
        <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-full">
          <Text className="text-white font-medium">Apply</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );



  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Find Jobs</Text>
            <Text className="text-white/80">Find and apply to local services jobs</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
              <Bell size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
              <Settings size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white/20 rounded-2xl px-4 py-2.5 mb-4">
          <Search size={20} color="white" className="opacity-70" />
          <TextInput
            className="flex-1 text-white text-base ml-3"
            placeholder="Search jobs..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mr-2">
            <Text className="text-white text-xl font-bold">24</Text>
            <Text className="text-white/80 text-sm">Available Jobs</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mx-2">
            <Text className="text-white text-xl font-bold">15</Text>
            <Text className="text-white/80 text-sm">Applied Jobs</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 ml-2">
            <Text className="text-white text-xl font-bold">8</Text>
            <Text className="text-white/80 text-sm">Completed</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6">
        {/* Filter Bar */}
        <View className="bg-white rounded-xl flex-row justify-between items-center mb-4 p-4 shadow-sm -mt-4">
          <View>
            <Text className="text-gray-800 font-bold text-xl mb-1">
              Available Jobs
            </Text>
            <Text className="text-gray-500 text-sm">
              {jobs.length} jobs found
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center bg-indigo-50 rounded-full px-4 py-2">
            <Filter size={16} color="#6366f1" className="mr-1" />
            <Text className="text-indigo-600 font-medium">Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Job Listings */}
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="flex-1"
        />
      </View>
    </View>
  );
};

