import { StyleSheet, View } from 'react-native';

import { GlobalStyles } from '../theme/styles';
import { Expense } from '../types';

import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';

type Props = {
  expenses: Expense[];
  expensesPeriod: string;
}

export const ExpensesOutput = ({ expenses, expensesPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary800
  }
});