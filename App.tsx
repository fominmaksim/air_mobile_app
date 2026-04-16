// import { ScrollView, StatusBar, useColorScheme } from 'react-native';
import { useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { connectWS } from './src/api/websocket';
// import Toast from 'react-native-toast-message';
import { AppState, View } from 'react-native';
// import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function App() {
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    connectWS();
    const appStateSubscription = AppState.addEventListener(
      'change',
      nextState => {
        if (nextState === 'active') {
          connectWS();
        }
      },
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// const StyledScrollView = styled(ScrollView)`
//   /* flex: 1; */
//   background-color: #fce4e2;
// `;

export default App;
