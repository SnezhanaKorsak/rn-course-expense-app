import { useContext } from 'react';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

export const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No registered expenses found!"
    />
  );
};