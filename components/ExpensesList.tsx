import { FlatList } from 'react-native';

import { Expense } from '../types';
import { ExpenseItem } from './ExpenseItem';

type Props = {
  expenses: Expense[];
}

export const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) =>
        <ExpenseItem
          description={item.description}
          amount={item.amount}
          date={item.date} />}
      keyExtractor={(item) => item.id}
    />
  );
};