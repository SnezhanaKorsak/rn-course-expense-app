import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { NativeStackNavigator } from './navigation/NativeStackNavigator';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <NativeStackNavigator />
      </NavigationContainer>

      <StatusBar style="light" />
    </>
  );
}
