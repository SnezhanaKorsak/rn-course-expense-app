import { StyleSheet, View } from 'react-native';

import { DUMMY_EXPENSES } from '../constants/data';
import { GlobalStyles } from '../theme/styles';

import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';

type Props = {
  expensesPeriod: string;
}

export const ExpensesOutput = ({ expensesPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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