import { View } from 'react-native';
import { ExpensesOutput } from '../components/ExpensesOutput';

export const AllExpenses = () => {
  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput expensesPeriod="Total" />
    </View>
  );
};