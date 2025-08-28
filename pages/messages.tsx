import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  MoreVertical,
  Check,
  CheckCircle,
  Clock,
  User
} from 'lucide-react-native';

const MessagesScreen = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      user: 'Maria Santos',
      type: 'Labandera',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      lastMessage: 'Maraming salamat po sa pag-confirm ng appointment!',
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: '2',
      user: 'Juan Dela Cruz',
      type: 'Construction Worker',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      lastMessage: 'Boss, tapos na po yung pagre-repair ng bahay',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: '3',
      user: 'Angela Reyes',
      type: 'Tutor',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      lastMessage: 'Mamaya po ng 2pm ang tutorial ng Math',
      time: 'Yesterday',
      unread: 0,
      online: true
    },
    {
      id: '4',
      user: 'Pedro Santos',
      type: 'Farmer',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      lastMessage: 'Pwede po ba bukas nalang ang pag-ani?',
      time: 'Wed',
      unread: 1,
      online: false
    },
    {
      id: '5',
      user: 'Ramon Garcia',
      type: 'Driver',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      lastMessage: 'Nasa airport na po ako, hinihintay ko na kayo',
      time: 'Tue',
      unread: 0,
      online: false
    }
  ]);

  const contacts = [
    {
      id: '1',
      name: 'Maria Santos',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      role: 'Labandera',
      online: true
    },
    {
      id: '2',
      name: 'Juan Dela Cruz',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      role: 'Construction Worker',
      online: false
    },
    {
      id: '3',
      name: 'Angela Reyes',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      role: 'Tutor',
      online: true
    },
    {
      id: '4',
      name: 'Pedro Santos',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      role: 'Farmer',
      online: false
    },
    {
      id: '5',
      name: 'Ramon Garcia',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      role: 'Driver',
      online: false
    }
  ];

  const conversations = [
    {
      id: '1',
      user: 'Maria Santos',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      messages: [
        { id: '1', text: 'Magandang umaga po! Kailangan ko po ng tulong sa paglalaba.', time: '10:15 AM', sender: 'user' },
        { id: '2', text: 'Magandang umaga din po! Pwede po akong tumulong. Ano po ang mga damit na lalabhan?', time: '10:16 AM', sender: 'me' },
        { id: '3', text: 'May mga bed sheets at mga damit po ng mga bata.', time: '10:17 AM', sender: 'user' },
        { id: '4', text: 'Pwede po akong pumunta mamaya ng hapon. Ok lang po ba ang 2pm?', time: '10:20 AM', sender: 'me' },
        { id: '5', text: 'Opo, ok na ok po yun. Salamat po!', time: '10:22 AM', sender: 'user' },
        { id: '6', text: 'Sige po, kita kits po mamaya!', time: '10:23 AM', sender: 'me' },
        { id: '7', text: 'Maraming salamat po sa pag-confirm ng appointment!', time: '10:30 AM', sender: 'user' }
      ]
    },
    {
      id: '2',
      user: 'Juan Dela Cruz',
      avatar: 'https://i.sstatic.net/l60Hf.png',
      messages: [
        { id: '1', text: 'Boss, available po ako para sa construction work.', time: '9:45 AM', sender: 'user' },
        { id: '2', text: 'May experience na po ako sa pagtatrabaho sa construction.', time: '9:46 AM', sender: 'user' },
        { id: '3', text: 'Magkano po ang rate niyo kada araw?', time: '9:47 AM', sender: 'me' },
        { id: '4', text: '800 pesos po kada araw, 8 oras po ang trabaho.', time: '9:48 AM', sender: 'user' },
        { id: '5', text: 'Sige po, pwede po ba kayo magsimula bukas?', time: '9:50 AM', sender: 'me' },
        { id: '6', text: 'Opo, pwede po. Anong oras po ako pupunta?', time: '9:51 AM', sender: 'user' },
        { id: '7', text: '7am po, kitakits!', time: '9:52 AM', sender: 'me' }
      ]
    }
  ];

  const [currentConversation, setCurrentConversation] = useState(conversations[0]);

  const renderChatItem = ({ item }: { item: typeof messages[0] }) => (
    <TouchableOpacity 
      className="flex-row items-center py-4 px-4 bg-white border-b border-gray-100"
      onPress={() => setCurrentConversation(conversations.find(c => c.user === item.user) || conversations[0])}
    >
      <View className="relative">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-14 h-14 rounded-full" 
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>
      
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-gray-800 text-lg">{item.user}</Text>
          <Text className="text-gray-500 text-sm">{item.time}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text 
            className="text-gray-600"
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="bg-indigo-500 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-xs font-bold">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContactItem = ({ item }: { item: typeof contacts[0] }) => (
    <TouchableOpacity className="flex-row items-center py-3 px-4 bg-white border-b border-gray-100">
      <View className="relative">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-12 h-12 rounded-full" 
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>
      
      <View className="flex-1 ml-3">
        <Text className="font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-500 text-sm">{item.role}</Text>
      </View>
      
      <TouchableOpacity className="bg-indigo-500 px-3 py-1 rounded-full">
        <Text className="text-white text-sm">Message</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: typeof currentConversation.messages[0] }) => (
    <View className={`flex-row mb-4 ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <View 
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          item.sender === 'me' 
            ? 'bg-indigo-500 rounded-tr-none' 
            : 'bg-gray-100 rounded-tl-none'
        }`}
      >
        <Text 
          className={`${
            item.sender === 'me' ? 'text-white' : 'text-gray-800'
          }`}
        >
          {item.text}
        </Text>
        <View className={`flex-row items-center mt-1 ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
          <Text 
            className={`text-xs ${
              item.sender === 'me' ? 'text-indigo-100' : 'text-gray-500'
            }`}
          >
            {item.time}
          </Text>
          {item.sender === 'me' && (
            <CheckCircle color="#ffffff" size={14} className="ml-1" />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* If viewing a conversation */}
      {currentConversation ? (
        <View className="flex-1">
          {/* Conversation Header */}
          <LinearGradient 
            colors={['#6366f1', '#8b5cf6']} 
            className="px-6 pt-12 pb-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity>
                  <Text className="text-white text-lg font-bold">Back</Text>
                </TouchableOpacity>
                <View className="ml-4">
                  <Image 
                    source={{ uri: currentConversation.avatar }} 
                    className="w-10 h-10 rounded-full" 
                  />
                </View>
                <View className="ml-3">
                  <Text className="text-white font-bold text-lg">{currentConversation.user}</Text>
                  <Text className="text-white/80 text-sm">Online</Text>
                </View>
              </View>
              <View className="flex-row">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-2">
                  <Phone size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                  <Video size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Messages */}
          <View className="flex-1 px-4 py-4">
            <FlatList
              data={currentConversation.messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              className="flex-1"
            />
          </View>

          {/* Message Input */}
          <View className="flex-row items-center p-4 bg-white border-t border-gray-200">
            <TouchableOpacity className="mr-3">
              <Paperclip size={24} color="#6366f1" />
            </TouchableOpacity>
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-3"
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity className="ml-3 bg-indigo-500 rounded-full w-12 h-12 items-center justify-center">
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          {/* Header */}
          <LinearGradient 
            colors={['#6366f1', '#8b5cf6']} 
            className="px-6 pt-12 pb-6 rounded-b-3xl"
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-bold">Messages</Text>
              <View className="flex-row">
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
                  <Search size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                  <MoreVertical size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <View className="flex-row bg-white/20 rounded-xl px-4 py-3 mb-4">
              <Search size={20} color="white" className="mr-2" />
              <TextInput
                className="flex-1 text-white placeholder:text-white/70"
                placeholder="Search messages..."
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Stats */}
            <View className="flex-row justify-between">
              <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mr-2">
                <Text className="text-white text-xl font-bold">24</Text>
                <Text className="text-white/80 text-sm">Active Chats</Text>
              </View>
              <View className="bg-white/20 rounded-xl p-3 items-center flex-1 mx-2">
                <Text className="text-white text-xl font-bold">142</Text>
                <Text className="text-white/80 text-sm">Contacts</Text>
              </View>
              <View className="bg-white/20 rounded-xl p-3 items-center flex-1 ml-2">
                <Text className="text-white text-xl font-bold">98%</Text>
                <Text className="text-white/80 text-sm">Response Rate</Text>
              </View>
            </View>
          </LinearGradient>

          <View className="flex-1 px-6 -mt-4">
            {/* Tab Selector */}
            <View className="flex-row bg-white rounded-xl p-1 mb-6 shadow-sm">
              <TouchableOpacity 
                className={`flex-1 py-3 rounded-lg items-center ${
                  activeTab === 'chats' ? 'bg-indigo-500' : ''
                }`}
                onPress={() => setActiveTab('chats')}
              >
                <View className="flex-row items-center">
                  <MessageCircle 
                    size={18} 
                    color={activeTab === 'chats' ? 'white' : '#6366f1'} 
                    className="mr-2" 
                  />
                  <Text 
                    className={`font-bold ${activeTab === 'chats' ? 'text-white' : 'text-indigo-600'}`}
                  >
                    Chats
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={`flex-1 py-3 rounded-lg items-center ${
                  activeTab === 'contacts' ? 'bg-indigo-500' : ''
                }`}
                onPress={() => setActiveTab('contacts')}
              >
                <View className="flex-row items-center">
                  <User 
                    size={18} 
                    color={activeTab === 'contacts' ? 'white' : '#6366f1'} 
                    className="mr-2" 
                  />
                  <Text 
                    className={`font-bold ${activeTab === 'contacts' ? 'text-white' : 'text-indigo-600'}`}
                  >
                    Contacts
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Chat/Contact Listings */}
            <ScrollView 
              className="flex-1" 
              showsVerticalScrollIndicator={false}
            >
              {activeTab === 'chats' ? (
                <FlatList
                  data={messages}
                  renderItem={renderChatItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <FlatList
                  data={contacts}
                  renderItem={renderContactItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default MessagesScreen;