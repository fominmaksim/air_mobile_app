import { ScrollView, StatusBar, useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { connectWS } from './src/api/websocket';
import Toast from 'react-native-toast-message';
import { AppState } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
      <ScrollView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <HomeScreen />
      </ScrollView>
      <Toast topOffset={50} bottomOffset={40} />
    </SafeAreaProvider>
  );
}

export default App;
