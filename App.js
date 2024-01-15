import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './src/Navigations/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { Provider  } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './src/Redux/store';


const Stack = createNativeStackNavigator();



function App() {
  useEffect(() => {
    SplashScreen.hide(); 
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Navigation />
      </PersistGate> 
    </Provider>
   
  );
}

export default App;
