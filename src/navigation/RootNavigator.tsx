import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // Top app bar (header)
        headerStyle: {
          // backgroundColor: '#f2b9ab',
          backgroundColor: '#5d689a',
          elevation: 5,
          height: 85,
        },
        headerTitleStyle: {
          color: '#2d2d2d',
          fontSize: 18,
          fontWeight: '700',
        },
        headerTitleAlign: 'center',
        // Bottom nav (tab bar)
        tabBarStyle: {
          elevation: 11,
          backgroundColor: '#5d689a',
          borderTopColor: '#f2b9ab',
          borderTopWidth: 2,

          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#2d2d2d',
        tabBarInactiveTintColor: '#8d8d8d',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          color: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home" size={23} color="#fff" />;
          },
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={() => {
          return <View />;
        }}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="settings" size={23} color="#fff" />;
          },
          title: 'Settings',
        }}
      />
      {/* <HomeTab />
      <SettingsTab /> */}
    </Tab.Navigator>
  );
};

export default RootNavigator;
