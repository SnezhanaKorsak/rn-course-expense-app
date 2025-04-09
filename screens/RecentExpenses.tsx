import { useContext } from 'react';

import { getDateMinusDays } from '../utils';

import { ExpensesOutput } from '../components/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    console.log('expense.date', expense.date);
    console.log('date7DaysAgo', date7DaysAgo);
    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
  );
};