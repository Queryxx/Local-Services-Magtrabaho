import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, StyleSheet, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ForgotPassword from './ForgotPassword';
import Introduction from '../components/Introduction';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, Mail, Phone, Eye, EyeOff, CheckCircle, Upload, Camera as CameraIcon, Calendar, Briefcase, Users, Home } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigation = useNavigation<any>();
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [role, setRole] = useState<'worker' | 'client' | ''>('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [step, setStep] = useState(1);
  const [faceImages, setFaceImages] = useState({ front: '', left: '', right: '' });
  const [idImage, setIdImage] = useState('');

  // Camera states
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [currentCaptureType, setCurrentCaptureType] = useState<'front' | 'left' | 'right' | null>(null);
  const cameraRef = useRef<any>(null);
  const logoImage = require('../assets/logo.png');

  const animateTabTransition = (toRegister: boolean) => {
    // First fade out and slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: toRegister ? -50 : 50,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update the tab state
      setActiveTab(toRegister ? 'register' : 'login');
      if (toRegister) {
        setStep(1);
      }
      
      // Reset animation values
      slideAnim.setValue(toRegister ? 50 : -50);
      
      // Then fade in and slide back
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const { setUserType } = useAuth();
  
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Check specific email and password combinations
    console.log('Attempting login with:', loginEmail, loginPassword); // Debug log
    if (loginEmail.toLowerCase() === 'domaoalj11@gmail.com' && loginPassword === 'johnjohn') {
      if (rememberMe) {
        // In a real app, use secure storage like EncryptedStorage or Keychain
        console.log('Remember me is checked - would save credentials securely here');
      }
      setUserType('worker');  // Changed to worker type for domaoalj11@gmail.com
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } else if (loginEmail.toLowerCase() === 'janggisdump@gmail.com' && loginPassword === 'jrix123') {
      if (rememberMe) {
        // In a real app, use secure storage like EncryptedStorage or Keychain
        console.log('Remember me is checked - would save credentials securely here');
      }
      setUserType('client');  // Changed to client type for janggisdump@gmail.com
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } else {
      Alert.alert('Error', 'Invalid email or password');
      console.log('Login failed: Invalid credentials'); // Debug log
    }
  };

  const handleRegister = () => {
    if (step === 1) {
      if (!firstName || !lastName || !birthdate || !role || !registerEmail || !phone || !address || !registerPassword || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (!termsAccepted) {
        Alert.alert('Error', 'Please accept the Terms of Service and Privacy Policy to continue');
        return;
      }
      
      // Validate birthdate format
      const birthdateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!birthdateRegex.test(birthdate)) {
        Alert.alert('Error', 'Please enter a valid birthdate in MM/DD/YYYY format');
        return;
      }
      if (registerPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!faceImages.front || !faceImages.left || !faceImages.right) {
        Alert.alert('Error', 'Please capture all face images');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!idImage) {
        Alert.alert('Error', 'Please upload a valid ID');
        return;
      }
      Alert.alert('Success', 'Registration complete! Your account is pending verification.');
      // Reset form
      setFirstName('');
      setLastName('');
      setBirthdate('');
      setRole('');
      setRegisterEmail('');
      setPhone('');
      setRegisterPassword('');
      setConfirmPassword('');
      setFaceImages({ front: '', left: '', right: '' });
      setIdImage('');
      setStep(1);
      setActiveTab('login');
    }
  };

  const captureFaceImage = async (type: 'front' | 'left' | 'right') => {
    setCurrentCaptureType(type);
    setFacing('front');
  };

  const takePicture = async () => {
    if (cameraRef.current && currentCaptureType) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        
        setFaceImages(prev => ({
          ...prev,
          [currentCaptureType]: photo.uri
        }));
        
        setCurrentCaptureType(null);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image');
      }
    }
  };

  const uploadId = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos to upload ID');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
    }
  };

  const getCaptureInstruction = () => {
    if (currentCaptureType === 'front') {
      return "Please position your face straight";
    } else {
      return `Please position your face to the ${currentCaptureType}`;
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentCaptureType) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
        />
        <View style={styles.cameraOverlay}>
          <Text style={styles.captureInstruction}>
            {getCaptureInstruction()}
          </Text>
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={!isCameraReady}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCurrentCaptureType(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (showIntro) {
    return <Introduction onComplete={() => setShowIntro(false)} />;
  }

  return (
    <LinearGradient colors={['#6366f1', '#8b5cf6']} className="flex-1">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="items-center mb-6">
          <Image 
            source={logoImage} 
            style={styles.logo}
            resizeMode="contain"
          />
          <View className="items-center space-y-2">
            <View className="flex-row items-baseline">
              <Text className="text-5xl font-black tracking-wider" style={[styles.titleText, styles.brandTextMAG]}>
                MAG
              </Text>
              <Text className="text-5xl font-medium tracking-wider" style={[styles.titleText, styles.brandTextTrabaho]}>
                trabaho
              </Text>
            </View>
            <View className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
              <View className="flex-row items-center">
                <Text style={styles.subtitleMatch}>Match</Text>
                <Text style={styles.subtitleAnd}> and </Text>
                <Text style={styles.subtitleGo}>Go</Text>
                <Text style={styles.subtitleTrabaho}> Trabaho</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row bg-white/20 rounded-xl p-1 mb-8">
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-xl items-center ${
              activeTab === 'login' ? 'bg-white' : ''
            }`}
            onPress={() => {
              if (activeTab !== 'login') {
                animateTabTransition(false);
              }
            }}
          >
            <Text className={`font-bold ${activeTab === 'login' ? 'text-indigo-600' : 'text-white'}`}>
              Login
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-3 rounded-xl items-center ${
              activeTab === 'register' ? 'bg-white' : ''
            }`}
            onPress={() => {
              if (activeTab !== 'register') {
                animateTabTransition(true);
              }
            }}
          >
            <Text className={`font-bold ${activeTab === 'register' ? 'text-indigo-600' : 'text-white'}`}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={[{
          opacity: fadeAnim,
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim }
          ]
        }]}>
        {activeTab === 'login' && (
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Welcome Back!
            </Text>
            
            <View className="mb-4">
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 mb-1 shadow-sm">
                <Mail color="#6366f1" size={20} />
                <TextInput
                  className="flex-1 py-4 px-3 text-gray-700 text-base"
                  placeholder="Email"
                  placeholderTextColor="#9ca3af"
                  value={loginEmail}
                  onChangeText={setLoginEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
            
            <View className="mb-2">
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 shadow-sm">
                <Lock color="#6366f1" size={20} />
                <TextInput
                  className="flex-1 py-4 px-3 text-gray-700 text-base"
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-2"
                >
                  {showPassword ? (
                    <EyeOff color="#6366f1" size={20} />
                  ) : (
                    <Eye color="#6366f1" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View className="px-4 mb-6">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View className={`w-5 h-5 mt-3 rounded-md border ${rememberMe ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'} items-center justify-center mr-2`}>
                  {rememberMe && <CheckCircle color="white" size={14} />}
                </View>
                <Text className="text-gray-500 mt-3 text-sm">Remember me</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className="bg-indigo-500 rounded-xl py-4 items-center mb-4"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-lg">Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-indigo-500 text-center font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'register' && (
          <View className="bg-white rounded-3xl p-6 shadow-lg">
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              {[1, 2, 3].map((stepNumber) => (
                <View key={stepNumber} style={{ flex: 1, alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <View style={[
                      styles.stepIndicatorLine,
                      {
                        backgroundColor: step > stepNumber - 1 ? '#6366f1' : '#e5e7eb',
                        width: stepNumber === 1 ? 0 : undefined
                      }
                    ]} />
                    <View style={[
                      styles.stepIndicator,
                      {
                        borderColor: step >= stepNumber ? '#6366f1' : '#d1d5db',
                        backgroundColor: step > stepNumber ? '#6366f1' : 'white'
                      }
                    ]}>
                      {step > stepNumber ? (
                        <CheckCircle color="white" size={20} />
                      ) : (
                        <Text style={[
                          styles.stepIndicatorText,
                          { color: step === stepNumber ? '#6366f1' : '#9ca3af' }
                        ]}>
                          {stepNumber}
                        </Text>
                      )}
                    </View>
                    <View style={[
                      styles.stepIndicatorLine,
                      {
                        backgroundColor: step > stepNumber ? '#6366f1' : '#e5e7eb',
                        width: stepNumber === 3 ? 0 : undefined
                      }
                    ]} />
                  </View>
                  <Text style={[
                    styles.stepLabelText,
                    {
                      color: step === stepNumber ? '#6366f1' : '#6b7280',
                      fontWeight: step === stepNumber ? 'bold' : 'normal'
                    }
                  ]}>
                    {stepNumber === 1 ? 'Account' : 
                     stepNumber === 2 ? 'Face ID' : 
                     'Verify ID'}
                  </Text>
                </View>
              ))}
            </View>
            
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {step === 1 ? 'Create Account' : step === 2 ? 'Face Recognition' : 'ID Verification'}
            </Text>
            
            {step === 1 && (
              <>
                <View className="flex-row mb-4">
                  <View className="flex-1 mr-2">
                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                      <User color="#6366f1" size={20} />
                      <TextInput
                        className="flex-1 py-4 px-3 text-gray-700"
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                  </View>
                  <View className="flex-1 ml-2">
                    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                      <User color="#6366f1" size={20} />
                      <TextInput
                        className="flex-1 py-4 px-3 text-gray-700"
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                </View>

                <View className="mb-4">
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="flex-row items-center bg-gray-100 rounded-xl px-4 py-4"
                  >
                    <Calendar color="#6366f1" size={20} />
                    <Text className="flex-1 px-3 text-gray-700">
                      {birthdate || "Select Birthdate"}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (event.type === 'set' && selectedDate) {
                          setDate(selectedDate);
                          const formattedDate = selectedDate.toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric'
                          });
                          setBirthdate(formattedDate);
                        }
                      }}
                    />
                  )}
                </View>
                
                <View className="mb-4">
                  <Text className="text-gray-700 mb-2 font-medium">Role</Text>
                  <View className="flex-row justify-between">
                    <TouchableOpacity
                      className={`flex-1 py-3 rounded-xl items-center mr-2 ${
                        role === 'worker' ? 'bg-indigo-500' : 'bg-gray-100'
                      }`}
                      onPress={() => setRole('worker')}
                    >
                      <View className="items-center">
                        <Briefcase 
                          size={24} 
                          color={role === 'worker' ? '#ffffff' : '#6366f1'}
                          className="mb-2"
                        />
                        <Text className={role === 'worker' ? 'text-white' : 'text-gray-700'}>
                          Worker
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`flex-1 py-3 rounded-xl items-center ml-2 ${
                        role === 'client' ? 'bg-indigo-500' : 'bg-gray-100'
                      }`}
                      onPress={() => setRole('client')}
                    >
                      <View className="items-center">
                        <Users 
                          size={24} 
                          color={role === 'client' ? '#ffffff' : '#6366f1'}
                          className="mb-2"
                        />
                        <Text className={role === 'client' ? 'text-white' : 'text-gray-700'}>
                          Client
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View className="mb-4">
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                    <Mail color="#6366f1" size={20} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-700"
                      placeholder="Email"
                      value={registerEmail}
                      onChangeText={setRegisterEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                
                <View className="mb-4">
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                    <Phone color="#6366f1" size={20} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-700"
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                    <Home color="#6366f1" size={20} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-700"
                      placeholder="Complete Address"
                      value={address}
                      onChangeText={setAddress}
                      multiline
                    />
                  </View>
                </View>
                
                <View className="mb-4">
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-1">
                    <Lock color="#6366f1" size={20} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-700"
                      placeholder="Password"
                      value={registerPassword}
                      onChangeText={setRegisterPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff color="#6366f1" size={20} />
                      ) : (
                        <Eye color="#6366f1" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View className="mb-6">
                  <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
                    <Lock color="#6366f1" size={20} />
                    <TextInput
                      className="flex-1 py-4 px-3 text-gray-700"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <EyeOff color="#6366f1" size={20} />
                      ) : (
                        <Eye color="#6366f1" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Terms and Conditions Agreement */}
                <View className="mb-6">
                  <View className="flex-row items-start">
                    <TouchableOpacity
                      onPress={() => setTermsAccepted(!termsAccepted)}
                      className="flex-row items-start"
                    >
                      <View className={`w-5 h-5 rounded-md border mt-1 ${termsAccepted ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'} items-center justify-center mr-2`}>
                        {termsAccepted && <CheckCircle color="white" size={14} />}
                      </View>
                    </TouchableOpacity>
                    <Text className="text-gray-600 flex-1">
                      I agree to the{' '}
                      <TouchableOpacity onPress={() => setShowTermsModal(true)}>
                        <Text className="text-indigo-500 font-medium underline">Terms of Service</Text>
                      </TouchableOpacity>
                      {' '}and{' '}
                      <TouchableOpacity onPress={() => setShowPrivacyModal(true)}>
                        <Text className="text-indigo-500 font-medium underline">Privacy Policy</Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>

                {/* Terms of Service Modal */}
                {showTermsModal && (
                  <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center">
                    <View className="bg-white rounded-2xl p-6 m-4 max-h-[80%] w-[90%]">
                      <Text className="text-2xl font-bold text-gray-800 mb-4">Terms of Service</Text>
                      <ScrollView className="mb-4">
                        <Text className="text-gray-600 mb-4">
                          Welcome to Magtrabaho! By using our service, you agree to these terms:
                        </Text>
                        
                        <Text className="font-bold text-gray-700 mb-2">1. User Agreement</Text>
                        <Text className="text-gray-600 mb-4">
                          By accessing and using Magtrabaho, you accept and agree to be bound by the terms and provisions of this agreement.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">2. Account Registration</Text>
                        <Text className="text-gray-600 mb-4">
                          Users must provide accurate, complete information and keep their account information updated. Users are responsible for maintaining the security of their account.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">3. Service Rules</Text>
                        <Text className="text-gray-600 mb-4">
                          Users agree not to engage in any activity that interferes with or disrupts the services or servers and networks connected to the services.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">4. User Conduct</Text>
                        <Text className="text-gray-600 mb-4">
                          Users must follow all applicable local, state, national, and international laws and regulations.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">5. Service Modifications</Text>
                        <Text className="text-gray-600 mb-4">
                          We reserve the right to modify or discontinue the service at any time, with or without notice.
                        </Text>
                      </ScrollView>
                      <TouchableOpacity
                        className="bg-indigo-500 rounded-xl py-3 items-center"
                        onPress={() => setShowTermsModal(false)}
                      >
                        <Text className="text-white font-bold">Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* Privacy Policy Modal */}
                {showPrivacyModal && (
                  <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center">
                    <View className="bg-white rounded-2xl p-6 m-4 max-h-[80%] w-[90%]">
                      <Text className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</Text>
                      <ScrollView className="mb-4">
                        <Text className="text-gray-600 mb-4">
                          Your privacy is important to us. This policy explains how we handle your data:
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">1. Information Collection</Text>
                        <Text className="text-gray-600 mb-4">
                          We collect information you provide directly, including personal details, identification documents, and face recognition data for security purposes.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">2. Data Usage</Text>
                        <Text className="text-gray-600 mb-4">
                          We use your information to provide and improve our services, verify your identity, and ensure platform security.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">3. Data Protection</Text>
                        <Text className="text-gray-600 mb-4">
                          We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">4. Information Sharing</Text>
                        <Text className="text-gray-600 mb-4">
                          We do not sell your personal information. We only share your information as described in this policy and with your consent.
                        </Text>

                        <Text className="font-bold text-gray-700 mb-2">5. Your Rights</Text>
                        <Text className="text-gray-600 mb-4">
                          You have the right to access, correct, or delete your personal information at any time.
                        </Text>
                      </ScrollView>
                      <TouchableOpacity
                        className="bg-indigo-500 rounded-xl py-3 items-center"
                        onPress={() => setShowPrivacyModal(false)}
                      >
                        <Text className="text-white font-bold">Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )}
            
            {step === 2 && (
              <View>
                <Text className="text-gray-600 text-center mb-6">
                  Capture images of your face from different angles for verification
                </Text>
                
                <View className="mb-6">
                  <TouchableOpacity
                    className="bg-indigo-100 rounded-2xl p-6 items-center mb-4"
                    onPress={() => captureFaceImage('front')}
                  >
                    <CameraIcon color="#6366f1" size={32} />
                    <Text className="text-indigo-600 font-bold mt-2">Front View</Text>
                    {faceImages.front ? (
                      <View className="flex-row items-center mt-2">
                        <CheckCircle color="#10b981" size={20} />
                        <Text className="text-green-500 ml-1">Captured</Text>
                        <Image source={{ uri: faceImages.front }} style={styles.previewImage} />
                      </View>
                    ) : (
                      <Text className="text-gray-500 mt-1">Tap to capture</Text>
                    )}
                  </TouchableOpacity>
                  
                  <View className="flex-row justify-between">
                    <TouchableOpacity
                      className="flex-1 bg-indigo-100 rounded-2xl p-4 items-center mr-2"
                      onPress={() => captureFaceImage('left')}
                    >
                      <CameraIcon color="#6366f1" size={24} />
                      <Text className="text-indigo-600 font-bold mt-1">Left Side</Text>
                      {faceImages.left ? (
                        <View className="flex-row items-center mt-1">
                          <CheckCircle color="#10b981" size={16} />
                          <Text className="text-green-500 text-xs ml-1">Captured</Text>
                          <Image source={{ uri: faceImages.left }} style={styles.smallPreviewImage} />
                        </View>
                      ) : (
                        <Text className="text-gray-500 text-xs mt-1">Tap to capture</Text>
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      className="flex-1 bg-indigo-100 rounded-2xl p-4 items-center ml-2"
                      onPress={() => captureFaceImage('right')}
                    >
                      <CameraIcon color="#6366f1" size={24} />
                      <Text className="text-indigo-600 font-bold mt-1">Right Side</Text>
                      {faceImages.right ? (
                        <View className="flex-row items-center mt-1">
                          <CheckCircle color="#10b981" size={16} />
                          <Text className="text-green-500 text-xs ml-1">Captured</Text>
                          <Image source={{ uri: faceImages.right }} style={styles.smallPreviewImage} />
                        </View>
                      ) : (
                        <Text className="text-gray-500 text-xs mt-1">Tap to capture</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            
            {step === 3 && (
              <View>
                <Text className="text-gray-600 text-center mb-6">
                  Upload a valid government-issued ID for verification
                </Text>
                
                <View className="items-center">
                  <TouchableOpacity
                    className="bg-indigo-100 rounded-2xl p-8 items-center w-full mb-6"
                    onPress={uploadId}
                  >
                    {idImage ? (
                      <>
                        <CheckCircle color="#10b981" size={48} />
                        <Text className="text-green-500 font-bold mt-2">ID Uploaded</Text>
                        <Image source={{ uri: idImage }} style={styles.idPreviewImage} />
                      </>
                    ) : (
                      <>
                        <Upload color="#6366f1" size={48} />
                        <Text className="text-indigo-600 font-bold mt-2">Upload ID</Text>
                        <Text className="text-gray-500 mt-1">Tap to select file</Text>
                      </>
                    )}
                  </TouchableOpacity>
                  
                  <View className="bg-gray-100 rounded-xl p-4 w-full">
                    <Text className="font-bold text-gray-700 mb-2">Accepted Documents:</Text>
                    <Text className="text-gray-600">
                      • Driver's License
                    </Text>
                    <Text className="text-gray-600">
                      • Passport
                    </Text>
                    <Text className="text-gray-600">
                      • National ID Card
                    </Text>
                  </View>
                </View>
              </View>
            )}
            
            <View className="flex-row mt-4">
              {step > 1 && (
                <TouchableOpacity
                  className="flex-1 bg-gray-200 rounded-xl py-4 items-center mr-2"
                  onPress={() => setStep(step - 1)}
                >
                  <Text className="text-gray-700 font-bold">Back</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                className={`flex-1 rounded-xl py-4 items-center ${
                  step === 1 ? 'bg-indigo-500' : step === 2 ? 'bg-amber-500' : 'bg-green-500'
                } ${step > 1 ? 'ml-2' : ''}`}
                onPress={handleRegister}
              >
                <Text className="text-white font-bold">
                  {step === 1 ? 'Continue' : step === 2 ? 'Next' : 'Complete Registration'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <View className="h-20" />
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  stepIndicatorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepIndicatorLine: {
    height: 2,
    flex: 1,
  },
  stepLabelText: {
    fontSize: 12,
    marginTop: 8,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366f1',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  captureInstruction: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  cancelButton: {
    padding: 15,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  smallPreviewImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
  idPreviewImage: {
    width: 100,
    height: 60,
    marginTop: 10,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 2,
  },
  titleText: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  brandTextMAG: {
    color: '#FFD700', // Bright gold color
    letterSpacing: 2,
    textTransform: 'uppercase',
    includeFontPadding: false,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  brandTextTrabaho: {
    color: '#ffffff', // Pure white
    fontFamily: 'System',
    fontStyle: 'italic',
    letterSpacing: 3,
    includeFontPadding: false,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
    marginLeft: 8,
    opacity: 0.95,
    transform: [{ skewX: '-10deg' }],
  },
  subtitleMatch: {
    color: '#FFD700', // Gold to match MAG
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitleAnd: {
    color: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1,
  },
  subtitleGo: {
    color: '#FFD700', // Gold to match MAG
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitleTrabaho: {
    color: '#ffffff', // Pure white
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});