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
  TrendingUp,
  Wrench,
  Hammer,
  Plug,
  Home,
  Palette,
  Car
} from 'lucide-react-native';

const JobFinderScreen = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'plumbing' | 'electrical' | 'hvac' | 'carpentry'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for jobs
  const jobs = [
    {
      id: '1',
      title: 'Emergency Plumbing Repair',
      client: 'Sarah Johnson',
      location: 'Downtown, NY',
      budget: '$120 - $180',
      time: '2 hours ago',
      rating: 4.8,
      category: 'plumbing',
      urgent: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      image: 'https://images.unsplash.com/photo-1600249324369-cf81f82f441b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1vZGVybiUyMHVyYmFuJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
      description: 'Leaking pipe under kitchen sink needs immediate attention. Customer reports water damage to cabinets.'
    },
    {
      id: '2',
      title: 'Electrical Installation',
      client: 'Tech Solutions Inc',
      location: 'Midtown, NY',
      budget: '$350 - $500',
      time: '5 hours ago',
      rating: 4.6,
      category: 'electrical',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      image: 'https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D',
      description: 'Install new electrical outlets and lighting fixtures in new office space. Commercial building.'
    },
    {
      id: '3',
      title: 'HVAC Maintenance',
      client: 'Robert Chen',
      location: 'Brooklyn, NY',
      budget: '$220',
      time: '1 day ago',
      rating: 4.9,
      category: 'hvac',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      image: 'https://images.unsplash.com/photo-1629216509258-4dbd7880e605?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D',
      description: 'Seasonal maintenance for residential HVAC system. Replace filters and check refrigerant levels.'
    },
    {
      id: '4',
      title: 'Carpentry & Trim Work',
      client: 'Maria Garcia',
      location: 'Queens, NY',
      budget: '$180 - $250',
      time: '1 day ago',
      rating: 4.7,
      category: 'carpentry',
      urgent: true,
      avatar: 'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      image: 'https://images.unsplash.com/photo-1727189899461-b888a5890287?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww',
      description: 'Install crown molding in living room and hallway. Custom cuts required for angles.'
    },
    {
      id: '5',
      title: 'Handyman Services',
      client: 'David Wilson',
      location: 'Manhattan, NY',
      budget: '$100',
      time: '2 days ago',
      rating: 4.5,
      category: 'carpentry',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
      image: 'https://images.unsplash.com/photo-1608447718455-ed5006c46051?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww',
      description: 'Multiple small tasks: fix loose door handle, hang picture frame, adjust cabinet hinges.'
    },
    {
      id: '6',
      title: 'Appliance Installation',
      client: 'Jennifer Lee',
      location: 'Bronx, NY',
      budget: '$150',
      time: '3 days ago',
      rating: 4.9,
      category: 'plumbing',
      urgent: false,
      avatar: 'https://images.unsplash.com/photo-1578445714074-946b536079aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFByb2Zlc3Npb25hbCUyMGF2YXRhciUyMHdpdGglMjBnbGFzc2VzfGVufDB8fDB8fHww',
      image: 'https://images.unsplash.com/photo-1635099404457-91c3d0dade3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8MyUyMGdyYXBoaWNzfGVufDB8fDB8fHww',
      description: 'Install new dishwasher and connect to existing water lines. Remove old unit.'
    }
  ];

  // Filter jobs based on active tab and search query
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeTab === 'all' || job.category === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderJobItem = ({ item }: { item: typeof jobs[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl overflow-hidden mb-5 shadow-sm border border-gray-100">
      <View className="relative">
        <Image 
          source={{ uri: item.image }} 
          className="h-40 w-full" 
        />
        {item.urgent && (
          <View className="absolute top-3 left-3 bg-red-500 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">URGENT</Text>
          </View>
        )}
        <View className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full">
          <Text className="text-gray-800 font-bold">${item.budget.split(' - ')[0].replace('$', '')}</Text>
        </View>
      </View>
      
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="font-bold text-lg text-gray-800">{item.title}</Text>
            <View className="flex-row items-center mt-1">
              <User size={14} color="#6366f1" className="mr-1" />
              <Text className="text-gray-600">{item.client}</Text>
            </View>
          </View>
          <Image 
            source={{ uri: item.avatar }} 
            className="w-10 h-10 rounded-full" 
          />
        </View>
        
        <View className="flex-row items-center mb-3">
          <MapPin size={14} color="#6366f1" className="mr-1" />
          <Text className="text-gray-500 text-sm">{item.location}</Text>
        </View>
        
        <Text className="text-gray-600 text-sm mb-3">{item.description}</Text>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Star size={16} color="#fbbf24" fill="#fbbf24" className="mr-1" />
            <Text className="text-gray-700 font-medium">{item.rating}</Text>
            <Text className="text-gray-500 mx-2">•</Text>
            <Clock size={14} color="#9ca3af" className="mr-1" />
            <Text className="text-gray-500 text-sm">{item.time}</Text>
          </View>
          <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-full">
            <Text className="text-white font-medium">Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'plumbing': return <Wrench size={18} color="#6366f1" />;
      case 'electrical': return <Plug size={18} color="#6366f1" />;
      case 'hvac': return <Home size={18} color="#6366f1" />;
      case 'carpentry': return <Hammer size={18} color="#6366f1" />;
      default: return <Briefcase size={18} color="#6366f1" />;
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Find Jobs</Text>
            <Text className="text-white/80">Discover local service opportunities</Text>
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
            placeholder="Search jobs, locations, skills..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mr-2">
            <Text className="text-white text-xl font-bold">{jobs.length}</Text>
            <Text className="text-white/80 text-sm">Available Jobs</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mx-2">
            <Text className="text-white text-xl font-bold">24</Text>
            <Text className="text-white/80 text-sm">Applied</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 ml-2">
            <Text className="text-white text-xl font-bold">98%</Text>
            <Text className="text-white/80 text-sm">Success Rate</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 -mt-4">
        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="max-h-20 py-3 mb-4"
        >
          <View className="flex-row">
            <TouchableOpacity 
              className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeTab === 'all' ? 'bg-indigo-500' : 'bg-white border border-gray-200'}`}
              onPress={() => setActiveTab('all')}
            >
              <Briefcase size={18} color={activeTab === 'all' ? 'white' : '#6366f1'} className="mr-2" />
              <Text className={`font-medium ${activeTab === 'all' ? 'text-white' : 'text-gray-700'}`}>All Jobs</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeTab === 'plumbing' ? 'bg-indigo-500' : 'bg-white border border-gray-200'}`}
              onPress={() => setActiveTab('plumbing')}
            >
              <Wrench size={18} color={activeTab === 'plumbing' ? 'white' : '#6366f1'} className="mr-2" />
              <Text className={`font-medium ${activeTab === 'plumbing' ? 'text-white' : 'text-gray-700'}`}>Plumbing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeTab === 'electrical' ? 'bg-indigo-500' : 'bg-white border border-gray-200'}`}
              onPress={() => setActiveTab('electrical')}
            >
              <Plug size={18} color={activeTab === 'electrical' ? 'white' : '#6366f1'} className="mr-2" />
              <Text className={`font-medium ${activeTab === 'electrical' ? 'text-white' : 'text-gray-700'}`}>Electrical</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeTab === 'hvac' ? 'bg-indigo-500' : 'bg-white border border-gray-200'}`}
              onPress={() => setActiveTab('hvac')}
            >
              <Home size={18} color={activeTab === 'hvac' ? 'white' : '#6366f1'} className="mr-2" />
              <Text className={`font-medium ${activeTab === 'hvac' ? 'text-white' : 'text-gray-700'}`}>HVAC</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className={`flex-row items-center px-4 py-2 rounded-full mr-2 ${activeTab === 'carpentry' ? 'bg-indigo-500' : 'bg-white border border-gray-200'}`}
              onPress={() => setActiveTab('carpentry')}
            >
              <Hammer size={18} color={activeTab === 'carpentry' ? 'white' : '#6366f1'} className="mr-2" />
              <Text className={`font-medium ${activeTab === 'carpentry' ? 'text-white' : 'text-gray-700'}`}>Carpentry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Filter Bar */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-800 font-bold text-lg">
            {filteredJobs.length} Jobs Found
          </Text>
          <TouchableOpacity className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Filter size={16} color="#6366f1" className="mr-1" />
            <Text className="text-indigo-600 font-medium">Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Job Listings */}
        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default JobFinderScreen;