import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type TabParamList = {
  ManageExpense: undefined;
  ExpensesOverview: undefined;
};

export type StackParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
  ManageExpense: undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<StackParamList>
>;