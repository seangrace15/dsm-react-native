import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import app from './firebase';
import { getAuth } from 'firebase/auth';
const store = ConfigureStore();
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Campobase />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
