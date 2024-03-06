import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './src/Navigations/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {Alert, Text, View, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const checkInternetConnection = async () => {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      
      if (initialLoading) {
        SplashScreen.hide();
        setInitialLoading(false);
      }
    };
   
    checkInternetConnection();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    return () => {
      unsubscribe();
    };
  }, [initialLoading]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          {initialLoading || isConnected ? (
            <Navigation />
          ) : (
            <View style={styles.noInternetContainer}>
              <Image
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('./src/assets/No_internet_png.png')}
              />
              <Text style={{color: '#000' , fontWeight:'bold'}}>No internet connection</Text>
            </View>
          )}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  noInternetContainer: {
    backgroundColor: '#fef9c3',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  noInternetText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  connectionTypeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
