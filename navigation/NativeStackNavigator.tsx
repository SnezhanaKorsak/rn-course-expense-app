import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ManageExpense } from '../screens/ManageExpense';
import { BottomTabNavigator } from './BottomTabNavigator';

import { StackParamList } from './types';
import { GlobalStyles } from '../theme/styles';

const Stack = createNativeStackNavigator<StackParamList>();

export const NativeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};