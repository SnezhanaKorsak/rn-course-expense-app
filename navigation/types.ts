import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type StackParamList = {
  ManageExpense: { expenseId?: string };
  ExpensesOverview: undefined;
};

export type TabParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<StackParamList>
>;

export type ManageExpenseScreenRouteProp = RouteProp<StackParamList, 'ManageExpense'>;