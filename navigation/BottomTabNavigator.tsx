import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { AllExpenses } from '../screens/AllExpenses';
import { RecentExpenses } from '../screens/RecentExpenses';
import { IconButton } from '../components/IconButton';

import { StackParamList, TabParamList } from './types';
import { GlobalStyles } from '../theme/styles';

const BottomTabs = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={() => {
        const navigation = useNavigation<NavigationProp<StackParamList>>();
        return (
          {
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor as string}
                onPress={() => {
                  navigation.navigate('ManageExpense', {});
                }}
              />
            )
          }
        );
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};