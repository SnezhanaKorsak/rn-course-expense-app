import { View } from 'react-native';

import { ExpensesOutput } from '../components/ExpensesOutput';

export const RecentExpenses = () => {
  return (
    <View style={{ flex: 1 }}>
      <ExpensesOutput expensesPeriod="Last 7 Days" />
    </View>
  )
};