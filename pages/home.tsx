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
  const [jobsTab, setJobsTab] = useState<'jobs' | 'clients'>('jobs');
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
      title: 'Mechanical Repair',
      client: 'Mark Daluson',
      location: 'Batangas City, PH',
      budget: '₱1,500',
      time: '2 hours ago',
      rating: 4.8,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '2',
      title: 'Driver',
      client: 'Juan Dela Cruz',
      location: 'Antipolo City, PH',
      budget: '₱2,500',
      time: '5 hours ago',
      rating: 4.6,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '3',
      title: 'Mechanical Repair',
      client: 'Marvin Alingasa',
      location: 'Baguio City, PH',
      budget: '₱2,500',
      time: '1 day ago',
      rating: 4.9,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '4',
      title: 'Plumbers',
      client: 'Juan Miguel Barbosa',
      location: 'Cebu City, PH',
      budget: '₱7,500',
      time: '1 day ago',
      rating: 4.7,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
  ];

  // Mock data for clients
  const clients = [
    {
      id: '1',
      name: 'Abigail Ola',
      profession: 'Gardener',
      location: 'Laguna, PH',
      rating: 4.8,
      jobs: 12,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '2',
      name: 'Juan Dela Cruz',
      profession: 'Construction Worker',
      location: 'Antipolo City, PH',
      rating: 4.6,
      jobs: 24,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '3',
      name: 'Rossellah Domaoal',
      profession: 'Tutor',
      location: 'Makati City, PH',
      rating: 4.9,
      jobs: 8,
      avatar: 'https://i.sstatic.net/l60Hf.png',
    },
    {
      id: '4',
      name: 'Cathrina Lapuz',
      profession: 'Tutor',
      location: 'Pangasinan, PH',
      rating: 4.7,
      jobs: 15,
      avatar: 'https://i.sstatic.net/l60Hf.png',
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
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
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
        <View className="flex-row items-center bg-white/20 rounded-2xl px-4 py-2.5 mb-4">
          <Search size={20} color="white" className="opacity-70" />
          <TextInput
            className="flex-1 text-white text-base ml-3"
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
        <View className="flex-row bg-white rounded-xl p-1.5 mb-6 shadow-sm">
          <TouchableOpacity 
            className={`flex-1 py-2.5 rounded-lg ${
              jobsTab === 'jobs' ? 'bg-indigo-500' : 'bg-transparent'
            }`}
            onPress={() => setJobsTab('jobs')}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <Briefcase 
                size={20} 
                color={jobsTab === 'jobs' ? 'white' : '#6366f1'} 
              />
              <Text 
                className={`font-medium ${jobsTab === 'jobs' ? 'text-white' : 'text-indigo-600'}`}
              >
                Jobs
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-2.5 rounded-lg ${
              jobsTab === 'clients' ? 'bg-indigo-500' : 'bg-transparent'
            }`}
            onPress={() => setJobsTab('clients')}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <Users 
                size={20} 
                color={jobsTab === 'clients' ? 'white' : '#6366f1'} 
              />
              <Text 
                className={`font-medium ${jobsTab === 'clients' ? 'text-white' : 'text-indigo-600'}`}
              >
                Clients
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Bar */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 font-bold text-lg">
            {jobsTab === 'jobs' ? 'Available Jobs' : 'Top Clients'}
          </Text>
          <TouchableOpacity className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Filter size={16} color="#6366f1" className="mr-1" />
            <Text className="text-indigo-600 font-medium">Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Job/Client Listings */}
        <ScrollView 
          className="flex-1 mb-20" 
          showsVerticalScrollIndicator={false}
        >
          {jobsTab === 'jobs' ? (
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

