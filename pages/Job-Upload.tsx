import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Calendar,
  User,
  FileText,
  Camera,
  Check,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import NavBottom from "../components/ui/nav-bottom";

export default function PostJob() {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobType, setJobType] = useState("One-time");
  const [experience, setExperience] = useState("No Experience");
  const [isPosted, setIsPosted] = useState(false);

  const jobTypes = ["One-time", "Regular", "Weekly", "Monthly"];
  const experienceLevels = ["No Experience", "Some Experience", "Experienced", "Highly Skilled"];

  const handlePostJob = () => {
    if (!jobTitle || !jobDescription || !location || !budget) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    
    // In a real app, this would be an API call
    setIsPosted(true);
    setTimeout(() => {
      setIsPosted(false);
      // Reset form
      setJobTitle("");
      setJobDescription("");
      setLocation("");
      setBudget("");
      setDeadline("");
    }, 3000);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={["#6366f1", "#8b5cf6"]}
        className="px-6 pt-12 pb-6"
      >
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="mr-4 p-2"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <View>
            <Text className="text-white text-2xl font-bold">Post a Service Request</Text>
            <Text className="text-white/80">Find local service providers</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Success Message */}
      {isPosted && (
        <View className="bg-green-100 border border-green-300 rounded-lg mx-4 my-2 p-3">
          <View className="flex-row items-center">
            <View className="p-1">
              <Check color="#10b981" size={18} />
            </View>
            <Text className="text-green-800 font-medium ml-2">
              Job posted successfully!
            </Text>
          </View>
        </View>
      )}

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 py-6">
        {/* Job Title */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Service Needed *</Text>
          <TextInput
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="e.g. House Cleaner, Gardener, Driver, Plumber"
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          />
        </View>

        {/* Job Description */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Description *</Text>
          <TextInput
            value={jobDescription}
            onChangeText={setJobDescription}
            placeholder="Describe what needs to be done, when you need it, and any specific requirements (e.g., Deep house cleaning for a 2-bedroom apartment, need own cleaning supplies)"
            multiline
            numberOfLines={4}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-32 text-base"
            textAlignVertical="top"
          />
        </View>

        {/* Location */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Location *</Text>
          <View className="relative flex-row items-center">
            <View className="absolute left-4 z-10">
              <MapPin color="#9ca3af" size={20} />
            </View>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="City, Country"
              className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 pl-12"
            />
          </View>
        </View>

        {/* Budget */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Budget *</Text>
          <View className="relative flex-row items-center">
            <View className="absolute left-4 z-10">
              <Text className="text-gray-400 text-lg">₱</Text>
            </View>
            <TextInput
              value={budget}
              onChangeText={setBudget}
              placeholder="e.g. ₱5,000 - ₱8,000"
              className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 pl-12"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Deadline */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Deadline</Text>
          <View className="relative flex-row items-center">
            <View className="absolute left-4 z-10">
              <Calendar color="#9ca3af" size={20} />
            </View>
            <TextInput
              value={deadline}
              onChangeText={setDeadline}
              placeholder="e.g. 30 days"
              className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 pl-12"
            />
          </View>
        </View>

        {/* Job Type */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Job Type</Text>
          <View className="flex-row flex-wrap">
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setJobType(type)}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                  jobType === type
                    ? "bg-indigo-100 border border-indigo-300"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <Text
                  className={`${
                    jobType === type ? "text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Experience Level */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Experience Level</Text>
          <View className="flex-row flex-wrap">
            {experienceLevels.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setExperience(level)}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${
                  experience === level
                    ? "bg-indigo-100 border border-indigo-300"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                <Text
                  className={`${
                    experience === level ? "text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upload Documents */}
        <View className="mb-8">
          <Text className="text-gray-700 font-medium mb-2">Attachments</Text>
          <TouchableOpacity className="bg-white rounded-xl p-6 shadow-sm border-2 border-dashed border-gray-300 items-center justify-center">
            <View className="p-2 bg-indigo-50 rounded-full mb-2">
              <Upload color="#6366f1" size={24} />
            </View>
            <Text className="text-gray-700 font-medium">Upload Documents</Text>
            <Text className="text-gray-500 text-sm mt-1">
              PDF, DOC, JPG up to 10MB
            </Text>
          </TouchableOpacity>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          onPress={handlePostJob}
          className="bg-indigo-600 rounded-xl py-4 items-center justify-center mb-6"
        >
          <Text className="text-white font-bold text-lg">Post Job</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}