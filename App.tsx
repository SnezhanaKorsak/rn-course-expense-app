import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { NativeStackNavigator } from './navigation/NativeStackNavigator';
import { ExpensesContextProvider } from './store/expenses-context';

export default function App() {
  return (
    <>
      <ExpensesContextProvider>
        <NavigationContainer>
          <NativeStackNavigator />
        </NavigationContainer>
      </ExpensesContextProvider>

      <StatusBar style="light" />
    </>
  );
}
