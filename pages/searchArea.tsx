import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  MapPin, 
  Filter, 
  X, 
  Clock, 
  Users, 
  Briefcase,
  User,
  Building,
  Calendar,
  Star,
  SlidersHorizontal
} from 'lucide-react-native';

export default function SearchArea() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    category: 'all',
    rating: 0,
    availability: 'any'
  });

  // Mock data for search results
  const searchResults = [
    {
      id: '1',
      name: 'Abigail Ola',
      type: 'client',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Las Piñas, PH',
      distance: '0.8 miles',
      rating: 4.8,
      jobsCompleted: 12,
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Juan Dela Cruz',
      type: 'business',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Makati City, PH',
      distance: '1.2 miles',
      rating: 4.6,
      jobsCompleted: 24,
      lastActive: '5 hours ago'
    },
    {
      id: '3',
      name: 'Marvin Alingasa',
      type: 'client',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Marikina City, PH',
      distance: '3.5 miles',
      rating: 4.9,
      jobsCompleted: 8,
      lastActive: '1 day ago'
    },
    {
      id: '4',
      name: 'Cathrina Lapuz',
      type: 'client',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Pasig City, PH',
      distance: '5.2 miles',
      rating: 4.7,
      jobsCompleted: 15,
      lastActive: '1 day ago'
    },
    {
      id: '5',
      name: 'Rossellah Bodano',
      type: 'business',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Quezon City, PH',
      distance: '0.5 miles',
      rating: 4.9,
      jobsCompleted: 87,
      lastActive: '3 hours ago'
    },
    {
      id: '6',
      name: 'Juan Miguel Barbosa',
      type: 'business',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      location: 'Caloocan City, PH',
      distance: '1.1 miles',
      rating: 4.5,
      jobsCompleted: 42,
      lastActive: '6 hours ago'
    }
  ];

  const filteredResults = searchResults.filter(item => {
    const matchesQuery = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    
    return matchesQuery && matchesFilter;
  });

  const renderSearchItem = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-16 h-16 rounded-full mr-4" 
        />
        <View className="flex-1">
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg text-gray-800">{item.name}</Text>
            {item.type === 'business' ? (
              <Building size={18} color="#6366f1" />
            ) : (
              <User size={18} color="#6366f1" />
            )}
          </View>
          
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#6366f1" className="mr-1" />
            <Text className="text-gray-600 text-sm">{item.location}</Text>
            <Text className="text-gray-500 text-sm ml-2">• {item.distance}</Text>
          </View>
          
          <View className="flex-row items-center mt-2">
            <Star size={16} color="#fbbf24" fill="#fbbf24" className="mr-1" />
            <Text className="text-gray-700 font-medium mr-2">{item.rating}</Text>
            <Text className="text-gray-500 text-sm">({item.jobsCompleted} jobs)</Text>
          </View>
          
          <View className="flex-row items-center mt-2">
            <Clock size={14} color="#9ca3af" className="mr-1" />
            <Text className="text-gray-500 text-sm">Active {item.lastActive}</Text>
          </View>
          
          <View className="flex-row justify-between items-center mt-3">
            <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-full">
              <Text className="text-white font-medium text-sm">View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-indigo-500 px-4 py-2 rounded-full">
              <Text className="text-indigo-500 font-medium text-sm">Message</Text>
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
          <Text className="text-white text-2xl font-bold">Search Area</Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row bg-white/20 rounded-xl px-4 py-3 mb-4">
          <Search size={20} color="white" className="mr-2" />
          <TextInput
            className="flex-1 text-white placeholder:text-white/70"
            placeholder="Search by name or location..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Options */}
        {showFilters && (
          <View className="bg-white/20 rounded-xl p-4 mb-4">
            <Text className="text-white font-bold mb-3">Filter Options</Text>
            
            <View className="flex-row flex-wrap mb-3">
              <TouchableOpacity 
                className={`px-3 py-2 rounded-full mr-2 mb-2 ${selectedFilters.category === 'all' ? 'bg-white' : 'bg-white/30'}`}
                onPress={() => setSelectedFilters({...selectedFilters, category: 'all'})}
              >
                <Text className={selectedFilters.category === 'all' ? 'text-indigo-600' : 'text-white'}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-3 py-2 rounded-full mr-2 mb-2 ${selectedFilters.category === 'client' ? 'bg-white' : 'bg-white/30'}`}
                onPress={() => setSelectedFilters({...selectedFilters, category: 'client'})}
              >
                <Text className={selectedFilters.category === 'client' ? 'text-indigo-600' : 'text-white'}>Clients</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-3 py-2 rounded-full mr-2 mb-2 ${selectedFilters.category === 'business' ? 'bg-white' : 'bg-white/30'}`}
                onPress={() => setSelectedFilters({...selectedFilters, category: 'business'})}
              >
                <Text className={selectedFilters.category === 'business' ? 'text-indigo-600' : 'text-white'}>Businesses</Text>
              </TouchableOpacity>
            </View>
            
            <View className="flex-row justify-between">
              <TouchableOpacity className="bg-white/30 px-4 py-2 rounded-full">
                <Text className="text-white">Rating: {selectedFilters.rating > 0 ? `${selectedFilters.rating}+` : 'Any'}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/30 px-4 py-2 rounded-full">
                <Text className="text-white">Distance</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white/30 px-4 py-2 rounded-full">
                <Text className="text-white">Availability</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Quick Filters */}
        <View className="flex-row justify-between">
          <View className="flex-row bg-white/20 rounded-xl px-2 py-2">
            <TouchableOpacity 
              className={`px-3 py-1 rounded-full mr-1 ${activeFilter === 'all' ? 'bg-white' : ''}`}
              onPress={() => setActiveFilter('all')}
            >
              <Text className={activeFilter === 'all' ? 'text-indigo-600 font-bold' : 'text-white'}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-3 py-1 rounded-full mr-1 ${activeFilter === 'client' ? 'bg-white' : ''}`}
              onPress={() => setActiveFilter('client')}
            >
              <Text className={activeFilter === 'client' ? 'text-indigo-600 font-bold' : 'text-white'}>Clients</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-3 py-1 rounded-full ${activeFilter === 'business' ? 'bg-white' : ''}`}
              onPress={() => setActiveFilter('business')}
            >
              <Text className={activeFilter === 'business' ? 'text-indigo-600 font-bold' : 'text-white'}>Businesses</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity className="flex-row items-center bg-white/20 rounded-full px-4 py-2">
            <Filter size={16} color="white" className="mr-1" />
            <Text className="text-white font-medium">Filters</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 -mt-4">
        {/* Results Header */}
        <View className="flex-row justify-between items-center my-4">
          <Text className="text-gray-800 font-bold text-lg">
            {filteredResults.length} Results Found
          </Text>
          <Text className="text-gray-500">Sorted by Relevance</Text>
        </View>

        {/* Search Results */}
        <FlatList
          data={filteredResults}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

