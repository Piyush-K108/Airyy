import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigation from './src/Navigations/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import {Alert, Text, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);

      if (initialLoading && state.isConnected) {
        SplashScreen.hide();
        setInitialLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [initialLoading]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          {initialLoading ? null : isConnected ? (
            <Navigation />
          ) : (
            <View style={styles.noInternetContainer}>
              <LottieView
                style={{
                  width: 350,
                
                  height: 350,
                }}
                source={require('./src/assets/No_Internet.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  noInternetContainer: {
    backgroundColor: 'white',
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
