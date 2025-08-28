import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/dashoard';
import Home from './pages/home';
import SearchArea from './pages/searchArea';
import MessageList from './pages/message-list';
import JobUpload from './pages/Job-Upload';
import ChatbotScreen from './pages/chatbot';
import { useColorScheme } from 'react-native';
import NavBottom from './components/ui/nav-bottom';
import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { userType } = useAuth();

  const DashboardComponent = userType === 'client' ? 
    require('./pages/worker-dashboard').default : 
    require('./pages/client-dashboard').default;

  return (
    <Tab.Navigator
      tabBar={props => <NavBottom {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name="Home" 
        component={userType === 'client' ? Home : require('./pages/home-job').default}
      />
      <Tab.Screen name="SearchArea" component={require('./pages/history').default} />
      <Tab.Screen name="MessageList" component={MessageList} />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardComponent}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="MainApp" component={MainTabs} />
            <Stack.Screen name="JobUpload" component={JobUpload} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />
            <Stack.Screen name="NBIClearance" component={require('./pages/nbi-clearance').default} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}