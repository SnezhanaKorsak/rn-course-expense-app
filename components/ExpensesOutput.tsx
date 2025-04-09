import { StyleSheet, View, Text } from 'react-native';

import { GlobalStyles } from '../theme/styles';
import { Expense } from '../types';

import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';

type Props = {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText: string;
}

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: Props) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
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
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});