/* import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator, Animated, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  Briefcase, 
  UserCheck,
  ArrowRight,
  CircleDollarSign,
  ArrowLeft,
  Search,
  CheckCircle2,
  Navigation
} from 'lucide-react-native';

const JobTypesScreen = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [showAIMatch, setShowAIMatch] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [currentMatchStep, setCurrentMatchStep] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [showMap, setShowMap] = useState(false);
  
  const matchingSteps = [
    "Analyzing job requirements...",
    "Scanning worker profiles...",
    "Matching skills and experience...",
    "Calculating compatibility scores...",
    "Finalizing best matches..."
  ];

  useEffect(() => {
    if (isMatching) {
      const interval = setInterval(() => {
        setCurrentMatchStep((prev) => {
          if (prev >= matchingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setIsMatching(false);
              setShowAIMatch(true);
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      return () => {
        clearInterval(interval);
        scaleAnim.stopAnimation();
      };
    }
  }, [isMatching]);

  // Mock data for job types
  const jobTypes = [
    {
      id: '1',
      title: 'Labandera',
      description: 'Maglalaba, magpapaplantsa, at maglilipat ng mga damit',
      image: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      openPositions: 12,
      avgSalary: '₱500 - ₱800/araw',
      applicants: 24,
      category: 'Gawaing-bahay',
      location: {
        address: 'Quezon City, Metro Manila',
        lat: 14.6760,
        lng: 121.0437
      }
    },
    {
      id: '2',
      title: 'Driver',
      description: 'Serbisyong transportasyon para sa mga tao o kargamento',
      image: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      openPositions: 8,
      avgSalary: '₱800 - ₱1,200/araw',
      applicants: 18,
      category: 'Transportasyon',
      location: {
        address: 'Makati City, Metro Manila',
        lat: 14.5547,
        lng: 121.0244
      }
    },
    {
      id: '3',
      title: 'Tutor',
      description: 'Tulong sa pag-aaral para sa mga estudyante',
      image: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      openPositions: 15,
      avgSalary: '₱300 - ₱1,000/oras',
      applicants: 32,
      category: 'Edukasyon',
      location: {
        address: 'Manila City, Metro Manila',
        lat: 14.5995,
        lng: 120.9842
      }
    },
    {
      id: '4',
      title: 'Magsasaka',
      description: 'Trabaho sa bukid, pagtatanim at pag-aani',
      image: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      openPositions: 6,
      avgSalary: '₱400 - ₱600/araw',
      applicants: 14,
      category: 'Agrikultura',
      location: {
        address: 'Laguna Province',
        lat: 14.1667,
        lng: 121.3333
      }
    },
    {
      id: '5',
      title: 'Construction Worker',
      description: 'Trabaho sa konstruksyon at gusali',
      image: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      openPositions: 20,
      avgSalary: '₱600 - ₱1,000/araw',
      applicants: 42,
      category: 'Konstruksyon',
      location: {
        address: 'Taguig City, Metro Manila',
        lat: 14.5176,
        lng: 121.0509
      }
    }
  ];

  // Mock data for applicants
  const applicants = [
    {
      id: '1',
      name: 'Rosalinda Santos',
      rating: 4.8,
      experience: '3 years',
      skills: ['Washing', 'Plantsa', 'Laba'],
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      appliedDate: '2 days ago',
      location: 'Quezon City'
    },
    {
      id: '2',
      name: 'Eduardo Manalo',
      rating: 4.6,
      experience: '5 years',
      skills: ['City Driving', 'Car Maintenance', 'GPS'],
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      appliedDate: '1 day ago',
      location: 'Makati City'
    },
    {
      id: '3',
      name: 'Maricel Cruz',
      rating: 4.9,
      experience: '2 years',
      skills: ['Math', 'Science', 'English'],
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      appliedDate: '3 days ago',
      location: 'Manila City'
    },
    {
      id: '4',
      name: 'Rodrigo Ramos',
      rating: 4.7,
      experience: '8 years',
      skills: ['Pagtatanim', 'Pag-ani', 'Patubig'],
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      appliedDate: 'Just now',
      location: 'Laguna'
    },
    {
      id: '5',
      name: 'Roberto Domingo',
      rating: 4.5,
      experience: '4 years',
      skills: ['Carpentry', 'Masonry', 'Safety'],
      avatar: 'https://i.ytimg.com/vi/hGNLYgmMq1c/hqdefault.jpg',
      appliedDate: '5 days ago',
      location: 'Taguig City'
    }
  ];

  const [selectedJob, setSelectedJob] = useState<typeof jobTypes[0] | null>(null);

  const openMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderJobTypeCard = ({ item }: { item: typeof jobTypes[0] }) => (
    <TouchableOpacity 
      className="bg-white rounded-2xl overflow-hidden mb-5 shadow-sm border border-gray-100"
      onPress={() => setSelectedJob(item)}
    >
      <View className="relative">
        <Image 
          source={{ uri: item.image }} 
          className="h-40 w-full" 
        />
        <View className="absolute top-3 right-3 bg-indigo-500 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">{item.openPositions} Open</Text>
        </View>
      </View>
      
      <View className="p-4">
        <Text className="font-bold text-lg text-gray-800 mb-2">{item.title}</Text>
        <Text className="text-gray-600 text-sm mb-3">{item.description}</Text>
        
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <Briefcase size={16} color="#6366f1" className="mr-1" />
            <Text className="text-gray-700">{item.category}</Text>
          </View>
          <Text className="text-indigo-600 font-bold">{item.avgSalary}</Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <UserCheck size={16} color="#6366f1" className="mr-1" />
            <Text className="text-gray-700">{item.applicants} Applicants</Text>
          </View>
          <ArrowRight size={18} color="#6366f1" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderApplicantCard = ({ item }: { item: typeof applicants[0] }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-row">
          <Image 
            source={{ uri: item.avatar }} 
            className="w-12 h-12 rounded-full mr-3" 
          />
          <View>
            <Text className="font-bold text-gray-800">{item.name}</Text>
            <View className="flex-row items-center mt-1">
              <Star size={14} color="#fbbf24" fill="#fbbf24" className="mr-1" />
              <Text className="text-gray-700">{item.rating}</Text>
              <Text className="text-gray-500 mx-2">•</Text>
              <Text className="text-gray-500 text-sm">{item.experience}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <MapPin size={12} color="#9ca3af" className="mr-1" />
              <Text className="text-gray-500 text-sm">{item.location}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-medium">View</Text>
        </TouchableOpacity>
      </View>
      
      <View className="mt-3">
        <Text className="text-gray-700 font-medium mb-1">Skills:</Text>
        <View className="flex-row flex-wrap">
          {item.skills.map((skill, index) => (
            <View key={index} className="bg-indigo-100 px-2 py-1 rounded-full mr-2 mb-2">
              <Text className="text-indigo-700 text-xs">{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  if (selectedJob) {
    return (
      <View className="flex-1 bg-gray-50">
        <LinearGradient 
          colors={['#6366f1', '#8b5cf6']} 
          className="px-6 pt-12 pb-6 rounded-b-3xl"
        >
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity 
              onPress={() => {
                setSelectedJob(null);
                setShowAIMatch(false);
                setIsMatching(false);
                setShowMap(false);
              }}
              className="flex-row items-center bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              <ArrowLeft size={20} color="#6366f1" />
              <Text className="text-indigo-500 ml-1 font-medium">Back</Text>
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Applicants</Text>
            <View className="w-24" />
          </View>
          <Text className="text-white text-2xl font-bold">{selectedJob.title}</Text>
          <Text className="text-white/80">{selectedJob.applicants} people applied for this job</Text>
        </LinearGradient>

        <View className="flex-1 px-6 -mt-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-800 font-bold text-lg">Job Details</Text>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 font-medium">Active</Text>
              </View>
            </View>
            
            <View className="flex-row mb-2">
              <Briefcase size={18} color="#6366f1" className="mr-2 mt-0.5" />
              <Text className="text-gray-700 flex-1">Category: {selectedJob.category}</Text>
            </View>
            
            <View className="flex-row mb-2">
              <MapPin size={18} color="#6366f1" className="mr-2 mt-0.5" />
              <Text className="text-gray-700 flex-1">Location: {selectedJob.location.address}</Text>
            </View>
            
            <View className="flex-row mb-2">
              <Clock size={18} color="#6366f1" className="mr-2 mt-0.5" />
              <Text className="text-gray-700 flex-1">Schedule: Flexible</Text>
            </View>
            
            <View className="flex-row">
              <CircleDollarSign size={18} color="#6366f1" className="mr-2 mt-0.5" />
              <Text className="text-gray-700 flex-1">Salary: {selectedJob.avgSalary}</Text>
            </View>

            <TouchableOpacity 
              className="mt-4 bg-indigo-100 p-3 rounded-xl flex-row items-center justify-center"
              onPress={() => setShowMap(!showMap)}
            >
              <Navigation size={18} color="#6366f1" className="mr-2" />
              <Text className="text-indigo-600 font-medium">
                {showMap ? 'Hide Map' : 'Show Location on Map'}
              </Text>
            </TouchableOpacity>

            {showMap && (
              <View className="mt-4">
                <Text className="text-gray-700 font-medium mb-2">Job Location:</Text>
                <Image 
                  source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Philippines&zoom=6&size=400x200&maptype=roadmap&markers=color:red%7C' + selectedJob.location.lat + ',' + selectedJob.location.lng + '&key=YOUR_API_KEY' }} 
                  className="w-full h-40 rounded-lg"
                  defaultSource={require('./assets/ph-map-placeholder.jpg')} // Add a placeholder image
                />
                <Text className="text-gray-500 text-sm mt-2 text-center">{selectedJob.location.address}</Text>
                
                <TouchableOpacity 
                  className="mt-3 bg-indigo-500 p-3 rounded-xl flex-row items-center justify-center"
                  onPress={() => openMaps(selectedJob.location.lat, selectedJob.location.lng)}
                >
                  <Navigation size={18} color="white" className="mr-2" />
                  <Text className="text-white font-medium">Open in Maps</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {!showAIMatch && (
            <TouchableOpacity 
              className="bg-indigo-500 w-full py-3 rounded-xl mb-4 flex-row justify-center items-center"
              onPress={() => {
                setCurrentMatchStep(0);
                setIsMatching(true);
              }}
            >
              <View className="flex-row items-center">
                <Users size={20} color="white" className="mr-2" />
                <Text className="text-white font-bold text-base">AI Job Match</Text>
              </View>
            </TouchableOpacity>
          )}

          {isMatching ? (
            <View className="flex-1 items-center justify-center px-6">
              <Animated.View 
                style={{
                  transform: [{ scale: scaleAnim }],
                  marginBottom: 24,
                }}
              >
                {currentMatchStep < matchingSteps.length - 1 ? (
                  <Search size={48} color="#6366f1" />
                ) : (
                  <CheckCircle2 size={48} color="#6366f1" />
                )}
              </Animated.View>
              
              <Text className="text-xl font-bold text-gray-800 text-center mb-3">
                AI Matching in Progress
              </Text>
              
              <Text className="text-gray-600 text-center mb-6">
                {matchingSteps[currentMatchStep]}
              </Text>
              
              <View className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <View 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ 
                    width: `${((currentMatchStep + 1) / matchingSteps.length) * 100}%`
                  }} 
                />
              </View>
              
              <ActivityIndicator size="large" color="#6366f1" />
            </View>
          ) : showAIMatch ? (
            <>
              <View className="bg-indigo-50 p-4 rounded-xl mb-4">
                <Text className="text-indigo-800 font-bold text-lg mb-2">AI-Matched Workers</Text>
                <Text className="text-indigo-600 mb-4">Workers are matched based on skills, experience, and job requirements</Text>
                
                <View className="flex-row flex-wrap">
                  <View className="bg-white p-2 rounded-lg mb-2 mr-2">
                    <Text className="text-indigo-600 font-medium">Skills Match</Text>
                  </View>
                  <View className="bg-white p-2 rounded-lg mb-2 mr-2">
                    <Text className="text-indigo-600 font-medium">Experience Level</Text>
                  </View>
                  <View className="bg-white p-2 rounded-lg mb-2">
                    <Text className="text-indigo-600 font-medium">Location</Text>
                  </View>
                </View>
              </View>

              <Text className="text-gray-800 font-bold text-lg mb-4">All Matched Applicants</Text>

              <FlatList
                data={applicants.map(applicant => ({
                  ...applicant,
                  matchScore: Math.floor(Math.random() * 20 + 80), // Random score between 80-100
                }))}
                renderItem={({ item }) => (
                  <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-row flex-1">
                        <Image 
                          source={{ uri: item.avatar }} 
                          className="w-12 h-12 rounded-full mr-3" 
                        />
                        <View className="flex-1">
                          <Text className="font-bold text-gray-800">{item.name}</Text>
                          <View className="flex-row items-center mt-1">
                            <Star size={14} color="#fbbf24" fill="#fbbf24" className="mr-1" />
                            <Text className="text-gray-700">{item.rating}</Text>
                            <Text className="text-gray-500 mx-2">•</Text>
                            <Text className="text-gray-500 text-sm">{item.experience}</Text>
                          </View>
                          <View className="flex-row items-center mt-2">
                            <View className="bg-green-100 px-2 py-1 rounded-full">
                              <Text className="text-green-700 text-xs font-medium">{item.matchScore}% Match</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity className="bg-indigo-500 px-4 py-2 rounded-full">
                        <Text className="text-white text-sm font-medium">Contact</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View className="mt-3">
                      <Text className="text-gray-700 font-medium mb-1">Matched Skills:</Text>
                      <View className="flex-row flex-wrap">
                        {item.skills.map((skill, index) => (
                          <View key={index} className="bg-indigo-100 px-2 py-1 rounded-full mr-2 mb-2">
                            <Text className="text-indigo-700 text-xs">{skill}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </>
          ) : (
            <>
              <Text className="text-gray-800 font-bold text-lg mb-4">
                Applicants ({selectedJob.applicants})
              </Text>
          
              <FlatList
                data={applicants}
                renderItem={renderApplicantCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            </>
          )}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Job Types</Text>
            <Text className="text-white/80">Find the perfect job for you</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mr-2">
            <Text className="text-white text-xl font-bold">5</Text>
            <Text className="text-white/80 text-sm">Job Types</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mx-2">
            <Text className="text-white text-xl font-bold">64</Text>
            <Text className="text-white/80 text-sm">Total Applicants</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3 items-center flex-1 ml-2">
            <Text className="text-white text-xl font-bold">56</Text>
            <Text className="text-white/80 text-sm">Open Positions</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="flex-1 px-6 -mt-4">
        {/* Filter Tabs */
       /*  <View className="flex-row bg-white rounded-xl p-2 mb-6 shadow-sm">
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === 'all' ? 'bg-indigo-500' : ''}`}
            onPress={() => setActiveTab('all')}
          >
            <Text className={`font-medium ${activeTab === 'all' ? 'text-white' : 'text-gray-700'}`}>All Jobs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === 'active' ? 'bg-indigo-500' : ''}`}
            onPress={() => setActiveTab('active')}
          >
            <Text className={`font-medium ${activeTab === 'active' ? 'text-white' : 'text-gray-700'}`}>Active</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center py-2 rounded-lg ${activeTab === 'completed' ? 'bg-indigo-500' : ''}`}
            onPress={() => setActiveTab('completed')}
          >
            <Text className={`font-medium ${activeTab === 'completed' ? 'text-white' : 'text-gray-700'}`}>Completed</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-800 font-bold text-lg mb-4">
          Available Jobs ({jobTypes.length})
        </Text>
        
        <FlatList
          data={jobTypes}
          renderItem={renderJobTypeCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default JobTypesScreen; */