import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
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

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'clients'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for jobs
  const jobs = [
    {
      id: '1',
      title: 'Plumbing Repair',
      client: 'Sarah Johnson',
      location: 'Downtown, NY',
      budget: '$120',
      time: '2 hours ago',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '2',
      title: 'Electrical Installation',
      client: 'Tech Solutions Inc',
      location: 'Midtown, NY',
      budget: '$350',
      time: '5 hours ago',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '3',
      title: 'HVAC Maintenance',
      client: 'Robert Chen',
      location: 'Brooklyn, NY',
      budget: '$220',
      time: '1 day ago',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '4',
      title: 'Drywall Repair',
      client: 'Maria Garcia',
      location: 'Queens, NY',
      budget: '$180',
      time: '1 day ago',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
  ];

  // Mock data for clients
  const clients = [
    {
      id: '1',
      name: 'Sarah Johnson',
      profession: 'Homeowner',
      location: 'Downtown, NY',
      rating: 4.8,
      jobs: 12,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      profession: 'Business',
      location: 'Midtown, NY',
      rating: 4.6,
      jobs: 24,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '3',
      name: 'Robert Chen',
      profession: 'Property Manager',
      location: 'Brooklyn, NY',
      rating: 4.9,
      jobs: 8,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '4',
      name: 'Maria Garcia',
      profession: 'Homeowner',
      location: 'Queens, NY',
      rating: 4.7,
      jobs: 15,
      avatar: 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
    },
  ];

  const renderJobItem = ({ item }: { item: typeof jobs[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-row">
          <Image 
            source={{ uri: item.avatar }} 
            className="w-14 h-14 rounded-full mr-3" 
          />
          <View>
            <Text className="font-bold text-lg text-gray-800">{item.title}</Text>
            <Text className="text-gray-600">{item.client}</Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={14} color="#6366f1" className="mr-1" />
              <Text className="text-gray-500 text-sm">{item.location}</Text>
            </View>
          </View>
        </View>
        <View className="items-end">
          <Text className="font-bold text-green-600">{item.budget}</Text>
          <View className="flex-row items-center mt-1">
            <Clock size={14} color="#9ca3af" className="mr-1" />
            <Text className="text-gray-500 text-sm">{item.time}</Text>
          </View>
        </View>
      </View>
      
      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
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

  const renderClientItem = ({ item }: { item: typeof clients[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-16 h-16 rounded-full mr-4" 
        />
        <View className="flex-1">
          <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
          <Text className="text-gray-600 mb-1">{item.profession}</Text>
          <View className="flex-row items-center mb-2">
            <MapPin size={14} color="#6366f1" className="mr-1" />
            <Text className="text-gray-500 text-sm">{item.location}</Text>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Star size={16} color="#fbbf24" fill="#fbbf24" className="mr-1" />
              <Text className="text-gray-700 font-medium">{item.rating}</Text>
              <Text className="text-gray-500 ml-1">({item.jobs} jobs)</Text>
            </View>
            <TouchableOpacity className="bg-indigo-500 px-4 py-1 rounded-full">
              <Text className="text-white text-sm font-medium">Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Find Opportunities</Text>
            <Text className="text-white/80">Connect with clients or professionals</Text>
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
        <View className="flex-row bg-white/20 rounded-xl px-4 py-3 mb-4">
          <Search size={20} color="white" className="mr-2" />
          <TextInput
            className="flex-1 text-white placeholder:text-white/70"
            placeholder="Search jobs or clients..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mr-2">
            <Text className="text-white text-xl font-bold">24</Text>
            <Text className="text-white/80 text-sm">Active Jobs</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mx-2">
            <Text className="text-white text-xl font-bold">142</Text>
            <Text className="text-white/80 text-sm">Clients</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 ml-2">
            <Text className="text-white text-xl font-bold">98%</Text>
            <Text className="text-white/80 text-sm">Success Rate</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 -mt-4">
        {/* Tab Selector */}
        <View className="flex-row bg-white rounded-xl p-1 mb-6 shadow-sm">
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'jobs' ? 'bg-indigo-500' : ''
            }`}
            onPress={() => setActiveTab('jobs')}
          >
            <View className="flex-row items-center">
              <Briefcase 
                size={18} 
                color={activeTab === 'jobs' ? 'white' : '#6366f1'} 
                className="mr-2" 
              />
              <Text 
                className={`font-bold ${activeTab === 'jobs' ? 'text-white' : 'text-indigo-600'}`}
              >
                Jobs
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-lg items-center ${
              activeTab === 'clients' ? 'bg-indigo-500' : ''
            }`}
            onPress={() => setActiveTab('clients')}
          >
            <View className="flex-row items-center">
              <Users 
                size={18} 
                color={activeTab === 'clients' ? 'white' : '#6366f1'} 
                className="mr-2" 
              />
              <Text 
                className={`font-bold ${activeTab === 'clients' ? 'text-white' : 'text-indigo-600'}`}
              >
                Clients
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Bar */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 font-bold text-lg">
            {activeTab === 'jobs' ? 'Available Jobs' : 'Top Clients'}
          </Text>
          <TouchableOpacity className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Filter size={16} color="#6366f1" className="mr-1" />
            <Text className="text-indigo-600 font-medium">Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Job/Client Listings */}
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'jobs' ? (
            <FlatList
              data={jobs}
              renderItem={renderJobItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <FlatList
              data={clients}
              renderItem={renderClientItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;