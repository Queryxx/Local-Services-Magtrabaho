import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Send, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Settings, 
  History,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Zap
} from 'lucide-react-native';

const ChatbotScreen = () => {
  type Message = {
    id: string;
    text: string;
    sender: string;
    time: string;
    suggestions?: string[];
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Magandang araw! I\'m your AI job assistant. I can help you find local work opportunities in your area. What type of job are you looking for?',
      sender: 'bot',
      time: '10:00 AM',
      suggestions: [
        'Find jobs',
        'Show laundry jobs',
        'Show driver jobs',
        'Show tutor jobs'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickActions = [
    { icon: Briefcase, text: 'Find Jobs', color: '#6366f1' },
    { icon: Lightbulb, text: 'Career Advice', color: '#8b5cf6' },
    { icon: TrendingUp, text: 'Skill Match', color: '#ec4899' },
    { icon: Zap, text: 'Quick Apply', color: '#f59e0b' }
  ];

  const suggestions = [
    "Find jobs",
    "Show laundry jobs",
    "Show construction jobs",
    "Show driver jobs",
    "Show farm work",
    "Show tutor jobs"
  ];

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Find similar jobs',
          'Improve application',
          'Connect with recruiter'
        ]
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('find job') || lowerCaseMessage === 'find jobs') {
      return `Here are some available local jobs in your area:

1. 🧺 Labandera (Laundry Worker)
   • Rate: ₱350-500/day
   • Multiple locations available
   
2. 📚 Home Tutor
   • Rate: ₱250-400/hour
   • Subjects: Math, Science, English
   
3. 🏗️ Construction Worker
   • Rate: ₱500-800/day
   • Various projects available
   
4. 🌾 Farm Worker
   • Rate: ₱400-600/day
   • Seasonal opportunities
   
5. 🚗 Drivers (Tricycle/Jeepney/Private)
   • Rate: ₱400-1000/day
   • Flexible schedules

Would you like more details about any of these positions?`;
    } else if (lowerCaseMessage.includes('profile')) {
      return "Your profile looks great! Adding a professional photo could increase your chances by 24%. Would you like tips on improving your profile?";
    } else if (lowerCaseMessage.includes('skill')) {
      return "Based on your skills, you could increase your earning potential by learning React Native. I can recommend some courses!";
    } else {
      return "I understand. How else can I assist you with your job search today?";
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would start/stop voice recording
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-4"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Bot size={28} color="white" className="mr-3" />
            <View>
              <Text className="text-white font-bold text-xl">AI Assistant</Text>
              <Text className="text-white/80 text-sm">Always here to help</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <Settings size={20} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="flex-1">
        {/* Quick Actions */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <Text className="text-gray-500 text-sm font-medium mb-2">Quick Actions</Text>
          <View className="flex-row justify-between">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity 
                  key={index}
                  className="items-center"
                >
                  <View 
                    className="w-14 h-14 rounded-full items-center justify-center mb-1"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <IconComponent size={24} color={action.color} />
                  </View>
                  <Text className="text-gray-700 text-xs text-center">{action.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View 
              key={message.id} 
              className={`flex-row mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <View className="w-8 h-8 rounded-full bg-indigo-100 items-center justify-center mr-2">
                  <Bot size={18} color="#6366f1" />
                </View>
              )}
              
              <View 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-indigo-500 rounded-tr-none' 
                    : 'bg-white rounded-tl-none shadow-sm border border-gray-100'
                }`}
              >
                <Text 
                  className={`${
                    message.sender === 'user' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {message.text}
                </Text>
                
                {message.suggestions && (
                  <View className="mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <TouchableOpacity 
                        key={index}
                        className="bg-indigo-50 rounded-full px-3 py-1 mb-1 self-start"
                        onPress={() => handleSuggestionPress(suggestion)}
                      >
                        <Text className="text-indigo-600 text-sm">{suggestion}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                <View className={`flex-row items-center mt-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Text 
                    className={`text-xs ${
                      message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </Text>
                </View>
              </View>
              
              {message.sender === 'user' && (
                <View className="w-8 h-8 rounded-full bg-indigo-500 items-center justify-center ml-2">
                  <User size={18} color="white" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Suggestions */}
        <View className="px-4 py-2">
          <Text className="text-gray-500 text-sm font-medium mb-2 ml-2">Try asking:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row px-2"
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 mr-2"
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text className="text-gray-700 text-sm">{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="px-4 pb-4"
        >
          <View className="flex-row items-center bg-white rounded-full border border-gray-200 px-4 py-2 shadow-sm">
            <TouchableOpacity 
              className={`mr-2 ${isRecording ? 'bg-red-100' : 'bg-gray-100'} rounded-full p-2`}
              onPress={toggleRecording}
            >
              {isRecording ? (
                <MicOff size={20} color="#ef4444" />
              ) : (
                <Mic size={20} color="#6b7280" />
              )}
            </TouchableOpacity>
            
            <TextInput
              className="flex-1 py-2 text-gray-800"
              placeholder="Ask me anything about jobs..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            
            <TouchableOpacity 
              className={`ml-2 ${inputText.trim() ? 'bg-indigo-500' : 'bg-gray-300'} rounded-full p-2`}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Send size={20} color={inputText.trim() ? 'white' : '#9ca3af'} />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-center mt-2">
            <TouchableOpacity className="flex-row items-center bg-indigo-50 rounded-full px-4 py-2">
              <History size={16} color="#6366f1" className="mr-1" />
              <Text className="text-indigo-600 text-sm font-medium">View Chat History</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatbotScreen;