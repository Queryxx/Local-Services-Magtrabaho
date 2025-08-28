import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Camera, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  User, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function NBIClearanceScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentType, setDocumentType] = useState('NBI Clearance');
  const [documentImages, setDocumentImages] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock images for document upload examples
  const mockDocumentImages = [
    "https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1629216509258-4dbd7880e605?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1660142107232-e26dd2036dd8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
  ];

  const handleDocumentUpload = () => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      // Add a mock image to represent the uploaded document
      setDocumentImages([...documentImages, mockDocumentImages[documentImages.length % mockDocumentImages.length]]);
      setIsUploading(false);
      Alert.alert('Success', 'Document uploaded successfully!');
    }, 1500);
  };

  const handleSubmit = () => {
    if (documentImages.length === 0) {
      Alert.alert('Error', 'Please upload at least one document image');
      return;
    }
    
    if (!fullName || !birthDate || !address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    setIsSubmitted(true);
    
    // Simulate submission process
    setTimeout(() => {
      Alert.alert(
        'Submission Complete', 
        'Your NBI clearance has been submitted for verification. You will receive a notification once it is processed.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setDocumentImages([]);
              setFullName('');
              setBirthDate('');
              setAddress('');
              setContactNumber('');
              setEmail('');
              setCurrentStep(1);
              setIsSubmitted(false);
            }
          }
        ]
      );
    }, 2000);
  };

  const renderProgressBar = () => (
    <View className="flex-row justify-between items-center mb-8">
      {[1, 2, 3].map((step) => (
        <View key={step} className="flex-row items-center">
          <View 
            className={`w-10 h-10 rounded-full items-center justify-center ${
              currentStep >= step ? 'bg-indigo-500' : 'bg-gray-200'
            }`}
          >
            {step < currentStep || isSubmitted ? (
              <CheckCircle color="white" size={20} />
            ) : (
              <Text className={currentStep >= step ? 'text-white font-bold' : 'text-gray-500 font-bold'}>
                {step}
              </Text>
            )}
          </View>
          {step < 3 && (
            <View 
              className={`h-1 w-16 ${currentStep > step ? 'bg-indigo-500' : 'bg-gray-200'}`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepIndicator = () => (
    <View className="flex-row justify-between mb-6">
      <TouchableOpacity 
        className={`px-4 py-2 rounded-full ${currentStep === 1 ? 'bg-indigo-500' : 'bg-gray-200'}`}
        onPress={() => setCurrentStep(1)}
      >
        <Text className={currentStep === 1 ? 'text-white font-medium' : 'text-gray-700'}>Document</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className={`px-4 py-2 rounded-full ${currentStep === 2 ? 'bg-indigo-500' : 'bg-gray-200'}`}
        onPress={() => setCurrentStep(2)}
      >
        <Text className={currentStep === 2 ? 'text-white font-medium' : 'text-gray-700'}>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className={`px-4 py-2 rounded-full ${currentStep === 3 ? 'bg-indigo-500' : 'bg-gray-200'}`}
        onPress={() => setCurrentStep(3)}
      >
        <Text className={currentStep === 3 ? 'text-white font-medium' : 'text-gray-700'}>Review</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient 
        colors={['#6366f1', '#8b5cf6']} 
        className="px-6 pt-12 pb-6 rounded-b-3xl"
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-4"
          >
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold">NBI Clearance</Text>
            <Text className="text-white/80">Upload your clearance document</Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <Shield color="white" size={24} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-2xl shadow-sm -mt-4 p-6 mb-6">
          {/* Progress Steps */}
          <View className="flex-row justify-between items-center mb-6">
            {[1, 2, 3].map((step, index) => (
              <View key={step} className="flex-1 flex-row items-center">
                {/* Step Circle */}
                <View className="flex-1 items-center">
                  <View 
                    className={`w-12 h-12 rounded-full items-center justify-center ${
                      currentStep >= step ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle color="white" size={20} />
                    ) : (
                      <Text className={`text-lg font-bold ${currentStep >= step ? 'text-white' : 'text-gray-500'}`}>
                        {step}
                      </Text>
                    )}
                  </View>
                  {/* Step Label */}
                  <Text className={`text-xs mt-2 font-medium ${
                    currentStep >= step ? 'text-indigo-500' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Document' : step === 2 ? 'Details' : 'Review'}
                  </Text>
                </View>
                {/* Connector Line */}
                {index < 2 && (
                  <View 
                    className={`h-1 flex-1 mx-2 rounded ${
                      currentStep > step ? 'bg-indigo-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {renderStepIndicator()}

        {currentStep === 1 && (
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">Upload Document</Text>
            <Text className="text-gray-600 mb-6">
              Please upload a clear image of your NBI clearance document. Make sure all details are visible.
            </Text>

            <View className="mb-6">
              <Text className="font-medium text-gray-700 mb-2">Document Type</Text>
              <View className="bg-gray-100 rounded-xl p-4">
                <Text className="text-gray-800 font-medium">{documentType}</Text>
              </View>
            </View>

            <View className="mb-6">
              <Text className="font-medium text-gray-700 mb-2">Document Images</Text>
              {documentImages.length > 0 ? (
                <View className="flex-row flex-wrap">
                  {documentImages.map((image, index) => (
                    <View key={index} className="w-1/2 p-1">
                      <Image 
                        source={{ uri: image }} 
                        className="h-40 w-full rounded-lg"
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View className="bg-gray-100 rounded-xl p-8 items-center justify-center mb-4">
                  <FileText size={48} color="#9ca3af" />
                  <Text className="text-gray-500 mt-2 text-center">
                    No documents uploaded yet
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              className="flex-row items-center justify-center bg-indigo-500 rounded-xl p-4 mb-4"
              onPress={handleDocumentUpload}
              disabled={isUploading}
            >
              <Camera color="white" size={20} className="mr-2" />
              <Text className="text-white font-bold">
                {isUploading ? 'Uploading...' : 'Take Photo'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row items-center justify-center bg-white border border-indigo-500 rounded-xl p-4"
              onPress={handleDocumentUpload}
              disabled={isUploading}
            >
              <Upload color="#6366f1" size={20} className="mr-2" />
              <Text className="text-indigo-500 font-bold">Upload from Gallery</Text>
            </TouchableOpacity>

            <View className="mt-6 p-4 bg-blue-50 rounded-xl">
              <Text className="font-bold text-blue-800 mb-2">Document Requirements</Text>
              <Text className="text-blue-700 text-sm">
                • Document must be valid and not expired
              </Text>
              <Text className="text-blue-700 text-sm">
                • All text must be clearly readable
              </Text>
              <Text className="text-blue-700 text-sm">
                • Full document must be visible in frame
              </Text>
            </View>
          </View>
        )}

        {currentStep === 2 && (
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">Personal Details</Text>
            <Text className="text-gray-600 mb-6">
              Please confirm your personal information matches the NBI clearance document.
            </Text>

            <View className="mb-4">
              <Text className="font-medium text-gray-700 mb-2">Full Name</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <User size={20} color="#9ca3af" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-700 mb-2">Date of Birth</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Calendar size={20} color="#9ca3af" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="MM/DD/YYYY"
                  value={birthDate}
                  onChangeText={setBirthDate}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-700 mb-2">Address</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <MapPin size={20} color="#9ca3af" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter your full address"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-700 mb-2">Contact Number</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Phone size={20} color="#9ca3af" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter your phone number"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="font-medium text-gray-700 mb-2">Email Address</Text>
              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
                <Mail size={20} color="#9ca3af" className="mr-2" />
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">Review & Submit</Text>
            <Text className="text-gray-600 mb-6">
              Please review all information before submitting your NBI clearance.
            </Text>

            <View className="mb-6">
              <Text className="font-bold text-gray-800 mb-3">Document Preview</Text>
              {documentImages.length > 0 ? (
                <View className="flex-row flex-wrap">
                  {documentImages.map((image, index) => (
                    <View key={index} className="w-full p-1 mb-3">
                      <Image 
                        source={{ uri: image }} 
                        className="h-60 w-full rounded-lg"
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View className="bg-gray-100 rounded-xl p-8 items-center justify-center">
                  <AlertCircle size={48} color="#f59e0b" />
                  <Text className="text-gray-500 mt-2 text-center">
                    No document uploaded
                  </Text>
                </View>
              )}
            </View>

            <View className="mb-6">
              <Text className="font-bold text-gray-800 mb-3">Personal Information</Text>
              <View className="bg-gray-50 rounded-xl p-4">
                <View className="flex-row mb-2">
                  <Text className="font-medium w-32 text-gray-700">Full Name:</Text>
                  <Text className="text-gray-800">{fullName || 'Not provided'}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="font-medium w-32 text-gray-700">Date of Birth:</Text>
                  <Text className="text-gray-800">{birthDate || 'Not provided'}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="font-medium w-32 text-gray-700">Address:</Text>
                  <Text className="text-gray-800">{address || 'Not provided'}</Text>
                </View>
                <View className="flex-row mb-2">
                  <Text className="font-medium w-32 text-gray-700">Contact:</Text>
                  <Text className="text-gray-800">{contactNumber || 'Not provided'}</Text>
                </View>
                <View className="flex-row">
                  <Text className="font-medium w-32 text-gray-700">Email:</Text>
                  <Text className="text-gray-800">{email || 'Not provided'}</Text>
                </View>
              </View>
            </View>

            <View className="p-4 bg-amber-50 rounded-xl mb-6">
              <Text className="font-bold text-amber-800 mb-2">Important Notice</Text>
              <Text className="text-amber-700 text-sm">
                By submitting this form, you confirm that all information provided is accurate and 
                matches the details on your NBI clearance document. False information may result in 
                account suspension.
              </Text>
            </View>
          </View>
        )}

        <View className="flex-row justify-between mb-8">
          {currentStep > 1 && (
            <TouchableOpacity 
              className="flex-row items-center bg-gray-200 rounded-xl px-6 py-4"
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text className="text-gray-700 font-bold">Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < 3 ? (
            <TouchableOpacity 
              className="flex-row items-center bg-indigo-500 rounded-xl px-6 py-4 ml-auto"
              onPress={() => setCurrentStep(currentStep + 1)}
            >
              <Text className="text-white font-bold">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              className={`flex-row items-center rounded-xl px-6 py-4 ml-auto ${
                isSubmitted ? 'bg-green-500' : 'bg-indigo-500'
              }`}
              onPress={handleSubmit}
              disabled={isSubmitted}
            >
              <Text className="text-white font-bold">
                {isSubmitted ? 'Submitting...' : 'Submit Document'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}