import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ManageExpense } from '../screens/ManageExpense';
import { BottomTabNavigator } from './BottomTabNavigator';

import { TypeRootStackParamList } from './types';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

export const NativeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ManageExpense" component={ManageExpense} />
    </Stack.Navigator>
  );
};