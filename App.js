import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/Navigations/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import { Alert, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      
      if (state.isConnected) {
        SplashScreen.hide();
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {isConnected ? (
            <Navigation />
          ) : (
            <View
              style={{ backgroundColor: 'black', height: '100%',justifyContent:'center',alignContent:'center', width: '100%' }}>
              <Text style={{ color: 'white' }}>NO INTERNET CONNECTION</Text>
              <Text style={{ color: 'white' }}>Connection Type: {connectionType}</Text>
            </View>
          )}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
